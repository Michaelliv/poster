// Copies src/runtime/* next to dist/ so the compiled CLI can find the shell
// template and bootstrap source at runtime.

import { cpSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "src", "runtime");
const dest = join(process.cwd(), "dist", "runtime");

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`copied runtime → ${dest}`);
