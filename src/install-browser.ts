#!/usr/bin/env node
// postinstall — fetches chrome-headless-shell so `poster export` / `poster og`
// work out of the box without requiring the user to have Chrome installed.
//
// Skip this step with POSTER_SKIP_BROWSER_DOWNLOAD=1 (CI, offline installs, or
// environments that already have Chrome and don't want the extra ~80 MB).
//
// Failure here never aborts `npm install` — the CLI falls back to system
// browsers at runtime, and users can always run `poster export --install-browser`
// later to retry.

import { existsSync } from "node:fs";
import {
  Browser as BrowserEnum,
  type BrowserPlatform,
  detectBrowserPlatform,
  install,
  computeExecutablePath,
  resolveBuildId,
} from "@puppeteer/browsers";
import { BROWSER_CACHE_DIR } from "./utils/browser-cache.js";

async function main() {
  if (process.env.POSTER_SKIP_BROWSER_DOWNLOAD) {
    console.log("[poster] POSTER_SKIP_BROWSER_DOWNLOAD set — skipping chrome-headless-shell download.");
    return;
  }

  const platform = detectBrowserPlatform();
  if (!platform) {
    console.warn("[poster] Could not detect platform; skipping chrome-headless-shell download.");
    return;
  }

  try {
    const buildId = await resolveBuildId(
      BrowserEnum.CHROMEHEADLESSSHELL,
      platform,
      "stable",
    );

    const execPath = computeExecutablePath({
      browser: BrowserEnum.CHROMEHEADLESSSHELL,
      buildId,
      cacheDir: BROWSER_CACHE_DIR,
    });

    if (existsSync(execPath)) {
      console.log(`[poster] chrome-headless-shell@${buildId} already installed.`);
      return;
    }

    console.log(`[poster] Downloading chrome-headless-shell@${buildId} (~80 MB)…`);
    console.log(`[poster] Cache: ${BROWSER_CACHE_DIR}`);
    console.log(`[poster] Set POSTER_SKIP_BROWSER_DOWNLOAD=1 to skip next time.`);

    await install({
      browser: BrowserEnum.CHROMEHEADLESSSHELL,
      buildId,
      cacheDir: BROWSER_CACHE_DIR,
      platform: platform as BrowserPlatform,
    });

    console.log(`[poster] chrome-headless-shell ready.`);
  } catch (err) {
    // Never fail npm install over this — CLI has a runtime fallback.
    console.warn(
      `[poster] chrome-headless-shell download failed: ${(err as Error).message}`,
    );
    console.warn(
      `[poster] 'poster export' will still work if Chrome/Brave/Edge is installed,`,
    );
    console.warn(
      `[poster] or run 'poster export --install-browser' later to retry.`,
    );
  }
}

main().catch((err) => {
  // Final safety net — npm install must not fail over this script.
  console.warn(`[poster] postinstall error (ignored): ${(err as Error).message}`);
  process.exit(0);
});
