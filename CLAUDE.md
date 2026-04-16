# Poster

Single-file distributable React posters. One `.tsx` in, one `.html` out — live React in the browser, exportable as PNG / SVG / PDF / JPG / WebP via a built-in toolbar. A server-side `poster export` uses the system browser (no Chromium bundle).

## Commands

```bash
bun run src/main.ts build examples/dashboard.tsx -o examples/dashboard.html --og
bun run src/main.ts dev   examples/dashboard.tsx
bun run src/main.ts export examples/dashboard.tsx -o out.png
bun run src/main.ts og    examples/dashboard.tsx -o og.png

npm run build    # tsc + copy runtime/ → dist/runtime/
npm run test
npm run check    # biome
bunx tsc --noEmit  # type-check including runtime/
```

## Architecture

**1. CLI (`src/main.ts` + `src/commands/`).** Commander entry. `build` bundles, `dev` watches + serves, `export` renders via headless Chrome, `og` is an `export` preset at 1200×630 PNG, `onboard` teaches agents.

**2. Build step (`src/commands/build.ts`).** esbuild bundles `src/runtime/bootstrap.tsx` (which imports `virtual:poster-entry`, rewritten by a plugin to the user's `.tsx`) into a single IIFE. The IIFE is inlined into `src/runtime/shell.html` along with `__POSTER_META__` and OG/Twitter meta tags. With `--og`, build does a two-pass: render the HTML to a JPEG via puppeteer, base64-embed as `og:image` data URL, then re-template.

**3. Runtime (`src/runtime/`).** `shell.html` is the skeleton with Tailwind CDN + export toolbar + OG meta placeholders. `bootstrap.tsx` mounts the user component, wires the toolbar, and exposes `window.__posterCapture` for the server-side SVG path. `export.ts` uses **snapDOM** for client-side capture → SVG/PNG/JPG/WebP, plus **jsPDF** for PDF (via canvas → PNG → PDF embed).

**4. Server-side export (`src/commands/export.ts` + `_render.ts`).** Uses `puppeteer-core`. Resolution order: system Chrome / Brave / Edge (preferred), then a bundled `chrome-headless-shell` that the package's postinstall script (`src/scripts/install-browser.ts`) fetches into `~/.cache/poster-browsers/` at install time. Users can opt out of the postinstall download with `POSTER_SKIP_BROWSER_DOWNLOAD=1`. Rasterizes via `page.screenshot()`, PDF via `page.pdf()`, SVG via the in-page `__posterCapture` hook.

## Key decisions

- **No in-browser compile.** esbuild runs at build time. Saves ~300 KB vs Stage's approach.
- **Tailwind via CDN for v1.** Will inline a purged sheet later so the artifact is truly zero-network.
- **Toolbar exports are lazy.** snapDOM + jsPDF code-split into a chunk loaded on first click.
- **System browser first.** `poster export` prefers locally-installed Chrome/Brave/Edge over downloading anything.
- **OG inline as data URL.** `build --og` bakes a 1200×630 JPEG into `og:image`. Discord renders it; WhatsApp/Twitter/FB currently reject data URLs.
- **Animations need to settle.** Both `poster export` and `build --og` wait 1500 ms after `networkidle0` so Recharts' default animations finish before capture.

## Adding a new command

1. Create `src/commands/<name>.ts` exporting a function that takes args + `OutputOptions`.
2. Import it in `src/main.ts` and register with Commander.
3. Use `output(options, { json, quiet, human })` for the output triple.

## Known TODOs

- Inline Tailwind (purge from user code) instead of CDN
- Tests (none yet; CI runs `bun test` against an empty suite)
- `src/runtime/*` files aren't in `tsconfig.exclude` — but they're still type-checked transitively via imports. Works, but `tsc` ran against the full tree should stay green.

<poster>
Use `poster` to produce single-file distributable React pages. One `.tsx` file with a default-exported component compiles to one `.html` file that opens in any browser, renders live, and can export itself as PNG / SVG / JPG / WebP / PDF via a floating toolbar (powered by snapDOM + jsPDF).

<commands>
- `poster build app.tsx -o app.html` — build a standalone HTML.
- `poster build app.tsx -o app.html --og` — also bake an og:image data URL for Discord and social previews.
- `poster build app.tsx -o app.html --width 1600 --height 900` — set canvas size.
- `poster dev app.tsx` — local dev server with file-watch rebuild.
- `poster export app.tsx -o out.png` — server-side render via headless Chrome (PNG / SVG / JPG / WebP / PDF).
- `poster og app.tsx -o og.png` — preset: 1200×630 PNG for og:image metadata.
</commands>

<authoring>
- The file must default-export a React component.
- Use anything that works in the browser — Recharts, lucide-react, Tailwind (via CDN), shadcn/ui. No Satori-subset restrictions.
- Canvas is fixed at build time; content that exceeds the canvas gets clipped in exports. Design to fit the specified `--width` / `--height`.
- For chart-heavy pages, exports wait 1500 ms after load so animations settle. Override with `--wait-for <ms>` if you use longer animations.
- `poster export` and `poster og` prefer the system Chrome/Brave/Edge; otherwise they use a `chrome-headless-shell` downloaded at `npm install` time (opt out with `POSTER_SKIP_BROWSER_DOWNLOAD=1`).
</authoring>

<rules>
- ALWAYS use `--json` flag for machine-readable output.
- The output `.html` is self-contained apart from one dependency: the Tailwind CDN script (used for class-based styling). Offline rendering works for everything already-painted; only the initial Tailwind stylesheet needs network.
</rules>
</poster>
