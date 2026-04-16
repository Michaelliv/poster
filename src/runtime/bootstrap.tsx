// Bundled together with the user's component and injected into shell.html.
// Mounts the component. Export is handled entirely by the `poster` CLI —
// the HTML artifact is view-only.
//
// The user's component is imported via a virtual entry that esbuild rewrites
// at build time: `virtual:poster-entry` resolves to the user's .tsx.

// @ts-expect-error virtual module resolved by the build step
import UserComponent from "virtual:poster-entry";
import React from "react";
import { createRoot } from "react-dom/client";

const mount = document.getElementById("poster-root");
if (!mount) throw new Error("poster: #poster-root not found");

createRoot(mount).render(React.createElement(UserComponent));

// Hook used by `poster export --format svg` — puppeteer can't screenshot SVG,
// so the CLI evaluates this in-page to get a vector capture of #poster-root.
type CaptureFormat = "png" | "svg" | "jpg" | "webp";
declare global {
  interface Window {
    __posterCapture?: (format: CaptureFormat) => Promise<string>;
  }
}
window.__posterCapture = async (format: CaptureFormat) => {
  const { captureDataUrl } = await import("./export.js");
  return captureDataUrl(format);
};
