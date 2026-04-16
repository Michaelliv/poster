#!/usr/bin/env node

import { createRequire } from "node:module";
import { Command } from "commander";
import { build } from "./commands/build.js";
import { dev } from "./commands/dev.js";
import { onboard } from "./commands/onboard.js";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const program = new Command();

program
  .name("poster")
  .description("Single-file distributable React posters — live + exportable (PNG/SVG/PDF)")
  .version(`poster ${version}`, "-v, --version")
  .option("--json", "Output as JSON")
  .option("-q, --quiet", "Suppress output");

program
  .command("build <entry>")
  .description("Build a standalone .html from a .tsx entry file")
  .option("-o, --out <path>", "Output .html path", "poster.html")
  .option("-t, --title <title>", "Poster title", "Poster")
  .option("-w, --width <px>", "Export canvas width in px", "1200")
  .option("-h, --height <px>", "Export canvas height in px", "800")
  .action(async (entry, opts, cmd) => {
    const root = cmd.optsWithGlobals();
    await build(
      {
        entry,
        out: opts.out,
        title: opts.title,
        width: Number(opts.width),
        height: Number(opts.height),
      },
      { json: root.json, quiet: root.quiet },
    );
  });

program
  .command("dev <entry>")
  .description("Dev server with file-watch rebuild")
  .option("-p, --port <port>", "Server port", "5173")
  .option("-t, --title <title>", "Poster title", "Poster")
  .option("-w, --width <px>", "Export canvas width in px", "1200")
  .option("-h, --height <px>", "Export canvas height in px", "800")
  .action(async (entry, opts, cmd) => {
    const root = cmd.optsWithGlobals();
    await dev(
      {
        entry,
        port: Number(opts.port),
        title: opts.title,
        width: Number(opts.width),
        height: Number(opts.height),
      },
      { json: root.json, quiet: root.quiet },
    );
  });

program
  .command("onboard")
  .description("Add poster instructions to CLAUDE.md or AGENTS.md")
  .action(async (_opts, cmd) => {
    const root = cmd.optsWithGlobals();
    await onboard({ json: root.json, quiet: root.quiet });
  });

program.parseAsync(process.argv).catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
