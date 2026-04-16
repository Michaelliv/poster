// CLI `export` — thin wrapper around Poster.render. Handles stdin entry
// persistence, file writing, and human/JSON/quiet output.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { type ExportFormat, inferFormat, Poster } from "../poster.js";
import { EXIT_NOT_FOUND, EXIT_USER_ERROR } from "../utils/exit-codes.js";
import {
  error,
  info,
  output,
  type OutputOptions,
  success,
} from "../utils/output.js";
import { defaultSavePath, resolveEntry } from "./_entry.js";

export type { ExportFormat };

export interface ExportArgs {
  entry: string;
  out: string;
  format?: ExportFormat;
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

export async function exportCmd(
  args: ExportArgs,
  options: OutputOptions,
): Promise<void> {
  const format = args.format ?? inferFormat(args.out);
  if (!format) {
    error("Cannot infer format from output path. Use --format png|svg|pdf|jpg|webp");
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
    if (typeof result === "string") {
      writeFileSync(outPath, result, "utf-8");
    } else {
      writeFileSync(outPath, result);
    }

    const bytes = readFileSync(outPath).length;
    const width = args.width ?? 1440;
    const height = args.height ?? 900;
    output(options, {
      json: () => ({ success: true, out: outPath, format, bytes, width, height }),
      human: () => {
        success(`Exported ${outPath}`);
        info(`${(bytes / 1024).toFixed(1)} KB · ${width}×${height} · ${format}`);
      },
    });
  } catch (err) {
    error((err as Error).message);
    process.exit(EXIT_NOT_FOUND);
  } finally {
    entry.cleanup();
  }
}
