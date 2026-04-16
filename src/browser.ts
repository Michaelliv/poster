// Chromium executable resolver — used by the SDK (poster.ts) and, via it,
// by the CLI commands. Lives at src/ root because it's shared infra, not
// command code.
//
// resolveBrowser() picks, in order:
//   1. explicit browser path
//   2. system Chrome / Brave / Edge / Chromium
//   3. previously-installed chrome-headless-shell from @puppeteer/browsers
//   4. auto-install chrome-headless-shell (~80 MB) if allowInstall is true

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
import { info, type OutputOptions } from "./utils/output.js";

const CANDIDATE_PATHS = {
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ],
  linux: [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/brave-browser",
    "/usr/bin/microsoft-edge",
    "/usr/bin/microsoft-edge-stable",
  ],
  win32: [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ],
} as const;

export interface ResolveBrowserOptions {
  browser?: string;
  allowInstall?: boolean;
}

export async function resolveBrowser(
  opts: ResolveBrowserOptions,
  options: OutputOptions,
): Promise<string | null> {
  if (opts.browser) {
    return existsSync(opts.browser) ? opts.browser : null;
  }

  const plat = process.platform as keyof typeof CANDIDATE_PATHS;
  for (const p of CANDIDATE_PATHS[plat] ?? []) {
    if (existsSync(p)) return p;
  }

  const platform = detectBrowserPlatform();
  if (!platform) return null;

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
    if (existsSync(execPath)) return execPath;

    if (opts.allowInstall) {
      if (!options.quiet)
        info(`Installing chrome-headless-shell @ ${buildId}…`);
      const installed = await install({
        browser: BrowserEnum.CHROMEHEADLESSSHELL,
        buildId,
        cacheDir: BROWSER_CACHE_DIR,
        platform: platform as BrowserPlatform,
      });
      return installed.executablePath;
    }
  } catch (err) {
    // Surface network / registry failures instead of masking them as
    // "no browser found".
    if (!options.quiet) {
      console.error(
        `[poster] browser registry lookup failed: ${(err as Error).message}`,
      );
    }
  }

  return null;
}

export const NO_BROWSER_HINT =
  "Install Chrome, Brave, or Edge — or pass --install-browser to download chrome-headless-shell (~80 MB).";
