# Poster

> Single-file distributable React posters.

One `.tsx` file with a default-exported React component → one `.html` file that opens in any browser, renders live, and exports itself as PNG, SVG, or PDF.

## Install

```bash
npm install -g poster-cli
```

## Quick start

```bash
poster build app.tsx -o app.html
open app.html
```

Or iterate with the dev server:

```bash
poster dev app.tsx
# → http://localhost:5173
```

## Authoring a poster

```tsx
import { LineChart, Line, XAxis, YAxis } from "recharts";

const data = [{ name: "Jan", v: 400 }, { name: "Feb", v: 300 }];

export default function App() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">Hello</h1>
      <LineChart width={400} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="v" isAnimationActive={false} dot={false} />
      </LineChart>
    </div>
  );
}
```

Available imports: `react`, `react-dom`, `recharts`, `lucide-react`, `lodash`, `papaparse`, `d3-scale`, `d3-shape`, `clsx`, `class-variance-authority`. Tailwind classes work via CDN.

## Export

Every built poster ships with a floating toolbar (bottom-right): **PNG**, **SVG**, **PDF**. Click to download. The render goes through Satori, so the component must use the Satori-compatible subset for pixel-accurate export.

**For charts:** use Recharts with fixed `width`/`height` and `isAnimationActive={false}`. Avoid `ResponsiveContainer`, `Tooltip`, and `Brush` in the export path.

## For agents

`poster onboard` appends authoring instructions to `CLAUDE.md` or `AGENTS.md`. Every command supports `--json` for machine-readable output.

## License

MIT
