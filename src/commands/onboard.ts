import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { output, success, type OutputOptions } from "../utils/output.js";

const INSTRUCTIONS = `
<poster>
Use \`poster\` to produce single-file distributable React pages. One \`.tsx\` file with a default-exported component compiles to one \`.html\` file that opens in any browser and renders live. Export to PNG / SVG / JPG / WebP / PDF is handled by the \`poster export\` CLI — the HTML itself is view-only.

<commands>
- \`poster build app.tsx -o app.html\` — build a standalone HTML.
- \`poster build app.tsx -o app.html --og\` — also bake an og:image data URL for Discord and social previews.
- \`poster build app.tsx -o app.html --width 1600 --height 900\` — set canvas size.
- \`poster dev app.tsx\` — local dev server with file-watch rebuild.
- \`poster export app.tsx -o out.png\` — server-side render via headless Chrome (PNG / SVG / JPG / WebP / PDF).
- \`poster og app.tsx -o og.png\` — preset: 1200×630 PNG for og:image metadata.
</commands>

<authoring>
- The file must default-export a React component.
- Use anything that works in the browser — Recharts, lucide-react, Tailwind (via CDN), shadcn/ui. No Satori-subset restrictions.
- Canvas is fixed at build time; content that exceeds the canvas gets clipped in exports. Design to fit the specified \`--width\` / \`--height\`.
- For chart-heavy pages, exports wait 1500 ms after load so animations settle. Override with \`--wait-for <ms>\` if you use longer animations.
- \`poster export\` and \`poster og\` prefer the system Chrome/Brave/Edge; otherwise they use a \`chrome-headless-shell\` downloaded at \`npm install\` time (opt out with \`POSTER_SKIP_BROWSER_DOWNLOAD=1\`).
</authoring>

<rules>
- ALWAYS use \`--json\` flag for machine-readable output.
- The output \`.html\` is self-contained apart from one dependency: the Tailwind CDN script (used for class-based styling). Offline rendering works for everything already-painted; only the initial Tailwind stylesheet needs network.
</rules>
</poster>
`.trim();

const MARKER = "<poster>";

export async function onboard(options: OutputOptions): Promise<void> {
  const cwd = process.cwd();
  const claudeMd = join(cwd, "CLAUDE.md");
  const agentsMd = join(cwd, "AGENTS.md");

  const targetFile = existsSync(claudeMd)
    ? claudeMd
    : existsSync(agentsMd)
      ? agentsMd
      : claudeMd;

  const existing = existsSync(targetFile) ? readFileSync(targetFile, "utf-8") : "";

  if (existing.includes(MARKER)) {
    output(options, {
      json: () => ({ success: true, file: targetFile, message: "already_onboarded" }),
      human: () => success(`Already onboarded (${targetFile})`),
    });
    return;
  }

  const body = existing ? `${existing.trimEnd()}\n\n${INSTRUCTIONS}\n` : `${INSTRUCTIONS}\n`;
  writeFileSync(targetFile, body);

  output(options, {
    json: () => ({ success: true, file: targetFile }),
    human: () => success(`Added poster instructions to ${targetFile}`),
  });
}
