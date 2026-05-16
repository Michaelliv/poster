// Takumi engine — browserless renderer for `poster export`.
//
// Takumi is a pure-Rust image-rendering pipeline (taffy + parley + skrifa +
// resvg) shipped as a NAPI native module. It supports the CSS features the
// posters actually use — `filter: blur()`, gradient text via
// `background-clip: text`, radial gradients, abs-positioned overflow
// clipping — without requiring Chrome to be installed.
//
// Render pipeline:
//
//   1. compile.ts        — user TSX evaluated with real React → element tree
//   2. sanitizeReactTree — rewrite patterns Takumi can't consume
//                          (`<svg width="100%">`, `style={{ transform: undefined }}`,
//                          and lift SVG <text> nodes into HTML overlays)
//   3. loadFontsFromLinks— scan `<link href="fonts.googleapis...">`, fetch the
//                          Latin-shard woff2 per (family, weight, style)
//   4. fromJsx           — React tree → Takumi node tree + base stylesheets
//   5. extractEmojis     — split emoji runs so they render via twemoji glyphs
//   6. fetchResources    — download every image/emoji referenced in the tree
//   7. renderer.render   — PNG buffer
//
// The `Renderer` is a process-wide singleton so fonts loaded once stick
// across consecutive renders in the same process.

import { Renderer } from "@takumi-rs/core";
import { extractResourceUrls, fetchResources } from "@takumi-rs/helpers";
import { extractEmojis } from "@takumi-rs/helpers/emoji";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import * as React from "react";
import { loadEntry } from "./compile.js";
import { loadFontsFromLinks } from "./fonts.js";
import { sanitizeReactTree } from "./sanitize-tree.js";
import { tailwindCssForClasses, warmTailwind } from "./tailwind.js";

export interface TakumiOpts {
  width: number;
  /** Omit (or pass undefined) to let Takumi auto-size the canvas to content. */
  height?: number;
}

// Match Chromium screenshot quality: layout stays in CSS pixels, output PNG
// gets 2 physical pixels per CSS pixel. In Takumi this requires scaling both
// the viewport dimensions and `devicePixelRatio`; DPR alone clips horizontally.
const OUTPUT_SCALE = 2;

// Process-wide singleton. Fonts loaded into one Renderer persist for the
// lifetime of the process, so consecutive renders during a sweep don't
// re-load the same woff2 buffers into the Rust side.
let cachedRenderer: Renderer | null = null;
function getRenderer(): Renderer {
  if (!cachedRenderer) {
    cachedRenderer = new Renderer({ loadDefaultFonts: true });
  }
  return cachedRenderer;
}

function collectClassNames(
  node: React.ReactNode,
  out = new Set<string>(),
): Set<string> {
  if (node === null || node === undefined || typeof node === "boolean")
    return out;
  if (typeof node === "string" || typeof node === "number") return out;
  if (Array.isArray(node)) {
    for (const child of node) collectClassNames(child, out);
    return out;
  }
  if (!React.isValidElement(node)) return out;

  const elem = node as React.ReactElement<Record<string, unknown>>;
  const className = elem.props.className ?? elem.props.class;
  if (typeof className === "string") {
    for (const token of className.split(/\s+/)) {
      if (token) out.add(token);
    }
  }
  collectClassNames(elem.props.children as React.ReactNode, out);
  return out;
}

export async function runTakumi(
  entryPath: string,
  opts: TakumiOpts,
): Promise<Buffer> {
  await warmTailwind();
  const entry = await loadEntry<React.ReactElement>(entryPath, {
    react: React,
  });

  const rawRoot = entry.component({}) as React.ReactElement;

  // 1. Walk into function components and rewrite anything that would
  //    crash Takumi downstream: percentage width/height on `<svg>` and
  //    inline `style={{ transform: undefined }}`. See `sanitize-tree.ts`
  //    for the rationale.
  const root = sanitizeReactTree(rawRoot) as React.ReactElement;
  const tailwindCss = tailwindCssForClasses(collectClassNames(root));

  // 2. Resolve every `<link href="https://fonts.googleapis.com/...">` the
  //    poster references into a list of font buffers Takumi will accept.
  //    Google Fonts unicode-range shards are collapsed to the Latin shard
  //    per `(family, weight, style)` because Takumi doesn't implement
  //    browser-style unicode-range selection.
  const fonts = await loadFontsFromLinks(root);

  const renderer = getRenderer();
  if (fonts.length > 0) {
    await renderer.loadFonts(fonts);
    process.stderr.write(
      `poster/takumi: loaded ${fonts.length} font face${fonts.length === 1 ? "" : "s"} from <link> tags\n`,
    );
  }

  // 3. JSX → Takumi node tree. `fromJsx` expands function components and
  //    converts <div>/<svg>/<img>/text into container/image/text nodes.
  const { node, stylesheets } = await fromJsx(root, {
    // Class names are expanded by real Tailwind above and passed as a CSS
    // stylesheet below. Do not let Takumi's internal `tw` parser interpret
    // `className`; it differs from Tailwind for slash-opacity utilities like
    // `border-white/[0.06]`.
    tailwindClassesProperty: "__poster_unused_tw_prop__",
  });

  // 4. Pull emoji runs out so they render via twemoji SVG glyphs rather
  //    than tofu boxes.
  const nodeWithEmojis = extractEmojis(node, "twemoji");

  // 5. Fetch every remote resource (images, emoji glyphs) referenced
  //    in the tree.
  const fetched = await fetchResources(extractResourceUrls(nodeWithEmojis));

  // 6. Render. Passing `height: undefined` lets Takumi grow the canvas
  //    to fit content vertically — matching how the v1 Chromium renderer
  //    captured arbitrary-length pages.
  return await renderer.render(nodeWithEmojis, {
    width: opts.width * OUTPUT_SCALE,
    height: opts.height === undefined ? undefined : opts.height * OUTPUT_SCALE,
    devicePixelRatio: OUTPUT_SCALE,
    fetchedResources: fetched,
    stylesheets: [...stylesheets, tailwindCss],
  });
}
