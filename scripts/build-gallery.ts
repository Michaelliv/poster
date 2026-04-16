#!/usr/bin/env bun
/**
 * Regenerate the gallery section of README.md from examples/prompts.json.
 *
 * Looks for the markers
 *
 *     <!-- gallery:start -->
 *     <!-- gallery:end -->
 *
 * and rewrites everything between them with one row per example
 * (image + prompt). If the markers are absent, the section is appended.
 *
 * Run: `bun scripts/build-gallery.ts`
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const README = join(ROOT, "README.md");
const PROMPTS = join(ROOT, "examples", "prompts.json");

const prompts = JSON.parse(readFileSync(PROMPTS, "utf8")) as Record<string, string>;

/** Pick the rendered image extension for a given slug (.png preferred). */
function imageFor(slug: string): string | null {
  for (const ext of ["png", "jpg", "webp"] as const) {
    if (existsSync(join(ROOT, "examples", `${slug}.${ext}`))) {
      return `examples/${slug}.${ext}`;
    }
  }
  return null;
}

/** HTML-escape a prompt string so it survives inside a <td>. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const slugs = Object.keys(prompts).sort();
const rows = slugs
  .map((slug) => {
    const img = imageFor(slug);
    if (!img) return null;
    return `  <tr>
    <td width="45%" valign="top"><a href="${img}"><img src="${img}" alt="${slug}" /></a></td>
    <td valign="top"><strong><code>${slug}</code></strong> · <a href="examples/${slug}.tsx">source</a> · <a href="examples/${slug}.txt">prompt</a><br/><br/><sub>${esc(prompts[slug])}</sub></td>
  </tr>`;
  })
  .filter((row): row is string => row !== null);

const section = `<!-- gallery:start -->
## Gallery

All ${rows.length} examples below render through the same pipeline. Each row pairs the rendered output with the prompt that produced it. The 14 hand-authored seed examples (\`brutalist\`, \`calendar\`, \`concert\`, \`dashboard\`, \`dataart\`, \`devwrap\`, \`editorial\`, \`fitness\`, \`memphis\`, \`neon\`, \`showcase\`, \`vogue\`, \`weather\`, \`wrapped\`) have reverse-engineered prompts; the rest were generated end-to-end.

<table>
${rows.join("\n")}
</table>

<sub>Regenerate this section with <code>bun scripts/build-gallery.ts</code>.</sub>
<!-- gallery:end -->`;

const original = readFileSync(README, "utf8");
const markerRe = /<!-- gallery:start -->[\s\S]*?<!-- gallery:end -->/;
const next = markerRe.test(original)
  ? original.replace(markerRe, section)
  : `${original.trimEnd()}\n\n---\n\n${section}\n`;

writeFileSync(README, next);
console.log(`gallery: ${rows.length} rows written to README.md`);
