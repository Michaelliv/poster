// Compile a user .tsx file and load its default export.
//
// Pipeline:
//   1. read source
//   2. transform with Sucrase (TS + JSX → CJS-style `require()` calls)
//   3. extract every specifier appearing inside `require("…")` in the
//      compiled output — that's the authoritative import list, free of
//      false positives from prose or strings in the original source
//   4. resolve each specifier:
//        bare + installed locally       → nativeRequire
//        bare + not installed           → fetch from esm.sh, recurse
//        explicit https://… specifier   → fetch directly, recurse
//        "react"                        → caller-supplied React object
//   5. evaluate the compiled module with `new Function` and the resolved
//      requires
//
// Modules fetched from CDNs are cached on disk at
// `~/.cache/poster/modules/<sha256>.mjs` so subsequent renders are offline.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { transform } from "sucrase";

export interface LoadedEntry<T = unknown> {
  /** The component returned by the user's default export. */
  component: (props: Record<string, unknown>) => T;
  /** Absolute path the entry was loaded from. */
  path: string;
}

export interface LoadOptions {
  /** The real `react` object to expose to the user code. Required. */
  react: unknown;
}

export async function loadEntry<T = unknown>(
  entryPath: string,
  opts: LoadOptions,
): Promise<LoadedEntry<T>> {
  const abs = resolve(process.cwd(), entryPath);
  const source = readFileSync(abs, "utf-8");
  const react = opts.react;

  const compiled = compileTsx(source);
  const remoteModules = await resolveRemoteSpecifiers(
    extractRequires(compiled),
    react,
  );

  const exports: Record<string, unknown> = {};
  const moduleObj = { exports };
  const nativeRequire = createRequire(import.meta.url);

  const requireFn = (name: string): unknown => {
    if (name === "react") return react;
    if (remoteModules.has(name)) return remoteModules.get(name);
    try {
      return nativeRequire(name);
    } catch (err) {
      throw new Error(
        `poster: import of "${name}" is not available. Install it locally, ` +
          `or import an SSR-compatible CDN module such as ` +
          `"https://esm.sh/${name}?bundle&external=react".\n` +
          `Original error: ${(err as Error).message}`,
      );
    }
  };

  const fn = new Function("exports", "module", "require", "React", compiled);
  fn(exports, moduleObj, requireFn, react);

  const out =
    (moduleObj.exports as { default?: unknown }).default ?? moduleObj.exports;

  if (typeof out !== "function") {
    throw new Error(
      `poster: ${abs} must default-export a function component. ` +
        `Got: ${typeof out}`,
    );
  }

  return { component: out as LoadedEntry<T>["component"], path: abs };
}

// ───── compile + extract ────────────────────────────────────────────────

function compileTsx(source: string): string {
  return transform(source, {
    transforms: ["typescript", "jsx", "imports"],
    jsxRuntime: "classic",
    jsxPragma: "React.createElement",
    jsxFragmentPragma: "React.Fragment",
  }).code;
}

// Sucrase's `imports` transform lowers every static `import` and every
// `import()` expression into `require("…")` calls in the output. Grepping
// for that single shape over the compiled code is reliable in a way that
// grepping the original source isn't — no risk of matching prose, regex
// literals, or template strings, because the only `require(...)` calls
// in the output are the ones Sucrase emitted.
const REQUIRE_RE = /\brequire\(\s*["']([^"']+)["']\s*\)/g;

function extractRequires(compiled: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const match of compiled.matchAll(REQUIRE_RE)) {
    const spec = match[1];
    if (spec && !seen.has(spec)) {
      seen.add(spec);
      out.push(spec);
    }
  }
  return out;
}

// ───── remote module resolution ─────────────────────────────────────────

type ModuleMap = Map<string, unknown>;

async function resolveRemoteSpecifiers(
  specifiers: string[],
  react: unknown,
): Promise<ModuleMap> {
  const modules: ModuleMap = new Map();
  const seen = new Set<string>();
  const nativeRequire = createRequire(import.meta.url);

  for (const spec of specifiers) {
    if (spec === "react") continue;
    if (spec.startsWith(".") || spec.startsWith("/")) continue;

    if (spec === "lucide-react") {
      await loadRemote(
        spec,
        "https://esm.sh/lucide-react@0.468.0?bundle&external=react",
        react,
        modules,
        seen,
      );
      continue;
    }
    if (isRemoteSpecifier(spec)) {
      await loadRemote(spec, spec, react, modules, seen);
      continue;
    }
    try {
      nativeRequire.resolve(spec);
    } catch {
      const url = `https://esm.sh/${encodeURIComponent(spec)}?bundle&external=react`;
      await loadRemote(spec, url, react, modules, seen);
    }
  }

  return modules;
}

async function loadRemote(
  publicSpecifier: string,
  url: string,
  react: unknown,
  modules: ModuleMap,
  seen: Set<string>,
): Promise<unknown> {
  const resolvedUrl = normalizeRemoteUrl(url);
  if (modules.has(publicSpecifier)) return modules.get(publicSpecifier);
  if (seen.has(resolvedUrl)) return modules.get(resolvedUrl);
  seen.add(resolvedUrl);

  const source = await fetchCached(resolvedUrl);
  const compiled = compileTsx(source);

  const childExports = new Map<string, unknown>();
  for (const child of extractRequires(compiled)) {
    if (child === "react") continue;
    if (child === "react/jsx-runtime" || child === "react/jsx-dev-runtime") {
      continue;
    }
    if (
      isRemoteSpecifier(child) ||
      child.startsWith("/") ||
      child.startsWith(".")
    ) {
      const childUrl = new URL(child, resolvedUrl).toString();
      childExports.set(
        child,
        await loadRemote(childUrl, childUrl, react, modules, seen),
      );
    }
  }

  const exports: Record<string, unknown> = {};
  const moduleObj = { exports };
  const nativeRequire = createRequire(import.meta.url);
  const requireFn = (name: string): unknown => {
    if (name === "react") return react;
    if (name === "react/jsx-runtime" || name === "react/jsx-dev-runtime") {
      return nativeRequire(name);
    }
    if (childExports.has(name)) return childExports.get(name);
    const childUrl =
      isRemoteSpecifier(name) || name.startsWith("/") || name.startsWith(".")
        ? new URL(name, resolvedUrl).toString()
        : name;
    if (modules.has(childUrl)) return modules.get(childUrl);
    return nativeRequire(name);
  };

  const fn = new Function("exports", "module", "require", "React", compiled);
  fn(exports, moduleObj, requireFn, react);
  const out = moduleObj.exports;
  modules.set(resolvedUrl, out);
  modules.set(publicSpecifier, out);
  return out;
}

function isRemoteSpecifier(spec: string): boolean {
  return spec.startsWith("https://") || spec.startsWith("http://");
}

function normalizeRemoteUrl(url: string): string {
  const parsed = new URL(url);
  if (parsed.hostname === "esm.sh" && !parsed.searchParams.has("external")) {
    parsed.searchParams.set("external", "react");
  }
  return parsed.toString();
}

async function fetchCached(url: string): Promise<string> {
  const cacheRoot = resolve(
    process.env.HOME ?? process.cwd(),
    ".cache/poster/modules",
  );
  mkdirSync(cacheRoot, { recursive: true });
  const hash = createHash("sha256").update(url).digest("hex");
  const cachePath = resolve(cacheRoot, `${hash}.mjs`);
  if (existsSync(cachePath)) return readFileSync(cachePath, "utf-8");

  const res = await fetch(url, { headers: { "user-agent": "poster/0.0" } });
  if (!res.ok) {
    throw new Error(
      `poster: failed to fetch ${url}: ${res.status} ${res.statusText}`,
    );
  }
  const body = await res.text();
  mkdirSync(dirname(cachePath), { recursive: true });
  writeFileSync(cachePath, `// ${url}\n${body}`);
  return body;
}
