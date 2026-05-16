#!/usr/bin/env node

import { createRequire } from "node:module";
import { Command } from "commander";
import { build } from "./commands/build.js";
import { type ExportFormat, exportCmd } from "./commands/export.js";
import type { Engine } from "./poster.js";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const program = new Command();

program
  .name("poster")
  .description(
    "Single-file distributable React posters — build + export (PNG/SVG/PDF/JPG/WebP)",
  )
  .version(`poster ${version}`, "-v, --version")
  .option("--json", "Output as JSON")
  .option("-q, --quiet", "Suppress output");

program
  .command("build <entry>")
  .description(
    "Build a standalone .html from a .tsx entry file ('-' reads TSX from stdin)",
  )
  .option("-o, --out <path>", "Output .html path", "poster.html")
  .option("-t, --title <title>", "Poster title", "Poster")
  .option("-d, --description <text>", "Meta description", "")
  .option(
    "-w, --width <px>",
    "Force canvas width (default: auto — measured from poster root)",
  )
  .option(
    "-h, --height <px>",
    "Force canvas height (default: auto — measured from poster root)",
  )
  .option(
    "--save <path>",
    "Where to persist stdin TSX (default: .poster/<out>.tsx)",
  )
  .option("--ephemeral", "Skip persistence — stdin written to a tmp dir only")
  .action(async (entry, opts, cmd) => {
    const root = cmd.optsWithGlobals();
    await build(
      {
        entry,
        out: opts.out,
        title: opts.title,
        description: opts.description,
        width: opts.width !== undefined ? Number(opts.width) : undefined,
        height: opts.height !== undefined ? Number(opts.height) : undefined,
        save: opts.save,
        ephemeral: Boolean(opts.ephemeral),
      },
      { json: root.json, quiet: root.quiet },
    );
  });

program
  .command("export <entry>")
  .description(
    "Render a .tsx to .png / .svg / .pdf / .jpg / .webp ('-' reads TSX from stdin)",
  )
  .option(
    "-o, --out <path>",
    "Output file (format inferred from extension)",
    "poster.png",
  )
  .option("-f, --format <fmt>", "Force format: png | svg | pdf | jpg | webp")
  .option(
    "-w, --width <px>",
    "Force canvas width (default: auto — measured from poster root)",
  )
  .option(
    "-h, --height <px>",
    "Force canvas height (default: auto — measured from poster root)",
  )
  .option("--scale <n>", "Device scale factor (retina = 2)", "2")
  .option(
    "--engine <name>",
    "Rendering engine: takumi (default, browserless) | chrome",
    "takumi",
  )
  .option(
    "--install-browser",
    "Download chrome-headless-shell if no system browser is found (chrome engine only)",
  )
  .option("--browser <path>", "Explicit path to a Chrome/Chromium executable")
  .option(
    "--wait-until <event>",
    "Navigation wait: load | domcontentloaded | networkidle0 | networkidle2",
    "networkidle0",
  )
  .option(
    "--wait-for <ms>",
    "Extra ms to wait after navigation (default 1500 to let animations settle)",
  )
  .option(
    "--save <path>",
    "Where to persist stdin TSX (default: .poster/<out>.tsx)",
  )
  .option("--ephemeral", "Skip persistence — stdin written to a tmp dir only")
  .action(async (entry, opts, cmd) => {
    const root = cmd.optsWithGlobals();
    await exportCmd(
      {
        entry,
        out: opts.out,
        format: opts.format as ExportFormat | undefined,
        engine: opts.engine as Engine,
        width: opts.width !== undefined ? Number(opts.width) : undefined,
        height: opts.height !== undefined ? Number(opts.height) : undefined,
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
