// Server-side export — builds the HTML, launches a system browser (or a
// locally-installed chrome-headless-shell as fallback), and screenshots or
// prints it.
//
// Browser preference, in order:
//   1. System Chrome / Brave / Edge (zero download)
//   2. Playwright/Puppeteer's chrome-headless-shell if previously installed
//   3. Auto-install chrome-headless-shell via @puppeteer/browsers (~80 MB)
//      — only when --install-browser is passed, otherwise fail clearly.

import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import { build } from "./build.js";
import { NO_BROWSER_HINT, resolveBrowser } from "./_render.js";
import { EXIT_NOT_FOUND, EXIT_USER_ERROR } from "../utils/exit-codes.js";
import {
  error,
  hint,
  info,
  output,
  type OutputOptions,
  success,
} from "../utils/output.js";

export type ExportFormat = "png" | "svg" | "pdf" | "jpg" | "webp";

export interface ExportArgs {
  entry: string;
  out: string;
  format?: ExportFormat;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  installBrowser?: boolean;
  browser?: string; // explicit path override
  waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2";
  waitFor?: number; // extra ms to wait after load
}

export async function exportCmd(args: ExportArgs, options: OutputOptions): Promise<void> {
  const entry = resolve(process.cwd(), args.entry);
  if (!existsSync(entry)) {
    error(`Entry not found: ${entry}`);
    process.exit(EXIT_NOT_FOUND);
  }

  const format = args.format ?? inferFormat(args.out);
  if (!format) {
    error(`Cannot infer format from output path. Use --format png|svg|pdf|jpg|webp`);
    process.exit(EXIT_USER_ERROR);
  }

  const outPath = resolve(process.cwd(), args.out);
  const width = args.width ?? 1440;
  const height = args.height ?? 900;
  const deviceScaleFactor = args.deviceScaleFactor ?? 2;

  const executablePath = await resolveBrowser(
    { browser: args.browser, allowInstall: args.installBrowser },
    options,
  );
  if (!executablePath) {
    error("No system browser found (Chrome, Brave, Edge, Chromium).");
    hint(NO_BROWSER_HINT);
    process.exit(EXIT_NOT_FOUND);
  }

  // Build the HTML into a tmp file, then load it via file://
  const tmpDir = mkdtempSync(join(tmpdir(), "poster-export-"));
  const htmlPath = join(tmpDir, "poster.html");

  try {
    // Internal build — suppress its output regardless of the caller's flags.
    await build(
      { entry, out: htmlPath, title: "Poster", width, height },
      { quiet: true },
    );

    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      // No --font-render-hinting=none: it disables subpixel hinting and
      // visibly softens text. Default hinting matches what users see live.
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width, height, deviceScaleFactor });
      await page.goto(pathToFileURL(htmlPath).href, {
        waitUntil: args.waitUntil ?? "networkidle0",
      });
      // Default 1500ms to let chart animations (Recharts, etc) settle before
      // capture. Override with --wait-for 0 for static content.
      const waitMs = args.waitFor ?? 1500;
      if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));

      if (format === "pdf") {
        // No `scale` override: Puppeteer's scale doubles content against a
        // fixed paper size, which clips posters designed for width×height.
        // Text and SVG (recharts, lucide) are already vector — crisp at any
        // zoom. Bitmap content would benefit from scale, but posters rarely
        // have any, and the layout risk outweighs the win.
        const pdf = await page.pdf({
          width: `${width}px`,
          height: `${height}px`,
          printBackground: true,
          pageRanges: "1",
        });
        writeFileSync(outPath, pdf);
      } else if (format === "svg") {
        const dataUrl = await page.evaluate(
          async () => await (window as any).__posterCapture("svg"),
        );
        writeFileSync(outPath, decodeSvgDataUrl(dataUrl));
      } else {
        // PNG is lossless — quality is ignored. JPEG & WebP run at 100 for the
        // crispest output; users who want smaller files can re-encode downstream.
        const type = format === "jpg" ? "jpeg" : format;
        const buf = await page.screenshot({
          type: type as "png" | "jpeg" | "webp",
          omitBackground: format === "png",
          clip: { x: 0, y: 0, width, height },
          ...(format === "jpg" || format === "webp" ? { quality: 100 } : {}),
        });
        writeFileSync(outPath, buf);
      }
    } finally {
      await browser.close();
    }

    const bytes = readFileSync(outPath).length;
    output(options, {
      json: () => ({ success: true, out: outPath, format, bytes, width, height }),
      human: () => {
        success(`Exported ${outPath}`);
        info(`${(bytes / 1024).toFixed(1)} KB · ${width}×${height} · ${format}`);
      },
    });
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

function inferFormat(out: string): ExportFormat | null {
  const ext = extname(out).toLowerCase();
  if (ext === ".png") return "png";
  if (ext === ".svg") return "svg";
  if (ext === ".pdf") return "pdf";
  if (ext === ".jpg" || ext === ".jpeg") return "jpg";
  if (ext === ".webp") return "webp";
  return null;
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


