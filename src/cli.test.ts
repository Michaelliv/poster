// CLI end-to-end smoke: spawn dist/main.js, pipe TSX on stdin, assert the
// output file exists and has the PNG magic bytes. Auto-skips if dist isn't
// built; the chrome-engine variant additionally skips when no browser is
// resolvable.

import { describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveBrowser } from "./browser.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, "..", "dist", "main.js");

const TSX = `export default () => <div style={{padding:20,fontSize:32}}>cli-e2e</div>`;

async function spawnExport(extraArgs: string[], out: string): Promise<number> {
  const proc = Bun.spawn({
    cmd: [
      "node",
      CLI,
      "export",
      "-",
      "-o",
      out,
      "--width",
      "400",
      "--height",
      "300",
      "--ephemeral",
      ...extraArgs,
    ],
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  });
  proc.stdin.write(TSX);
  await proc.stdin.end();
  return await proc.exited;
}

function expectPng(out: string): void {
  expect(existsSync(out)).toBe(true);
  const buf = readFileSync(out);
  expect(buf[0]).toBe(0x89);
  expect(buf[1]).toBe(0x50);
  expect(buf[2]).toBe(0x4e);
  expect(buf[3]).toBe(0x47);
}

describe("CLI", () => {
  test("poster export - -o <png> writes a PNG via the default (takumi) engine", async () => {
    if (!existsSync(CLI)) {
      return; // dist not built — skip
    }
    const dir = mkdtempSync(join(tmpdir(), "poster-cli-test-"));
    const out = join(dir, "out.png");
    try {
      const code = await spawnExport([], out);
      expect(code).toBe(0);
      expectPng(out);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 30_000);

  test("poster export --engine chrome writes a PNG", async () => {
    if (!existsSync(CLI)) {
      return;
    }
    const browser = await resolveBrowser({}, { quiet: true });
    if (!browser) {
      return; // no browser — skip
    }
    const dir = mkdtempSync(join(tmpdir(), "poster-cli-test-"));
    const out = join(dir, "out.png");
    try {
      const code = await spawnExport(
        ["--engine", "chrome", "--wait-for", "0"],
        out,
      );
      expect(code).toBe(0);
      expectPng(out);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 30_000);

  test("poster export --engine takumi rejects non-PNG output", async () => {
    if (!existsSync(CLI)) {
      return;
    }
    const dir = mkdtempSync(join(tmpdir(), "poster-cli-test-"));
    const out = join(dir, "out.pdf");
    try {
      const code = await spawnExport(["--engine", "takumi"], out);
      // Non-PNG with takumi engine should exit non-zero with a clear error.
      expect(code).not.toBe(0);
      expect(existsSync(out)).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 30_000);
});
