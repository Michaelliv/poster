#!/usr/bin/env node

import { createRequire } from "node:module";
import { Command } from "commander";
import { build } from "./commands/build.js";
import { exportCmd, type ExportFormat } from "./commands/export.js";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const program = new Command();

program
  .name("poster")
  .description("Single-file distributable React posters — build + export (PNG/SVG/PDF/JPG/WebP)")
  .version(`poster ${version}`, "-v, --version")
  .option("--json", "Output as JSON")
  .option("-q, --quiet", "Suppress output");

program
  .command("build <entry>")
  .description("Build a standalone .html from a .tsx entry file ('-' reads TSX from stdin)")
  .option("-o, --out <path>", "Output .html path", "poster.html")
  .option("-t, --title <title>", "Poster title", "Poster")
  .option("-d, --description <text>", "Meta description / og:description", "")
  .option("-w, --width <px>", "Canvas width", "1440")
  .option("-h, --height <px>", "Canvas height", "900")
  .option("--og", "Inline og:image as a data URL (renders via system browser)")
  .option("--og-width <px>", "OG image width", "1200")
  .option("--og-height <px>", "OG image height", "630")
  .option("--install-browser", "Download chrome-headless-shell if no system browser is found")
  .option("--browser <path>", "Explicit Chrome/Chromium executable for --og")
  .option("--save <path>", "Where to persist stdin TSX (default: .poster/<out>.tsx)")
  .option("--ephemeral", "Skip persistence — stdin written to a tmp dir only")
  .action(async (entry, opts, cmd) => {
    const root = cmd.optsWithGlobals();
    await build(
      {
        entry,
        out: opts.out,
        title: opts.title,
        description: opts.description,
        width: Number(opts.width),
        height: Number(opts.height),
        og: Boolean(opts.og),
        ogWidth: Number(opts.ogWidth),
        ogHeight: Number(opts.ogHeight),
        installBrowser: opts.installBrowser,
        browser: opts.browser,
        save: opts.save,
        ephemeral: Boolean(opts.ephemeral),
      },
      { json: root.json, quiet: root.quiet },
    );
  });

program
  .command("export <entry>")
  .description("Render a .tsx to .png / .svg / .pdf / .jpg / .webp ('-' reads TSX from stdin)")
  .option("-o, --out <path>", "Output file (format inferred from extension)", "poster.png")
  .option("-f, --format <fmt>", "Force format: png | svg | pdf | jpg | webp")
  .option("-w, --width <px>", "Canvas width", "1440")
  .option("-h, --height <px>", "Canvas height", "900")
  .option("--scale <n>", "Device scale factor (retina = 2)", "2")
  .option("--install-browser", "Download chrome-headless-shell if no system browser is found")
  .option("--browser <path>", "Explicit path to a Chrome/Chromium executable")
  .option(
    "--wait-until <event>",
    "Navigation wait: load | domcontentloaded | networkidle0 | networkidle2",
    "networkidle0",
  )
  .option("--wait-for <ms>", "Extra ms to wait after navigation (default 1500 to let animations settle)")
  .option("--save <path>", "Where to persist stdin TSX (default: .poster/<out>.tsx)")
  .option("--ephemeral", "Skip persistence — stdin written to a tmp dir only")
  .action(async (entry, opts, cmd) => {
    const root = cmd.optsWithGlobals();
    await exportCmd(
      {
        entry,
        out: opts.out,
        format: opts.format as ExportFormat | undefined,
        width: Number(opts.width),
        height: Number(opts.height),
        deviceScaleFactor: Number(opts.scale),
        installBrowser: opts.installBrowser,
        browser: opts.browser,
        waitUntil: opts.waitUntil,
        waitFor: opts.waitFor !== undefined ? Number(opts.waitFor) : undefined,
        save: opts.save,
        ephemeral: Boolean(opts.ephemeral),
      },
      { json: root.json, quiet: root.quiet },
    );
  });


program.parseAsync(process.argv).catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
