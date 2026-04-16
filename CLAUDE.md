# Poster

Single-file distributable React posters. One `.tsx` in, one `.html` out — live React in the browser, exportable as PNG / SVG / PDF via a built-in toolbar.

## Commands

```bash
bun run dev -- build examples/hello.tsx -o examples/hello.html
bun run dev -- dev  examples/hello.tsx
bun run dev -- --help

npm run build    # tsc + copy runtime/ → dist/runtime/
npm run test
npm run check    # biome
```

## Architecture

Three layers:

**1. CLI (`src/main.ts` + `src/commands/`)** — Commander entry. `build` does a one-shot bundle, `dev` watches + serves, `onboard` teaches agents how to author.

**2. Build step (`src/commands/build.ts`)** — esbuild bundles `src/runtime/bootstrap.tsx` (which imports `virtual:poster-entry`, rewritten by a plugin to the user's `.tsx`) into a single IIFE. The IIFE is inlined into `src/runtime/shell.html` along with a `__POSTER_META__` globals blob (title, width, height).

**3. Runtime (`src/runtime/`)** — `shell.html` is the document skeleton with the toolbar. `bootstrap.tsx` mounts the user component and lazy-loads `export.ts` on first export click. `export.ts` runs Satori → SVG, then resvg-wasm → PNG, or jsPDF for PDF.

## Key decisions

- **No in-browser compile.** Sucrase/esbuild runs at build time. Saves ~300KB vs Stage's approach.
- **Tailwind via CDN for v1.** Will inline a purged sheet in v2 so the artifact is truly zero-network.
- **Export is lazy.** Satori/resvg/jsPDF are code-split into a separate chunk that only loads when a toolbar button is clicked.
- **Recharts fixed-dim subset.** Users must pass explicit width/height and `isAnimationActive={false}`. No `ResponsiveContainer`, `Tooltip`, or `Brush` in the export path.
- **Virtual entry pattern.** `virtual:poster-entry` is resolved by a small esbuild plugin to the user's file. Keeps `bootstrap.tsx` authorable as a real TS file without tricky codegen.

## Adding a new command

1. Create `src/commands/<name>.ts` exporting a function that takes args + `OutputOptions`.
2. Import it in `src/main.ts` and register with Commander.
3. Use `output(options, { json, human })` for the output triple.

## Export pipeline details

`exportPoster({ format, element, meta })`:
1. `satori(element, { width, height, fonts })` → SVG string
2. Format branch:
   - `svg` → download blob
   - `png` → `resvg.render().asPng()` → download
   - `pdf` → PNG bytes → `jsPDF.addImage` → download

Fonts live on `window.__POSTER_FONTS__` as base64 buffers, inlined by the build step (TODO: currently empty; needs a font bundler step).

## Known TODOs

- Inline Tailwind (purge from user code) instead of CDN
- Inline Inter + JetBrains Mono font buffers
- Import allowlist + resolver for user code
- Tests
