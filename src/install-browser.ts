#!/usr/bin/env node
// postinstall — optionally fetches chrome-headless-shell.
//
// Default for `poster export` is the Takumi (browserless) engine, so most
// users don't need Chrome at install time. We only download chrome-headless-shell
// when the user explicitly asks for it via POSTER_INSTALL_BROWSER=1. Chrome is
// the opt-in engine, reached via `--engine chrome` at runtime.
//
// Failure here never aborts `npm install` — the Chrome engine has a runtime
// fallback to system browsers, and users can always run
// `poster export --engine chrome --install-browser` later to retry.

import { existsSync } from "node:fs";
import {
  Browser as BrowserEnum,
  type BrowserPlatform,
  computeExecutablePath,
  detectBrowserPlatform,
  install,
  resolveBuildId,
} from "@puppeteer/browsers";
import { BROWSER_CACHE_DIR } from "./utils/browser-cache.js";

// Should the postinstall actually download Chrome?
//
// Only YES when POSTER_INSTALL_BROWSER=1 is set. Takumi is the default engine;
// Chrome is the opt-in engine and the user opts into the install too.
function shouldDownload(): { run: boolean; reason: string } {
  if (process.env.POSTER_SKIP_BROWSER_DOWNLOAD) {
    return { run: false, reason: "POSTER_SKIP_BROWSER_DOWNLOAD is set" };
  }
  if (process.env.POSTER_INSTALL_BROWSER === "1") {
    return { run: true, reason: "POSTER_INSTALL_BROWSER=1" };
  }
  return {
    run: false,
    reason: "Takumi is the default engine; set POSTER_INSTALL_BROWSER=1 to fetch chrome-headless-shell",
  };
}

async function main() {
  const decision = shouldDownload();
  if (!decision.run) {
    console.log(
      `[poster] Skipping chrome-headless-shell download (${decision.reason}).`,
    );
    console.log(
      "[poster] Set POSTER_INSTALL_BROWSER=1 to force it, or run 'poster export --install-browser' later.",
    );
    return;
  }

  const platform = detectBrowserPlatform();
  if (!platform) {
    console.warn(
      "[poster] Could not detect platform; skipping chrome-headless-shell download.",
    );
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
      console.log(
        `[poster] chrome-headless-shell@${buildId} already installed.`,
      );
      return;
    }

    console.log(
      `[poster] Downloading chrome-headless-shell@${buildId} (~80 MB) — one-time, takes ~30s…`,
    );
    console.log(`[poster]   cache: ${BROWSER_CACHE_DIR}`);
    console.log(`[poster]   skip next time: POSTER_SKIP_BROWSER_DOWNLOAD=1`);

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
  console.warn(
    `[poster] postinstall error (ignored): ${(err as Error).message}`,
  );
  process.exit(0);
});
