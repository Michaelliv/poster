// `poster og` — preset for generating Open Graph images.
// Renders the poster at 1200×630 (the canonical OG image size) and writes PNG.

import type { OutputOptions } from "../utils/output.js";
import { exportCmd } from "./export.js";

export interface OgArgs {
  entry: string;
  out: string;
  width?: number;
  height?: number;
  installBrowser?: boolean;
  browser?: string;
}

export async function og(args: OgArgs, options: OutputOptions): Promise<void> {
  await exportCmd(
    {
      entry: args.entry,
      out: args.out,
      format: "png",
      width: args.width ?? 1200,
      height: args.height ?? 630,
      deviceScaleFactor: 2,
      installBrowser: args.installBrowser,
      browser: args.browser,
      waitUntil: "networkidle0",
    },
    options,
  );
}
