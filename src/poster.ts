// Poster — SDK class.
//
// Two methods, both pure:
//   • buildHtml(input, options?) → Promise<string>        — self-contained HTML
//   • render(input, options)     → Promise<Buffer|string> — rendered artifact
//
// The CLI is a thin wrapper around these. Never calls process.exit, never
// writes to stdout. Throws on error; callers decide what to do.

import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as esbuild from "esbuild";
import puppeteer from "puppeteer-core";
import { resolveBrowser } from "./browser.js";

// ---------- public types ----------

export type ExportFormat = "png" | "svg" | "pdf" | "jpg" | "webp";

export type PosterInput = { tsx: string } | { file: string };

export interface PosterOptions {
  /** Explicit Chrome/Chromium executable path. */
  browser?: string;
  /** Auto-install chrome-headless-shell (~80 MB) if no system browser is found. */
  installBrowser?: boolean;
}

export interface BuildOptions {
  title?: string;
  description?: string;
  /** Canvas width in CSS pixels. Default 1440. */
  width?: number;
  /** Canvas height in CSS pixels. Default 900. */
  height?: number;
  /**
   * Bake an og:image data URL into the HTML. Pass `true` for defaults,
   * or an object to override dimensions.
   */
  og?: boolean | { width?: number; height?: number };
}

export interface RenderOptions extends BuildOptions {
  format: ExportFormat;
  /** Device pixel ratio for raster output. Default 2 (retina). */
  deviceScaleFactor?: number;
  /** Navigation wait condition. Default "networkidle0". */
  waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2";
  /** Extra ms to wait after navigation. Default 1500 (lets Recharts settle). */
  waitFor?: number;
}

// ---------- defaults ----------

/** Canvas defaults applied when a build/render option is left unset. */
export const DEFAULTS = {
  width: 1440,
  height: 900,
  ogWidth: 1200,
  ogHeight: 630,
  deviceScaleFactor: 2,
  waitUntil: "networkidle0" as const,
  waitFor: 1500,
} as const;

// ---------- class ----------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class Poster {
  private options: PosterOptions;

  constructor(options: PosterOptions = {}) {
    this.options = options;
  }

  /** Build a self-contained HTML string from a TSX entry. */
  async buildHtml(input: PosterInput, options: BuildOptions = {}): Promise<string> {
    const entry = resolveInput(input);
    try {
      return await this.buildFromPath(entry.path, options);
    } finally {
      entry.cleanup();
    }
  }

  /**
   * Render a TSX entry to its final artifact.
   *   png / jpg / webp / pdf → Buffer
   *   svg                    → string
   */
  async render(
    input: PosterInput,
    options: RenderOptions,
  ): Promise<Buffer | string> {
    const entry = resolveInput(input);
    try {
      const html = await this.buildFromPath(entry.path, options);
      return await this.renderHtml(html, options);
    } finally {
      entry.cleanup();
    }
  }

  // ---------- internals ----------

  private async buildFromPath(entry: string, options: BuildOptions): Promise<string> {
    const runtimeDir = resolveRuntime();
    const shell = readFileSync(join(runtimeDir, "shell.html"), "utf-8");

    const title = options.title ?? "Poster";
    const description = options.description ?? "";
    const width = options.width ?? DEFAULTS.width;
    const height = options.height ?? DEFAULTS.height;

    const bundle = await bundleEntry(runtimeDir, entry);
    const meta = { title, width, height };

    if (!options.og) {
      return renderShell(shell, {
        title,
        description,
        bundle,
        meta,
        ogImageDataUrl: null,
        ogWidth: DEFAULTS.ogWidth,
        ogHeight: DEFAULTS.ogHeight,
      });
    }

    const ogDims = typeof options.og === "object" ? options.og : {};
    const ogWidth = ogDims.width ?? DEFAULTS.ogWidth;
    const ogHeight = ogDims.height ?? DEFAULTS.ogHeight;

    // Pass 1: render without og:image, just so the crawler-facing DOM exists.
    const pass1 = renderShell(shell, {
      title,
      description,
      bundle,
      meta,
      ogImageDataUrl: null,
      ogWidth,
      ogHeight,
    });
    // Pass 2: screenshot pass 1, bake the data URL back in.
    const dataUrl = await this.renderOgDataUrl(pass1, ogWidth, ogHeight);
    return renderShell(shell, {
      title,
      description,
      bundle,
      meta,
      ogImageDataUrl: dataUrl,
      ogWidth,
      ogHeight,
    });
  }

  private async renderHtml(
    html: string,
    options: RenderOptions,
  ): Promise<Buffer | string> {
    const width = options.width ?? DEFAULTS.width;
    const height = options.height ?? DEFAULTS.height;
    const deviceScaleFactor = options.deviceScaleFactor ?? DEFAULTS.deviceScaleFactor;
    const executablePath = await this.requireBrowser();

    const tmpDir = mkdtempSync(join(tmpdir(), "poster-render-"));
    const tmpHtml = join(tmpDir, "poster.html");
    writeFileSync(tmpHtml, html);

    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      // Default hinting: crisper text at DSF=2. (The OG path below opts for
      // hinting=none at DSF=1 for smaller, more consistent JPEGs.)
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width, height, deviceScaleFactor });
      await page.goto(pathToFileURL(tmpHtml).href, {
        waitUntil: options.waitUntil ?? DEFAULTS.waitUntil,
      });
      const waitMs = options.waitFor ?? DEFAULTS.waitFor;
      if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));

      if (options.format === "pdf") {
        // No scale override: Puppeteer's scale doubles content against a
        // fixed paper size, which clips posters. Text/SVG stay vector.
        return Buffer.from(
          await page.pdf({
            width: `${width}px`,
            height: `${height}px`,
            printBackground: true,
            pageRanges: "1",
          }),
        );
      }

      if (options.format === "svg") {
        const dataUrl = await page.evaluate(
          async () => await (window as unknown as { __posterCapture: (f: string) => Promise<string> }).__posterCapture("svg"),
        );
        return decodeSvgDataUrl(dataUrl);
      }

      const type = options.format === "jpg" ? "jpeg" : options.format;
      return Buffer.from(
        await page.screenshot({
          type: type as "png" | "jpeg" | "webp",
          omitBackground: options.format === "png",
          clip: { x: 0, y: 0, width, height },
          ...(options.format === "jpg" || options.format === "webp"
            ? { quality: 100 }
            : {}),
        }),
      );
    } finally {
      await browser.close();
      rmSync(tmpDir, { recursive: true, force: true });
    }
  }

  /** Render the given HTML to a JPEG data URL for use as og:image. */
  private async renderOgDataUrl(
    html: string,
    width: number,
    height: number,
  ): Promise<string> {
    const executablePath = await this.requireBrowser();
    const tmpDir = mkdtempSync(join(tmpdir(), "poster-og-"));
    const tmpHtml = join(tmpDir, "og.html");
    writeFileSync(tmpHtml, html);

    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      // hinting=none is deliberate here: OG runs at DSF=1, and disabling
      // hinting yields smaller, more consistent JPEGs for the data URL.
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
    });
    try {
      const page = await browser.newPage();
      // DSF=1 — crawlers cache at canonical size; 2x just bloats the URL.
      await page.setViewport({ width, height, deviceScaleFactor: 1 });
      await page.goto(pathToFileURL(tmpHtml).href, { waitUntil: "networkidle0" });
      await new Promise((r) => setTimeout(r, 1500));
      const buf = await page.screenshot({
        type: "jpeg",
        quality: 82,
        clip: { x: 0, y: 0, width, height },
      });
      return `data:image/jpeg;base64,${Buffer.from(buf).toString("base64")}`;
    } finally {
      await browser.close();
      rmSync(tmpDir, { recursive: true, force: true });
    }
  }

  private async requireBrowser(): Promise<string> {
    const path = await resolveBrowser(
      { browser: this.options.browser, allowInstall: this.options.installBrowser },
      { quiet: true },
    );
    if (!path) {
      throw new Error(
        "No browser found. Install Chrome, Brave, or Edge — or construct Poster with { installBrowser: true } to download chrome-headless-shell (~80 MB).",
      );
    }
    return path;
  }
}

// ---------- helpers ----------

function resolveInput(input: PosterInput): { path: string; cleanup: () => void } {
  if ("tsx" in input) {
    const dir = mkdtempSync(join(tmpdir(), "poster-sdk-"));
    const path = join(dir, "entry.tsx");
    writeFileSync(path, input.tsx);
    return { path, cleanup: () => rmSync(dir, { recursive: true, force: true }) };
  }
  const abs = resolve(process.cwd(), input.file);
  if (!existsSync(abs)) throw new Error(`Entry not found: ${abs}`);
  return { path: abs, cleanup: () => {} };
}

function resolveRuntime(): string {
  const candidates = [
    join(__dirname, "runtime"),
    join(__dirname, "..", "src", "runtime"),
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

async function bundleEntry(runtimeDir: string, entry: string): Promise<string> {
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
    logLevel: "silent",
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeSvgDataUrl(dataUrl: string): string {
  if (!dataUrl.startsWith("data:image/svg+xml")) return dataUrl;
  const commaIdx = dataUrl.indexOf(",");
  const payload = dataUrl.slice(commaIdx + 1);
  if (dataUrl.slice(0, commaIdx).includes(";base64")) {
    return Buffer.from(payload, "base64").toString("utf-8");
  }
  return decodeURIComponent(payload);
}

/** Infer export format from an output file extension. */
export function inferFormat(path: string): ExportFormat | null {
  const ext = path.toLowerCase().split(".").pop();
  switch (ext) {
    case "png":
      return "png";
    case "svg":
      return "svg";
    case "pdf":
      return "pdf";
    case "jpg":
    case "jpeg":
      return "jpg";
    case "webp":
      return "webp";
    default:
      return null;
  }
}
