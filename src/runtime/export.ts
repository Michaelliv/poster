// Client-side export pipeline — runs inside the built poster HTML.
//
// snapDOM captures the #poster-root subtree to SVG/PNG/WebP/JPG. For PDF we
// rasterize to PNG and wrap via jsPDF. The whole thing is lazy-loaded from
// bootstrap.tsx on first export click so it stays out of initial parse.

import { snapdom } from "@zumer/snapdom";
import { jsPDF } from "jspdf";

export type Format = "png" | "svg" | "pdf" | "jpg" | "webp";

export interface ExportOptions {
  format: Format;
  meta: {
    title: string;
    width: number;
    height: number;
  };
}

/**
 * Capture the poster root and return a data URL. Used by the server-side
 * `poster export` when it wants SVG output (page.screenshot can't do SVG).
 * Exposed on window as __posterCapture by bootstrap.tsx.
 */
export async function captureDataUrl(format: Exclude<Format, "pdf">): Promise<string> {
  const target = document.getElementById("poster-root");
  if (!target) throw new Error("poster: #poster-root not found");
  const cap = await snapdom(target, { scale: 2, embedFonts: true });
  if (format === "svg") return cap.url;
  if (format === "png") return (await cap.toPng()).src;
  if (format === "jpg") return (await cap.toJpg()).src;
  if (format === "webp") return (await cap.toWebp()).src;
  throw new Error(`captureDataUrl: unsupported format ${format}`);
}

export async function exportPoster({ format, meta }: ExportOptions) {
  const target = document.getElementById("poster-root");
  if (!target) throw new Error("poster: #poster-root not found");

  // Single capture, reused for multiple export paths. `scale: 2` is retina;
  // style compression is internal in snapDOM v2.
  const capture = await snapdom(target, { scale: 2, embedFonts: true });

  const filename = slugify(meta.title) || "poster";

  if (format === "svg") {
    await capture.download({ type: "svg", filename });
    return;
  }
  if (format === "png") {
    await capture.download({ type: "png", filename });
    return;
  }
  if (format === "jpg") {
    await capture.download({ type: "jpg", filename, backgroundColor: "#ffffff" });
    return;
  }
  if (format === "webp") {
    await capture.download({ type: "webp", filename });
    return;
  }
  if (format === "pdf") {
    const canvas = await capture.toCanvas();
    const dataUrl = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: meta.width >= meta.height ? "landscape" : "portrait",
      unit: "px",
      format: [meta.width, meta.height],
    });
    pdf.addImage(dataUrl, "PNG", 0, 0, meta.width, meta.height);
    pdf.save(`${filename}.pdf`);
    return;
  }
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
