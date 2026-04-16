// Single source of truth for where poster stores its bundled
// chrome-headless-shell. Referenced by the postinstall script and by the
// runtime browser resolver, so they agree on what "already installed" means.

import { join } from "node:path";

export const BROWSER_CACHE_DIR = join(
  process.env.HOME || process.env.USERPROFILE || ".",
  ".cache",
  "poster-browsers",
);
