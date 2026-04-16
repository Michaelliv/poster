# Changelog

All notable changes to `poster-ai` are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); the project uses
[semver](https://semver.org/) — at `0.x` minor bumps may break APIs.

## [Unreleased]

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
