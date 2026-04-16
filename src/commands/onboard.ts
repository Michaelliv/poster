import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { output, success, type OutputOptions } from "../utils/output.js";

const INSTRUCTIONS = `
<poster>
Use \`poster\` to produce single-file distributable React pages. One \`.tsx\` file with a default-exported component compiles to one \`.html\` file that opens in any browser, renders live, and can export itself as PNG / SVG / PDF via a toolbar (powered by Satori + resvg).

<commands>
- \`poster build app.tsx -o app.html\` — build a standalone HTML
- \`poster dev app.tsx\` — local dev server with file-watch rebuild
- \`poster build app.tsx -o out.html --width 1600 --height 900\` — set export canvas size
</commands>

<authoring>
- The file must default-export a React component.
- Available imports: \`react\`, \`react-dom\`, \`recharts\`, \`lucide-react\`, \`lodash\`, \`papaparse\`, \`d3-scale\`, \`d3-shape\`, \`clsx\`, \`class-variance-authority\`.
- Tailwind is available via CDN — classNames just work.
- For charts, use Recharts with **fixed width/height** (not \`ResponsiveContainer\`) and pass \`isAnimationActive={false}\` so the Satori export path renders correctly. Avoid \`Tooltip\` / \`Brush\` for export-safe output.
- No network calls, no browser APIs that rely on user gestures — Satori is a one-shot render pass.
</authoring>

<rules>
- ALWAYS use \`--json\` flag for machine-readable output.
- The output \`.html\` is self-contained — no external requests required except the Tailwind CDN (will be inlined in a later version).
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
