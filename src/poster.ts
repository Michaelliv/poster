// Poster — SDK class.
//
// Two methods, both pure:
//   • buildHtml(input, options?) → Promise<string>        — self-contained HTML
//   • render(input, options)     → Promise<Buffer|string> — rendered artifact
//
// The CLI is a thin wrapper around these. Never calls process.exit, never
// writes to stdout. Throws on error; callers decide what to do.

import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
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
  /** Fallback canvas when width/height aren't given AND auto-fit can't
   *  measure a sized root. Matches a common desktop poster shape. */
  width: 1440,
  height: 900,
  /** Auto-fit renders inside this viewport first, then measures the
   *  #poster-root's first child to get the true canvas. Generous enough
   *  to fit any sensible poster without clipping. */
  autoFitViewport: { width: 2400, height: 3600 },
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
  async buildHtml(
    input: PosterInput,
    options: BuildOptions = {},
  ): Promise<string> {
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

  private async buildFromPath(
    entry: string,
    options: BuildOptions,
  ): Promise<string> {
    const runtimeDir = resolveRuntime();
    const shell = readFileSync(join(runtimeDir, "shell.html"), "utf-8");

    const title = options.title ?? "Poster";
    const description = options.description ?? "";
    const width = options.width ?? DEFAULTS.width;
    const height = options.height ?? DEFAULTS.height;

    const bundle = await bundleEntry(runtimeDir, entry);
    return renderShell(shell, {
      title,
      description,
      bundle,
      meta: { title, width, height },
    });
  }

  private async renderHtml(
    html: string,
    options: RenderOptions,
  ): Promise<Buffer | string> {
    // Auto-fit mode: no explicit dims → render inside a generous viewport,
    // then measure `#poster-root > :first-child` to get the true canvas.
    // The author declares their own size via `w-[Wpx] h-[Hpx]` (or any
    // explicitly-sized root); the CLI captures that exact box.
    //
    // Forced mode: if --width/--height is given, that wins and we fall
    // back to the legacy viewport screenshot (still useful for posters
    // that genuinely stretch to fill a declared viewport).
    const autoFit = options.width === undefined && options.height === undefined;
    const deviceScaleFactor =
      options.deviceScaleFactor ?? DEFAULTS.deviceScaleFactor;

    const viewport = autoFit
      ? DEFAULTS.autoFitViewport
      : {
          width: options.width ?? DEFAULTS.width,
          height: options.height ?? DEFAULTS.height,
        };

    const executablePath = await this.requireBrowser();

    const tmpDir = mkdtempSync(join(tmpdir(), "poster-render-"));
    const tmpHtml = join(tmpDir, "poster.html");
    writeFileSync(tmpHtml, html);

    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({ ...viewport, deviceScaleFactor });
      await page.goto(pathToFileURL(tmpHtml).href, {
        waitUntil: options.waitUntil ?? DEFAULTS.waitUntil,
      });
      const waitMs = options.waitFor ?? DEFAULTS.waitFor;
      if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));

      // Measure the author's root element if we're auto-fitting.
      const canvas = autoFit
        ? ((await page.evaluate(() => {
            const el = document.querySelector(
              "#poster-root > *",
            ) as HTMLElement | null;
            if (!el) return null;
            const r = el.getBoundingClientRect();
            if (r.width <= 0 || r.height <= 0) return null;
            return { width: Math.round(r.width), height: Math.round(r.height) };
          })) ?? { width: DEFAULTS.width, height: DEFAULTS.height })
        : viewport;

      if (options.format === "pdf") {
        // Puppeteer's `scale` doubles content against a fixed paper size,
        // which clips posters. Text/SVG stay vector without it.
        return Buffer.from(
          await page.pdf({
            width: `${canvas.width}px`,
            height: `${canvas.height}px`,
            printBackground: true,
            pageRanges: "1",
          }),
        );
      }

      if (options.format === "svg") {
        const dataUrl = await page.evaluate(
          async () =>
            await (
              window as unknown as {
                __posterCapture: (f: string) => Promise<string>;
              }
            ).__posterCapture("svg"),
        );
        return decodeSvgDataUrl(dataUrl);
      }

      const type = options.format === "jpg" ? "jpeg" : options.format;

      // In auto-fit mode, screenshot the measured element directly —
      // pixel-exact, no clip math, no stray body background bleeding in.
      if (autoFit) {
        const el = await page.$("#poster-root > *");
        if (el) {
          return Buffer.from(
            await el.screenshot({
              type: type as "png" | "jpeg" | "webp",
              omitBackground: options.format === "png",
              ...(options.format === "jpg" || options.format === "webp"
                ? { quality: 100 }
                : {}),
            }),
          );
        }
        // No sized root found — fall through to viewport clip.
      }

      return Buffer.from(
        await page.screenshot({
          type: type as "png" | "jpeg" | "webp",
          omitBackground: options.format === "png",
          clip: { x: 0, y: 0, width: canvas.width, height: canvas.height },
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

  private async requireBrowser(): Promise<string> {
    const path = await resolveBrowser(
      {
        browser: this.options.browser,
        allowInstall: this.options.installBrowser,
      },
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

function resolveInput(input: PosterInput): {
  path: string;
  cleanup: () => void;
} {
  if ("tsx" in input) {
    const dir = mkdtempSync(join(tmpdir(), "poster-sdk-"));
    const path = join(dir, "entry.tsx");
    writeFileSync(path, input.tsx);
    return {
      path,
      cleanup: () => rmSync(dir, { recursive: true, force: true }),
    };
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
      b.onResolve({ filter: /^virtual:poster-entry$/ }, () => ({
        path: entry,
      }));
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
}

function renderShell(shell: string, a: ShellRenderArgs): string {
  return shell
    .replaceAll("{{TITLE}}", escapeHtml(a.title))
    .replaceAll("{{DESCRIPTION}}", escapeHtml(a.description))
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
