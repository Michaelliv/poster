# Poster

> One `.tsx` file, every format you'll ever need.

A default-exported React component compiles to a self-contained `.html` file and renders to PNG / SVG / JPG / WebP / PDF via headless Chrome. Works as a **CLI** and as a **library**.

## Install

```bash
npm install -g poster-ai         # CLI (installs the `poster` binary)
npm install poster-ai            # library
```

## CLI

```bash
poster build app.tsx -o app.html            # standalone .html
poster build app.tsx -o app.html --og       # ...with og:image baked in
poster export app.tsx -o out.png            # render via headless Chrome

cat app.tsx | poster export - -o out.png    # or pipe TSX on stdin
```

Any entry of `-` reads TSX from stdin and persists to `.poster/<basename>.tsx`
so an agent can iterate on it next run. Pass `--ephemeral` to skip persistence.

## Library

```ts
import { writeFileSync } from "node:fs";
import { Poster } from "poster-ai";

const poster = new Poster();

// TSX → self-contained HTML string
const html = await poster.buildHtml(
  { tsx: `export default () => <h1 className="text-5xl">Hi</h1>` },
  { title: "Hello", width: 1200, height: 600 },
);

// TSX → PNG Buffer (also jpg / webp / pdf → Buffer, svg → string)
const png = await poster.render(
  { tsx: source },
  { format: "png", width: 1600, height: 900 },
);
writeFileSync("poster.png", png);

// Or render a file on disk
const pdf = await poster.render(
  { file: "./app.tsx" },
  { format: "pdf", width: 1400, height: 1800 },
);
```

Inputs are discriminated: `{ tsx }` for in-memory source, `{ file }` for a
path on disk. No side effects — the SDK returns data; the caller writes it.
Errors throw; no `process.exit` from inside the library.

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

## Export pipeline

Exports go through a headless browser via `puppeteer-core` — screenshotting the rendered DOM so there's no Satori-subset fidelity loss. Resolution order at runtime: system Chrome / Brave / Edge (preferred — warmer, newer), then a bundled `chrome-headless-shell` that was downloaded by the package's postinstall step.

### Browser install

When you `npm install poster-ai` (or `bun install poster-ai`), a postinstall script fetches `chrome-headless-shell` (~80 MB) into `~/.cache/poster-browsers/`. This means `poster export` works out of the box on fresh machines with no Chrome installed.

Opt out with `POSTER_SKIP_BROWSER_DOWNLOAD=1`:

```bash
POSTER_SKIP_BROWSER_DOWNLOAD=1 npm install -g poster-ai
```

If the download fails (offline, corporate proxy, etc.), the install still succeeds with a warning. You can retry later with `poster export --install-browser`.

## OG images

`poster build --og` bakes a 1200×630 JPEG into the HTML as an `og:image` data URL. When hosted (any static host) social crawlers pick it up. Platform support for data URLs in `og:image` is uneven in practice: Discord renders them; WhatsApp / Twitter / Facebook currently ignore data URLs and fall back to title + description only. If you need a universal preview image, pair the HTML with a separately-hosted `.png` and update the meta tags to point at it.

## For agents

Every CLI command supports `--json` for machine-readable output. Combined
with stdin entries (`poster export - -o out.png`), an agent can generate
visuals in a single pass with no filesystem scaffolding.

## License

MIT
