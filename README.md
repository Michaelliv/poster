# Poster

> Single-file distributable React posters.

One `.tsx` file with a default-exported React component → one `.html` file that opens in any browser, renders live, and exports itself as PNG, SVG, JPG, WebP, or PDF.

## Install

```bash
npm install -g poster-cli
```

## Quick start

```bash
poster build app.tsx -o app.html            # standalone .html
poster build app.tsx -o app.html --og       # ...with og:image baked in
poster export app.tsx -o out.png            # render via headless Chrome
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
        <Line dataKey="v" />
      </LineChart>
    </div>
  );
}
```

Use anything that works in the browser — Recharts, lucide-react, Tailwind classes (via CDN), shadcn/ui, lodash. No authoring constraints.

## Export

Every built poster ships with a floating toolbar (bottom-right): **PNG · SVG · WebP · PDF**. Captures via [snapDOM](https://github.com/zumerlab/snapdom) — no browser fidelity loss, no Satori-subset limits.

For server-side exports (CI, scripts, OG generation), `poster export` uses a headless browser via `puppeteer-core`. Resolution order at runtime: system Chrome / Brave / Edge (preferred — warmer, newer), then a bundled `chrome-headless-shell` that was downloaded by the package's postinstall step.

### Browser install

When you `npm install poster-cli` (or `bun install poster-cli`), a postinstall script fetches `chrome-headless-shell` (~80 MB) into `~/.cache/poster-browsers/`. This means `poster export` works out of the box on fresh machines with no Chrome installed.

Opt out with `POSTER_SKIP_BROWSER_DOWNLOAD=1`:

```bash
POSTER_SKIP_BROWSER_DOWNLOAD=1 npm install -g poster-cli
```

If the download fails (offline, corporate proxy, etc.), the install still succeeds with a warning. You can retry later with `poster export --install-browser`.

## OG images

`poster build --og` bakes a 1200×630 JPEG into the HTML as an `og:image` data URL. When hosted (any static host) social crawlers pick it up. Platform support for data URLs in `og:image` is uneven in practice: Discord renders them; WhatsApp / Twitter / Facebook currently ignore data URLs and fall back to title + description only. If you need a universal preview image, pair the HTML with a separately-hosted `.png` and update the meta tags to point at it.

## For agents

`poster onboard` appends authoring instructions to `CLAUDE.md` or `AGENTS.md`. Every command supports `--json` for machine-readable output.

## License

MIT
