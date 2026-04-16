// This file is bundled together with the user's poster component and injected
// into shell.html. It mounts the component and wires up the export toolbar.
//
// The user's component is imported via a virtual entry point that esbuild
// rewrites at build time: `virtual:poster-entry` resolves to the user's .tsx.

import React from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error virtual module resolved by the build step
import UserComponent from "virtual:poster-entry";
import type { Format } from "./export.js";

const mount = document.getElementById("poster-root");
if (!mount) throw new Error("poster: #poster-root not found");

const root = createRoot(mount);
root.render(React.createElement(UserComponent));

// ---------- Export toolbar ----------
// snapDOM + jsPDF are loaded lazily on first export click to keep initial
// parse cheap.

let exportModulePromise: Promise<typeof import("./export.js")> | null = null;
function loadExport() {
  exportModulePromise ??= import("./export.js");
  return exportModulePromise;
}

async function handleExport(format: Format, btn: HTMLButtonElement) {
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = "…";
  try {
    const mod = await loadExport();
    await mod.exportPoster({
      format,
      meta: (window as any).__POSTER_META__,
    });
  } catch (err) {
    console.error("[poster] export failed:", err);
    alert(`Export failed: ${(err as Error).message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
}

const exportButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("#poster-toolbar button[data-export]"),
);
for (const btn of exportButtons) {
  btn.addEventListener("click", () => {
    handleExport(btn.dataset.export as Format, btn);
  });
}

// Expose a hook for the server-side `poster export` SVG path.
(window as any).__posterCapture = async (format: "png" | "svg" | "jpg" | "webp") => {
  const mod = await loadExport();
  return mod.captureDataUrl(format);
};
