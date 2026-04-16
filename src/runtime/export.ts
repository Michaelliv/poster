// Export pipeline: React element → Satori → SVG → (resvg → PNG) or (jsPDF → PDF)
//
// Loaded lazily from bootstrap.tsx on first export click.

import satori from "satori";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
// @ts-expect-error wasm import
import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm";
import { jsPDF } from "jspdf";

export type Format = "png" | "svg" | "pdf";

export interface ExportOptions {
  format: Format;
  element: any;
  meta: {
    title: string;
    width: number;
    height: number;
  };
}

let resvgReady: Promise<void> | null = null;
function ensureResvg() {
  resvgReady ??= initWasm(resvgWasm as any);
  return resvgReady;
}

// Fonts are base64-inlined at build time and attached to window.__POSTER_FONTS__
function getFonts() {
  const fonts = (window as any).__POSTER_FONTS__ as Array<{
    name: string;
    data: string; // base64
    weight: number;
    style: "normal" | "italic";
  }> | undefined;
  if (!fonts) return [];
  return fonts.map((f) => ({
    name: f.name,
    data: Uint8Array.from(atob(f.data), (c) => c.charCodeAt(0)).buffer,
    weight: f.weight as 400 | 700,
    style: f.style,
  }));
}

export async function exportPoster({ format, element, meta }: ExportOptions) {
  const svg = await satori(element, {
    width: meta.width,
    height: meta.height,
    fonts: getFonts() as any,
  });

  if (format === "svg") {
    download(new Blob([svg], { type: "image/svg+xml" }), `${meta.title}.svg`);
    return;
  }

  if (format === "png") {
    await ensureResvg();
    const resvg = new Resvg(svg);
    const png = resvg.render().asPng();
    download(new Blob([png], { type: "image/png" }), `${meta.title}.png`);
    return;
  }

  if (format === "pdf") {
    await ensureResvg();
    const resvg = new Resvg(svg);
    const png = resvg.render().asPng();
    const dataUrl = await blobToDataUrl(new Blob([png], { type: "image/png" }));
    const pdf = new jsPDF({
      orientation: meta.width >= meta.height ? "landscape" : "portrait",
      unit: "px",
      format: [meta.width, meta.height],
    });
    pdf.addImage(dataUrl, "PNG", 0, 0, meta.width, meta.height);
    pdf.save(`${meta.title}.pdf`);
    return;
  }
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}
