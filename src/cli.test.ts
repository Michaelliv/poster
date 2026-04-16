// CLI end-to-end smoke: spawn dist/main.js, pipe TSX on stdin, assert the
// output file exists and has the PNG magic bytes. Skipped automatically if
// dist isn't built or no browser is available.

import { describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveBrowser } from "./browser.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, "..", "dist", "main.js");

const TSX = `export default () => <div style={{padding:20,fontSize:32}}>cli-e2e</div>`;

describe("CLI", () => {
  test("poster export - -o <png> (stdin entry, ephemeral) writes a PNG", async () => {
    if (!existsSync(CLI)) {
      return; // dist not built — skip
    }
    const browser = await resolveBrowser({}, { quiet: true });
    if (!browser) {
      return; // no browser — skip
    }

    const dir = mkdtempSync(join(tmpdir(), "poster-cli-test-"));
    const out = join(dir, "out.png");
    try {
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
          "--wait-for",
          "0",
          "--ephemeral",
        ],
        stdin: "pipe",
        stdout: "pipe",
        stderr: "pipe",
      });
      proc.stdin.write(TSX);
      await proc.stdin.end();
      const code = await proc.exited;
      expect(code).toBe(0);
      expect(existsSync(out)).toBe(true);

      const buf = readFileSync(out);
      // PNG magic bytes
      expect(buf[0]).toBe(0x89);
      expect(buf[1]).toBe(0x50);
      expect(buf[2]).toBe(0x4e);
      expect(buf[3]).toBe(0x47);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 30_000);
});
