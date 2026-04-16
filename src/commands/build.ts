// CLI `build` — thin wrapper around Poster.buildHtml. Handles stdin entry
// persistence, file writing, and human/JSON/quiet output. All real work is
// in src/poster.ts.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Poster } from "../poster.js";
import { EXIT_ERROR } from "../utils/exit-codes.js";
import {
  error,
  info,
  output,
  type OutputOptions,
  success,
} from "../utils/output.js";
import { defaultSavePath, resolveEntry } from "./_entry.js";

export interface BuildArgs {
  entry: string;
  out: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  installBrowser?: boolean;
  browser?: string;
  save?: string;
  ephemeral?: boolean;
}

export async function build(args: BuildArgs, options: OutputOptions): Promise<void> {
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
    const html = await poster.buildHtml(
      { file: entry.path },
      {
        title: args.title,
        description: args.description,
        width: args.width,
        height: args.height,
      },
    );

    const outPath = resolve(process.cwd(), args.out);
    writeFileSync(outPath, html);

    const sizeKb = (html.length / 1024).toFixed(1);
    output(options, {
      json: () => ({ success: true, out: outPath, sizeKb: Number(sizeKb) }),
      quiet: () => {},
      human: () => {
        success(`Built ${outPath}`);
        info(`${sizeKb} KB — open in any browser`);
      },
    });
  } catch (err) {
    error((err as Error).message);
    process.exit(EXIT_ERROR);
  } finally {
    entry.cleanup();
  }
}
