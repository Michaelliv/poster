# Changelog

All notable changes to `poster-ai` are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); the project uses
[semver](https://semver.org/) — at `0.x` minor bumps may break APIs.

## [Unreleased]

### Changed

- Postinstall now downloads `chrome-headless-shell` **only** on global
  installs (`npm install -g poster-ai`) or when `POSTER_INSTALL_BROWSER=1`
  is set. Local/library installs skip the 80 MB download by default.

### Added

- Smoke tests: `bun test` covers `Poster.buildHtml`, `Poster.render` (PNG
  output), CLI stdin entry round-trip, and `inferFormat`. Browser-dependent
  tests auto-skip when no Chrome is resolvable.
- `CHANGELOG.md`.

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
