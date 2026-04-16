import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import puppeteer from "puppeteer-core";
import { defaultSavePath, resolveEntry } from "./_entry.js";
import { NO_BROWSER_HINT, resolveBrowser } from "./_render.js";
import {
  hint,
  info,
  output,
  type OutputOptions,
  success,
  warn,
} from "../utils/output.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function resolveRuntime(): string {
  const candidates = [
    join(__dirname, "..", "runtime"),
    join(__dirname, "..", "..", "src", "runtime"),
  ];
  for (const c of candidates) if (existsSync(join(c, "shell.html"))) return c;
  throw new Error("poster: runtime/ not found");
}

// Find poster's own node_modules so author imports (react, recharts, etc.)
// resolve even when the entry lives outside any project tree — e.g. a stdin
// entry written to /var/folders/... User-project deps still win: esbuild
// walks up from the entry file first, then falls back to nodePaths.
function findPosterNodeModules(): string | null {
  let dir = __dirname;
  for (let i = 0; i < 10; i++) {
    const nm = join(dir, "node_modules");
    if (existsSync(nm)) return nm;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
  return null;
}

export interface BuildArgs {
  entry: string;
  out: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  og?: boolean;
  ogWidth?: number;
  ogHeight?: number;
  installBrowser?: boolean;
  browser?: string;
  /** Explicit location to persist stdin TSX. Ignored when entry is a path. */
  save?: string;
  /** Skip persistence — stdin written to a tmp dir, deleted after build. */
  ephemeral?: boolean;
}

export async function build(args: BuildArgs, options: OutputOptions): Promise<void> {
  const savePath = args.ephemeral
    ? null
    : (args.save ?? defaultSavePath(args.out));
  const { path: entry, cleanup: cleanupEntry } = await resolveEntry(
    args.entry,
    { savePath, announce: !options.quiet && !options.json },
  );
  try {
    await buildFromEntry(entry, args, options);
  } finally {
    cleanupEntry();
  }
}

async function buildFromEntry(
  entry: string,
  args: BuildArgs,
  options: OutputOptions,
): Promise<void> {
  const runtimeDir = resolveRuntime();
  const shell = readFileSync(join(runtimeDir, "shell.html"), "utf-8");

  const title = args.title ?? "Poster";
  const description = args.description ?? "";
  const width = args.width ?? 1440;
  const height = args.height ?? 900;
  const ogWidth = args.ogWidth ?? 1200;
  const ogHeight = args.ogHeight ?? 630;

  const bundle = await bundleEntry(runtimeDir, entry, options);
  const outPath = resolve(process.cwd(), args.out);

  // Pass 1 — emit HTML with meta tags but no og:image (placeholder).
  const pass1 = renderShell(shell, {
    title,
    description,
    bundle,
    meta: { title, width, height },
    ogImageDataUrl: null,
    ogWidth,
    ogHeight,
  });

  // Pass 2 — if --og, render the page to a PNG, base64, and rebake.
  let finalHtml = pass1;
  let ogBaked = false;
  if (args.og) {
    const dataUrl = await renderOgDataUrl(pass1, {
      width: ogWidth,
      height: ogHeight,
      browser: args.browser,
      installBrowser: args.installBrowser,
      options,
    });
    if (dataUrl) {
      finalHtml = renderShell(shell, {
        title,
        description,
        bundle,
        meta: { title, width, height },
        ogImageDataUrl: dataUrl,
        ogWidth,
        ogHeight,
      });
      ogBaked = true;
    }
  }

  writeFileSync(outPath, finalHtml);

  const sizeKb = (finalHtml.length / 1024).toFixed(1);
  output(options, {
    json: () => ({
      success: true,
      out: outPath,
      sizeKb: Number(sizeKb),
      ogBaked,
    }),
    quiet: () => {},
    human: () => {
      success(`Built ${outPath}`);
      info(`${sizeKb} KB${ogBaked ? " · og:image inlined" : ""} — open in any browser`);
    },
  });
}

// ---------- helpers ----------

async function bundleEntry(
  runtimeDir: string,
  entry: string,
  options: OutputOptions,
): Promise<string> {
  const bootstrap = join(runtimeDir, "bootstrap.tsx");

  const virtualEntry: esbuild.Plugin = {
    name: "poster-virtual-entry",
    setup(b) {
      b.onResolve({ filter: /^virtual:poster-entry$/ }, () => ({ path: entry }));
    },
  };

  const posterNodeModules = findPosterNodeModules();
  const result = await esbuild.build({
    entryPoints: [bootstrap],
    bundle: true,
    write: false,
    format: "iife",
    target: ["es2020"],
    jsx: "automatic",
    loader: { ".wasm": "binary" },
    plugins: [virtualEntry],
    nodePaths: posterNodeModules ? [posterNodeModules] : [],
    logLevel: options.quiet ? "silent" : "warning",
    define: { "process.env.NODE_ENV": '"production"' },
    banner: {
      js: "var process=(typeof process!=='undefined')?process:{env:{NODE_ENV:'production'},platform:'browser',browser:true,version:'',versions:{node:''}};var global=(typeof global!=='undefined')?global:globalThis;",
    },
  });
  return result.outputFiles[0].text;
}

interface ShellRenderArgs {
  title: string;
  description: string;
  bundle: string;
  meta: { title: string; width: number; height: number };
  ogImageDataUrl: string | null;
  ogWidth: number;
  ogHeight: number;
}

function renderShell(shell: string, a: ShellRenderArgs): string {
  const ogImageTags = a.ogImageDataUrl
    ? [
        `<meta property="og:image" content="${a.ogImageDataUrl}" />`,
        `<meta property="og:image:type" content="image/jpeg" />`,
        `<meta property="og:image:width" content="${a.ogWidth}" />`,
        `<meta property="og:image:height" content="${a.ogHeight}" />`,
      ].join("\n    ")
    : "";
  const twitterImageTag = a.ogImageDataUrl
    ? `<meta name="twitter:image" content="${a.ogImageDataUrl}" />`
    : "";

  return shell
    .replaceAll("{{TITLE}}", escapeHtml(a.title))
    .replaceAll("{{DESCRIPTION}}", escapeHtml(a.description))
    .replace("{{OG_IMAGE_TAGS}}", ogImageTags)
    .replace("{{TWITTER_IMAGE_TAG}}", twitterImageTag)
    .replaceAll(
      "{{META_JSON}}",
      JSON.stringify(a.meta).replace(/</g, "\\u003c"),
    )
    .replace("{{BUNDLE_JS}}", () =>
      a.bundle.replace(/<\/script>/gi, "<\\/script>"),
    );
}

/**
 * Render the given HTML to a JPEG data URL at the OG canonical size.
 * Returns null (with a warning) if no browser is available.
 */
async function renderOgDataUrl(
  html: string,
  opts: {
    width: number;
    height: number;
    browser?: string;
    installBrowser?: boolean;
    options: OutputOptions;
  },
): Promise<string | null> {
  const executablePath = await resolveBrowser(
    { browser: opts.browser, allowInstall: opts.installBrowser },
    opts.options,
  );
  if (!executablePath) {
    warn("Skipping og:image — no system browser found.");
    hint(NO_BROWSER_HINT);
    return null;
  }

  const tmpDir = mkdtempSync(join(tmpdir(), "poster-og-"));
  const tmpHtml = join(tmpDir, "og.html");
  writeFileSync(tmpHtml, html);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    // hinting=none is deliberate here (unlike `poster export`): OG runs at
    // DSF=1, and disabling hinting yields smaller, more consistent JPEGs for
    // the data URL. `poster export` omits it to keep text crisp at DSF=2.
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
  });
  try {
    const page = await browser.newPage();
    // DSF=1 — OG crawlers cache at canonical size; 2x just bloats the data URL.
    await page.setViewport({ width: opts.width, height: opts.height, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(tmpHtml).href, { waitUntil: "networkidle0" });
    // Let chart animations settle before snapshotting the OG image.
    await new Promise((r) => setTimeout(r, 1500));

    // JPEG @ 82 quality strikes a good balance — keeps data URL ~80–150 KB
    // which stays within the meta-tag size budgets of major crawlers.
    const buf = await page.screenshot({
      type: "jpeg",
      quality: 82,
      clip: { x: 0, y: 0, width: opts.width, height: opts.height },
    });
    return `data:image/jpeg;base64,${Buffer.from(buf).toString("base64")}`;
  } finally {
    await browser.close();
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
