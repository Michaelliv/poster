// CLI `export` — thin wrapper around Poster.render. Handles stdin entry
// persistence, file writing, and human/JSON/quiet output.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { type Engine, type ExportFormat, inferFormat, Poster } from "../poster.js";
import { EXIT_ERROR, EXIT_USER_ERROR } from "../utils/exit-codes.js";
import {
  error,
  info,
  type OutputOptions,
  output,
  success,
} from "../utils/output.js";
import { defaultSavePath, resolveEntry } from "./_entry.js";

export type { ExportFormat };

export interface ExportArgs {
  entry: string;
  out: string;
  format?: ExportFormat;
  engine?: Engine;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  installBrowser?: boolean;
  browser?: string;
  waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2";
  waitFor?: number;
  save?: string;
  ephemeral?: boolean;
}

/** Extract width/height from a PNG buffer via the IHDR chunk. */
function readPngDims(buf: Buffer): { width: number; height: number } | null {
  // PNG signature = 8 bytes, then IHDR chunk starts at byte 8.
  // IHDR: 4-byte length, 4-byte type ("IHDR"), then 4-byte width, 4-byte
  // height (both big-endian). Width is at offset 16, height at 20.
  if (buf.length < 24) return null;
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

export async function exportCmd(
  args: ExportArgs,
  options: OutputOptions,
): Promise<void> {
  const format = args.format ?? inferFormat(args.out);
  if (!format) {
    error(
      "Cannot infer format from output path. Use --format png|svg|pdf|jpg|webp",
    );
    process.exit(EXIT_USER_ERROR);
  }

  const savePath = args.ephemeral
    ? null
    : (args.save ?? defaultSavePath(args.out));
  const entry = await resolveEntry(args.entry, {
    savePath,
    announce: !options.quiet && !options.json,
  });

  try {
    const poster = new Poster({
      engine: args.engine,
      browser: args.browser,
      installBrowser: args.installBrowser,
    });
    const result = await poster.render(
      { file: entry.path },
      {
        format,
        width: args.width,
        height: args.height,
        deviceScaleFactor: args.deviceScaleFactor,
        waitUntil: args.waitUntil,
        waitFor: args.waitFor,
      },
    );

    const outPath = resolve(process.cwd(), args.out);
    const bytes =
      typeof result === "string"
        ? Buffer.byteLength(result, "utf-8")
        : result.length;
    if (typeof result === "string") {
      writeFileSync(outPath, result, "utf-8");
    } else {
      writeFileSync(outPath, result);
    }

    // Surface the real pixel dims so auto-fit output isn't a lie. For
    // non-PNG formats we fall back to the forced args — best effort.
    const scale = args.deviceScaleFactor ?? 2;
    const dims = typeof result === "string" ? null : readPngDims(result);
    const width = dims
      ? Math.round(dims.width / scale)
      : (args.width ?? null);
    const height = dims
      ? Math.round(dims.height / scale)
      : (args.height ?? null);
    const dimsLabel =
      width && height ? `${width}×${height}` : "auto";
    output(options, {
      json: () => ({
        success: true,
        out: outPath,
        format,
        bytes,
        width,
        height,
      }),
      human: () => {
        success(`Exported ${outPath}`);
        info(
          `${(bytes / 1024).toFixed(1)} KB · ${dimsLabel} · ${format}`,
        );
      },
    });
  } catch (err) {
    error((err as Error).message);
    process.exit(EXIT_ERROR);
  } finally {
    entry.cleanup();
  }
}
