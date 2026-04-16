import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import { EXIT_NOT_FOUND, EXIT_USER_ERROR } from "../utils/exit-codes.js";
import {
  error,
  hint,
  info,
  output,
  type OutputOptions,
  success,
} from "../utils/output.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The runtime/ directory is copied next to dist/ by scripts/copy-runtime.ts.
// In dev we resolve it relative to the source tree.
function resolveRuntime(): string {
  const candidates = [
    join(__dirname, "..", "runtime"),
    join(__dirname, "..", "..", "src", "runtime"),
  ];
  for (const c of candidates) if (existsSync(join(c, "shell.html"))) return c;
  throw new Error("poster: runtime/ not found");
}

export interface BuildArgs {
  entry: string;
  out: string;
  title?: string;
  width?: number;
  height?: number;
}

export async function build(
  args: BuildArgs,
  options: OutputOptions,
): Promise<void> {
  const entry = resolve(process.cwd(), args.entry);
  if (!existsSync(entry)) {
    error(`Entry not found: ${entry}`);
    process.exit(EXIT_NOT_FOUND);
  }

  const runtimeDir = resolveRuntime();
  const shell = readFileSync(join(runtimeDir, "shell.html"), "utf-8");
  const bootstrap = join(runtimeDir, "bootstrap.tsx");

  const title = args.title ?? "Poster";
  const width = args.width ?? 1200;
  const height = args.height ?? 800;

  // Virtual plugin that rewrites `virtual:poster-entry` → user's TSX.
  const virtualEntry: esbuild.Plugin = {
    name: "poster-virtual-entry",
    setup(b) {
      b.onResolve({ filter: /^virtual:poster-entry$/ }, () => ({
        path: entry,
      }));
    },
  };

  const result = await esbuild.build({
    entryPoints: [bootstrap],
    bundle: true,
    write: false,
    format: "iife",
    target: ["es2020"],
    jsx: "automatic",
    loader: { ".wasm": "binary" },
    plugins: [virtualEntry],
    logLevel: options.quiet ? "silent" : "warning",
    define: { "process.env.NODE_ENV": '"production"' },
  });

  const bundle = result.outputFiles[0].text;

  const html = shell
    .replaceAll("{{TITLE}}", escapeHtml(title))
    .replaceAll(
      "{{META_JSON}}",
      JSON.stringify({ title, width, height }).replace(/</g, "\\u003c"),
    )
    .replace("{{BUNDLE_JS}}", () => bundle);

  const outPath = resolve(process.cwd(), args.out);
  writeFileSync(outPath, html);

  const sizeKb = (html.length / 1024).toFixed(1);

  output(options, {
    json: () => ({ success: true, out: outPath, sizeKb: Number(sizeKb) }),
    human: () => {
      success(`Built ${outPath}`);
      info(`${sizeKb} KB — open in any browser`);
    },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
