# Changelog

All notable changes to `poster-ai` are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); the project uses
[semver](https://semver.org/) — at `0.x` minor bumps may break APIs.

## [Unreleased]

### Added

- **Takumi engine — browserless PNG export, now the default.** A pure-Rust
  headless renderer (taffy + parley + skrifa + resvg) ships as a NAPI
  native module. `poster export <entry> -o out.png` no longer requires
  Chrome. Tailwind v4 classes are expanded server-side via
  `@tailwindcss/node`; Google Fonts CSS is fetched and woff2 cached at
  `~/.cache/poster/fonts/`; bare imports auto-resolve through esm.sh and
  cache at `~/.cache/poster/modules/`. Output is 2x physical pixels.
- **`--engine <takumi|chrome>` CLI flag.** Defaults to `takumi`. Pass
  `--engine chrome` for PDF, SVG, JPG, WebP, or for posters that depend
  on Chrome-specific CSS.
- **`Engine` type and `engine` SDK option.** `new Poster({ engine: "chrome" })`
  forces the browser path; default is `"takumi"`.
- **Comparison harness** under `scripts/compare/` — renders every example
  through Takumi and ranks pixel divergence against the Chromium
  reference PNGs in `examples/`. Useful as a regression gate.

### Changed

- **Postinstall no longer auto-downloads `chrome-headless-shell`.** The
  default engine is browserless, so the 80 MB download is opt-in via
  `POSTER_INSTALL_BROWSER=1`. Global installs no longer trigger it.
  `POSTER_SKIP_BROWSER_DOWNLOAD=1` continues to force-skip.
- **`poster build` CLI dropped `--browser` and `--install-browser`.**
  Build doesn't touch a browser — the flags were dead surface.
- README: new **Engines** section explaining the takumi/chrome split and
  the format support matrix. "No authoring restrictions" caveat for the
  Takumi subset added.

### Breaking

- **`Poster.render({ format })` with the default engine only supports PNG.**
  Calls with `format: "pdf" | "svg" | "jpg" | "webp"` now throw with a
  clear message pointing at `--engine chrome`. SDK consumers that need
  those formats must construct `new Poster({ engine: "chrome" })`.

## [0.4.0] — 2026-04-16

### Added

- **Auto-fit canvas.** The CLI and SDK now support posters declaring their
  own size via the root element's Tailwind classes (`w-[Npx]`, optionally
  `h-[Npx]`). When `--width`/`--height` are omitted (or `width`/`height`
  options are undefined on `Poster.render`), the renderer sets a generous
  viewport (2400×3600), measures `#poster-root > :first-child`, and
  element-screenshots that box. Pixel-exact output, no overflow, no empty
  strips. Passing explicit `width`/`height` keeps the legacy
  viewport-screenshot behavior.
- `DEFAULTS.autoFitViewport` (`{ width: 2400, height: 3600 }`) documenting
  the auto-fit measurement viewport.
- CLI success line now reports the **actual** rendered pixel dimensions
  (parsed from the PNG IHDR chunk, divided by DSF) instead of the stale
  DEFAULTS fallback. Non-PNG formats report `auto` when not forced.

### Changed

- `src/main.ts` — `--width` / `--height` are now optional (default: auto).
  Help text updated: "Force canvas width (default: auto — measured from
  poster root)".
- `src/runtime/shell.html` — removed the `#poster-root { min-height: 100vh }`
  rule. Posters declare their own canvas on their root element.
- All 14 example `.tsx` files migrated from `min-h-screen` to explicit
  `w-[Npx]` (content-driven height). Font-size floor bumped everywhere to
  14px (Tailwind) and 13px (Recharts axis ticks).

### Added (examples)

- `docs/thread/` — seven rendered thread posters for a Twitter thread
  announcing the package.

## [0.3.0] — 2026-04-16

### Removed

- `poster build --og` and the two-pass `og:image` data-URL baking. Basic
  `og:title` / `og:description` / `twitter:card` tags are still emitted
  from the shell template. Data-URL OG images were supported only by
  Discord in practice; users who need a real social preview should host
  a `.png` and point `og:image` at a URL.
- `BuildOptions.og` (SDK) and the `Poster.renderOgDataUrl` internal.
- `DEFAULTS.ogWidth` / `DEFAULTS.ogHeight`.

## [0.2.0] — 2026-04-16

### Changed

- Postinstall now downloads `chrome-headless-shell` **only** on global
  installs (`npm install -g poster-ai`) or when `POSTER_INSTALL_BROWSER=1`
  is set. Local/library installs skip the 80 MB download by default. This
  makes `poster-ai` polite to import as a pure SDK in services that already
  have Chrome, Lambda environments with a chromium layer, etc.
- README rewritten with a hero image, a 2×2 example gallery, a format
  quality matrix, and an explicit library section.

### Added

- Smoke tests (`bun test`) — 5 tests, 29 assertions: `Poster.buildHtml`
  shell/title/dims/bundle substitution, missing-file error path,
  `Poster.render` PNG magic-byte check, CLI stdin round-trip,
  `inferFormat` edge cases. Browser-dependent tests auto-skip when no
  Chrome is resolvable, so the suite runs clean on bare machines.
- `CHANGELOG.md`.
- CI now forces `POSTER_INSTALL_BROWSER=1` so integration tests exercise
  the real render path against a cached `chrome-headless-shell`.

## [0.1.0] — 2026-04-16

First public release on npm as [`poster-ai`](https://www.npmjs.com/package/poster-ai).

### Added

- **CLI**: `poster build` (TSX → self-contained HTML) and `poster export`
  (TSX → PNG / SVG / PDF / JPG / WebP via headless Chrome).
- **Stdin entry**: `poster export - -o out.png` reads TSX from stdin and
  persists it to `.poster/<basename>.tsx` so agents can iterate. `--ephemeral`
  skips persistence.
- **Library**: `import { Poster } from "poster-ai"`. Two methods:
  `buildHtml(input, options)` → HTML string; `render(input, options)` →
  `Buffer` for raster/PDF, `string` for SVG. Input is discriminated
  `{ tsx } | { file }`. Pure — throws on error, no `process.exit`.
- **Authoring surface**: React 19 + Tailwind (via CDN) + Recharts +
  lucide-react + Inter / Source Serif 4 / JetBrains Mono preloaded.
- **Examples**: 14 `.tsx` posters under `examples/` — dashboards, editorial,
  wrapped, fitness, calendar, brutalist, neon, etc.
- **Fonts load correctly** so renders are machine-independent.
- **Browser resolution**: prefers system Chrome/Brave/Edge; falls back to a
  cached `chrome-headless-shell`; auto-installs with `--install-browser`.
