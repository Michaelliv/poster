// Font auto-loader for the Takumi engine.
//
// Takumi doesn't use system fonts and doesn't follow `<link>` tags. Every
// font has to be handed in as a buffer with `{ name, weight, style, data }`.
// Poster v1 (Chromium) and our existing examples rely on the v1 ergonomic of
// `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">`
// inside the TSX and the browser doing the rest.
//
// This module restores that ergonomic: walk the React tree, find every
// Google Fonts `<link>`, fetch the CSS, parse the @font-face blocks, fetch
// each woff2, and return the buffers in the shape Takumi's `fonts` option
// expects. Result is cached on disk under `~/.cache/poster/fonts/`.
//
// We use the same "real-browser" User-Agent string Chrome sends so that
// Google Fonts serves woff2 (their default). Without a UA, Google returns
// older formats (ttf or eot) which Takumi/Parley may not parse cleanly.

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import * as React from "react";

// Mimic Chrome on macOS so Google Fonts returns the modern woff2 variant.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const CACHE_DIR = join(homedir(), ".cache", "poster", "fonts");

// In-process caches so multiple posters in one CLI invocation don't
// re-download (or even re-read from disk).
const cssCache = new Map<string, string>();
const fontCache = new Map<string, Buffer>();

export interface LoadedFont {
  name: string;
  weight?: number;
  style?: "normal" | "italic" | "oblique";
  data: Buffer;
}

/**
 * Walk a React tree and return every Google Fonts CSS URL referenced
 * by a `<link rel="stylesheet">` tag. Deduplicated, order preserved
 * by first occurrence.
 */
export function collectFontLinks(root: React.ReactNode): string[] {
  const out: string[] = [];
  const seen = new Set<string>();

  const visit = (node: React.ReactNode): void => {
    if (node === null || node === undefined || typeof node === "boolean") return;
    if (typeof node === "string" || typeof node === "number") return;
    if (Array.isArray(node)) {
      for (const child of node) visit(child);
      return;
    }
    if (!React.isValidElement(node)) return;

    if (node.type === "link") {
      const props = node.props as { rel?: unknown; href?: unknown };
      const href = typeof props.href === "string" ? props.href : null;
      const rel = typeof props.rel === "string" ? props.rel : null;
      if (
        href &&
        (rel === "stylesheet" || rel === null) &&
        href.startsWith("https://fonts.googleapis.com/")
      ) {
        if (!seen.has(href)) {
          seen.add(href);
          out.push(href);
        }
      }
    }

    const props = node.props as { children?: React.ReactNode };
    if (props && props.children !== undefined) visit(props.children);
  };

  visit(root);
  return out;
}

/**
 * Resolve every Google Fonts URL referenced by the tree into a list of
 * `LoadedFont`s ready to hand to Takumi's `fonts` option.
 *
 * Each `@font-face` rule in the served CSS becomes one entry. We dedupe
 * across multiple link tags pointing at overlapping families so the same
 * woff2 isn't loaded twice (Takumi tolerates dupes but it's wasteful).
 */
export async function loadFontsFromLinks(root: React.ReactNode): Promise<LoadedFont[]> {
  const urls = collectFontLinks(root);
  if (urls.length === 0) return [];

  mkdirSync(CACHE_DIR, { recursive: true });

  const fonts: LoadedFont[] = [];
  // Google Fonts splits a single family/weight/style into several
  // unicode-range shards. Browsers select the shard whose unicode-range
  // covers each glyph; Takumi/fontique currently doesn't. If we register
  // every shard under the same family, Parley picks one face for the run
  // and tofu-boxes glyphs missing from that shard. So we collapse each
  // `(family, weight, style)` to the Latin shard, not the first shard.
  const bestFaces = new Map<string, FontFace>();

  for (const url of urls) {
    let css = cssCache.get(url);
    if (!css) {
      css = await fetchText(url);
      cssCache.set(url, css);
    }

    for (const face of parseFontFaces(css)) {
      const key = `${face.family}|${face.weight ?? ""}|${face.style ?? ""}`;
      const existing = bestFaces.get(key);
      if (!existing || rankUnicodeRange(face.unicodeRange) > rankUnicodeRange(existing.unicodeRange)) {
        bestFaces.set(key, face);
      }
    }
  }

  const seenSrc = new Set<string>();
  for (const face of bestFaces.values()) {
    if (seenSrc.has(face.src)) continue;
    seenSrc.add(face.src);

    let data = fontCache.get(face.src);
    if (!data) {
      data = await fetchBinary(face.src);
      fontCache.set(face.src, data);
    }

    fonts.push({
      name: face.family,
      weight: face.weight,
      style: face.style,
      data,
    });
  }

  return fonts;
}

// ───── Internals ──────────────────────────────────────────────────────

interface FontFace {
  family: string;
  weight?: number;
  style?: "normal" | "italic" | "oblique";
  src: string;
  unicodeRange?: string;
}

/**
 * Parse the @font-face blocks from a Google Fonts CSS payload.
 *
 * The CSS shape Google serves is, per face:
 *
 *   @font-face {
 *     font-family: 'Inter';
 *     font-style: normal;
 *     font-weight: 400;
 *     src: url(https://fonts.gstatic.com/s/inter/.../inter.woff2) format('woff2');
 *     unicode-range: U+0000-00FF, ...;
 *   }
 *
 * Each family/weight/style/unicode-range combination is its own block.
 * We pick the first `url(...)` we see per block (Latin-default unicode-range
 * is fine for our posters; Cyrillic/Greek subsets ship as separate faces
 * which we still load — Takumi/Parley uses whichever covers the glyph).
 */
function parseFontFaces(css: string): FontFace[] {
  const out: FontFace[] = [];
  const blockRe = /@font-face\s*\{([^}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(css)) !== null) {
    const body = m[1];

    const family = pluck(body, /font-family:\s*['"]?([^;'"]+)['"]?\s*;/);
    const styleStr = pluck(body, /font-style:\s*([^;]+);/);
    const weightStr = pluck(body, /font-weight:\s*([^;]+);/);
    const src = pluck(body, /src:\s*url\((https:\/\/[^)]+)\)/);
    const unicodeRange = pluck(body, /unicode-range:\s*([^;]+);/);
    if (!family || !src) continue;

    let style: FontFace["style"] = undefined;
    if (styleStr === "italic") style = "italic";
    else if (styleStr === "oblique") style = "oblique";
    else if (styleStr === "normal") style = "normal";

    // Variable-font CSS uses `font-weight: 100 900;`. Pick the lower bound
    // as the registered weight — Takumi/Parley handles `font-variation-settings`
    // for the actual axis, and this number is mostly a fallback hint.
    let weight: number | undefined = undefined;
    if (weightStr) {
      const num = parseInt(weightStr.split(/\s+/)[0], 10);
      if (!Number.isNaN(num)) weight = num;
    }

    out.push({ family: family.trim(), weight, style, src: src.trim(), unicodeRange: unicodeRange?.trim() });
  }
  return out;
}

function rankUnicodeRange(range: string | undefined): number {
  if (!range) return 1;
  const normalized = range.toUpperCase().replace(/\s+/g, "");
  // Google Fonts' Latin shard usually contains U+0000-00FF and is the
  // one our English-heavy posters need. Prefer it over latin-ext,
  // cyrillic, greek, vietnamese, etc. This intentionally mirrors the
  // browser's likely first download for Latin text.
  if (normalized.includes("U+0000-00FF")) return 3;
  if (normalized.includes("U+0000-007F") || normalized.includes("U+0020-007E")) return 2;
  return 0;
}

function pluck(haystack: string, re: RegExp): string | null {
  const m = haystack.match(re);
  return m ? m[1].trim() : null;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`fonts: GET ${url} → HTTP ${res.status}`);
  }
  return res.text();
}

async function fetchBinary(url: string): Promise<Buffer> {
  // Disk cache key — the URL itself is stable per font version, so the
  // sha256 of the URL is a fine cache filename.
  const sha = createHash("sha256").update(url).digest("hex");
  const ext = url.endsWith(".woff2")
    ? "woff2"
    : url.endsWith(".woff")
      ? "woff"
      : url.endsWith(".ttf")
        ? "ttf"
        : "bin";
  const cachePath = join(CACHE_DIR, `${sha}.${ext}`);
  if (existsSync(cachePath)) {
    return readFileSync(cachePath);
  }
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`fonts: GET ${url} → HTTP ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(cachePath, buf);
  return buf;
}
