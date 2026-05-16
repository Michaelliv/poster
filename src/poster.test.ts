// SDK smoke tests. Two engine paths:
//
//   - Takumi (default): browserless. PNG only. Always runs.
//   - Chrome (`engine: "chrome"`): system Chrome or chrome-headless-shell.
//     Tests requiring it auto-skip if no browser is resolvable.

import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { resolveBrowser } from "./browser.js";
import { inferFormat, Poster } from "./poster.js";

const TRIVIAL_TSX = `
  export default function Page() {
    return <div id="marker" style={{ padding: 40, fontSize: 48 }}>
      smoke-test-works
    </div>;
  }
`;

async function haveBrowser(): Promise<boolean> {
  const path = await resolveBrowser({}, { quiet: true });
  return Boolean(path && existsSync(path));
}

describe("Poster SDK", () => {
  test("buildHtml({ tsx }) returns a self-contained HTML document", async () => {
    const poster = new Poster();
    const html = await poster.buildHtml(
      { tsx: TRIVIAL_TSX },
      {
        title: "Smoke",
        width: 800,
        height: 600,
      },
    );

    // Has the shell
    expect(html).toContain("<!doctype html>");
    expect(html).toContain('id="poster-root"');
    // Title was substituted
    expect(html).toContain("<title>Smoke</title>");
    // Meta dims were substituted
    expect(html).toContain('"width":800');
    expect(html).toContain('"height":600');
    // User's bundle is inlined — look for the literal marker string
    expect(html).toContain("smoke-test-works");
    // Non-trivial size (bundled react + recharts etc.)
    expect(html.length).toBeGreaterThan(200_000);
  });

  test("buildHtml({ file }) throws on a missing entry", async () => {
    const poster = new Poster();
    await expect(
      poster.buildHtml({ file: "/nonexistent/nope.tsx" }),
    ).rejects.toThrow(/Entry not found/);
  });

  test("render PNG via default engine (takumi) returns a PNG buffer", async () => {
    const poster = new Poster();
    const result = await poster.render(
      { tsx: TRIVIAL_TSX },
      { format: "png", width: 400, height: 300 },
    );

    expect(Buffer.isBuffer(result)).toBe(true);
    const buf = result as Buffer;
    // PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50);
    expect(buf[2]).toBe(0x4e);
    expect(buf[3]).toBe(0x47);
    expect(buf.length).toBeGreaterThan(500);
  }, 30_000);

  test("render PNG via chrome engine returns a PNG buffer", async () => {
    if (!(await haveBrowser())) {
      return; // silent skip — browser-dependent
    }
    const poster = new Poster({ engine: "chrome" });
    const result = await poster.render(
      { tsx: TRIVIAL_TSX },
      { format: "png", width: 400, height: 300, waitFor: 0 },
    );

    expect(Buffer.isBuffer(result)).toBe(true);
    const buf = result as Buffer;
    expect(buf[0]).toBe(0x89);
    expect(buf[1]).toBe(0x50);
    expect(buf[2]).toBe(0x4e);
    expect(buf[3]).toBe(0x47);
    expect(buf.length).toBeGreaterThan(500);
  }, 30_000);

  test("takumi engine rejects non-PNG formats with a clear error", async () => {
    const poster = new Poster(); // default = takumi
    for (const format of ["pdf", "svg", "jpg", "webp"] as const) {
      await expect(
        poster.render({ tsx: TRIVIAL_TSX }, { format, width: 200, height: 200 }),
      ).rejects.toThrow(/engine "takumi" only supports PNG/);
    }
  });
});

describe("inferFormat", () => {
  test("infers from common extensions", () => {
    expect(inferFormat("out.png")).toBe("png");
    expect(inferFormat("OUT.PNG")).toBe("png");
    expect(inferFormat("dir/out.svg")).toBe("svg");
    expect(inferFormat("out.pdf")).toBe("pdf");
    expect(inferFormat("out.jpg")).toBe("jpg");
    expect(inferFormat("out.jpeg")).toBe("jpg");
    expect(inferFormat("out.webp")).toBe("webp");
    expect(inferFormat("out.gif")).toBe(null);
    expect(inferFormat("no-extension")).toBe(null);
  });
});
