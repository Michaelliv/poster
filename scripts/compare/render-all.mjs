// Render every example through the Takumi engine and produce side-by-side
// comparison artifacts against the Chromium reference PNGs that ship
// alongside each .tsx in `examples/`:
//
//   /tmp/poster-takumi-compare/<name>.v1.png   (Chromium reference, copied)
//   /tmp/poster-takumi-compare/<name>.v2.png   (Takumi render)
//   /tmp/poster-takumi-compare/report.md       (per-example status)
//
// Run from the project root:    bun scripts/compare/render-all.mjs
// Rank by visual diff after:    python3 scripts/compare/rank-diffs.py
//
// We capture stdout/stderr per example so failures don't get swallowed.

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..", "..");
const EXAMPLES = join(ROOT, "examples");
const OUT = "/tmp/poster-takumi-compare";
mkdirSync(OUT, { recursive: true });

// Pull canvas dims out of the root element's className. We don't run the
// component — we just lex its source. Why this is more delicate than it
// looks:
//
//   - Helper components can appear above the default export (e.g. boarding.tsx),
//     so "first className in file" picks the wrong element.
//   - Inner panels may have large fixed heights (e.g. comic, changelog),
//     so "largest h-[…]" also picks the wrong element.
//
// Read the className of the first `<div ...>` after the default-export
// `return`. Width is required; height is optional (auto-fit when absent).
function dimensions(tsx) {
  const defaultIdx = tsx.search(
    /export\s+default\s+function|export\s+default\s*\(/,
  );
  const searchFrom = defaultIdx === -1 ? 0 : defaultIdx;
  const returnIdx = tsx.indexOf("return", searchFrom);
  const start = returnIdx === -1 ? searchFrom : returnIdx;
  const rootSlice = tsx.slice(start, start + 4000);
  const classMatch = rootSlice.match(/<div\s+[^>]*className="([^"]+)"/);
  const rootClasses = classMatch ? classMatch[1] : "";
  const wMatch = rootClasses.match(/\bw-\[(\d+)px\]/);
  const hMatch = rootClasses.match(/\bh-\[(\d+)px\]/);
  return {
    width: wMatch ? parseInt(wMatch[1], 10) : 1200,
    height: hMatch ? parseInt(hMatch[1], 10) : null,
  };
}

const tsxFiles = readdirSync(EXAMPLES).filter((f) => f.endsWith(".tsx"));
const targets = tsxFiles.filter((f) =>
  existsSync(join(EXAMPLES, f.replace(/\.tsx$/, ".png"))),
);

const results = [];

for (const file of targets) {
  const name = file.replace(/\.tsx$/, "");
  const tsxPath = join(EXAMPLES, file);
  const tsxText = await Bun.file(tsxPath).text();
  const { width, height } = dimensions(tsxText);
  const referencePng = join(EXAMPLES, `${name}.png`);
  const v1Path = join(OUT, `${name}.v1.png`);
  const v2Path = join(OUT, `${name}.v2.png`);

  process.stdout.write(`[${name}] ${width}x${height ?? "auto"}... `);
  copyFileSync(referencePng, v1Path);

  const args = [
    "run",
    "src/main.ts",
    "export",
    tsxPath,
    "-o",
    v2Path,
    "--engine",
    "takumi",
    "-w",
    String(width),
  ];
  if (height !== null) {
    args.push("-h", String(height));
  }

  const start = Date.now();
  const result = spawnSync("bun", args, {
    cwd: ROOT,
    timeout: 180_000,
    encoding: "utf-8",
  });
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  if (result.status !== 0) {
    const err = (result.stderr || "")
      .split("\n")
      .filter(Boolean)
      .slice(-3)
      .join(" | ");
    process.stdout.write(`FAILED (${elapsed}s)\n  └─ ${err}\n`);
    results.push({ name, status: "fail", elapsed, error: err });
  } else {
    const fontLine = (result.stderr || "")
      .split("\n")
      .find((l) => l.includes("loaded") && l.includes("font face"));
    process.stdout.write(
      `ok (${elapsed}s)${fontLine ? ` · ${fontLine.trim()}` : ""}\n`,
    );
    results.push({ name, status: "ok", elapsed, v1Path, v2Path });
  }
}

const ok = results.filter((r) => r.status === "ok").length;
const fail = results.filter((r) => r.status === "fail").length;
const lines = [];
lines.push("# poster Takumi comparison report");
lines.push("");
lines.push(`- ${ok}/${results.length} rendered successfully`);
lines.push(`- ${fail} failed`);
lines.push("");
if (fail > 0) {
  lines.push("## Failures");
  for (const r of results.filter((r) => r.status === "fail")) {
    lines.push(`- **${r.name}** — ${r.error}`);
  }
  lines.push("");
}
lines.push("## Rendered");
for (const r of results.filter((r) => r.status === "ok")) {
  lines.push(
    `- **${r.name}** — v1: \`${r.v1Path}\` · v2: \`${r.v2Path}\` · ${r.elapsed}s`,
  );
}
writeFileSync(join(OUT, "report.md"), lines.join("\n"));

console.log("");
console.log(`report → ${join(OUT, "report.md")}`);
console.log(`PNGs   → ${OUT}/`);
