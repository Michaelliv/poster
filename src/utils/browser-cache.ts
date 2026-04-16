// Single source of truth for where poster stores its bundled
// chrome-headless-shell. Referenced by the postinstall script and by the
// runtime browser resolver, so they agree on what "already installed" means.
//
// We override @puppeteer/browsers' default cache (which is relative to cwd,
// so it'd drop a .cache/puppeteer folder inside whichever project ran
// `poster`) with a shared location under the user's home directory.

import { join } from "node:path";

export const BROWSER_CACHE_DIR = join(
  process.env.HOME || process.env.USERPROFILE || ".",
  ".cache",
  "poster-browsers",
);
