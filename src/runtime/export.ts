// In-page capture helper — invoked by the CLI via window.__posterCapture for
// the one format puppeteer can't produce: SVG. Raster formats (PNG/JPG/WebP)
// and PDF are done server-side by the CLI directly.

import { snapdom } from "@zumer/snapdom";

export type Format = "png" | "svg" | "jpg" | "webp";

export async function captureDataUrl(format: Format): Promise<string> {
  const target = document.getElementById("poster-root");
  if (!target) throw new Error("poster: #poster-root not found");
  // dpr: 2 pins output to 2x regardless of the viewer's screen.
  const cap = await snapdom(target, { scale: 2, dpr: 2, embedFonts: true });
  if (format === "svg") return cap.url;
  if (format === "png") return (await cap.toPng()).src;
  if (format === "jpg") return (await cap.toJpg()).src;
  if (format === "webp") return (await cap.toWebp()).src;
  throw new Error(`captureDataUrl: unsupported format ${format}`);
}
