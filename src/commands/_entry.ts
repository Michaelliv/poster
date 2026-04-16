// Resolves a user-supplied entry to a real .tsx path on disk.
//
// Accepts either:
//   - A filesystem path ("poster.tsx") — returned as-is after validation.
//   - "-" — reads TSX source from stdin. By default it's saved to a local
//     path the agent can iterate on (typically .poster/<basename>.tsx);
//     pass `savePath: null` for one-shot ephemeral renders.
//
// Callers must invoke `cleanup()` in a finally block. For persisted entries
// it's a no-op; for ephemeral stdin it removes the tmp directory.

import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { EXIT_NOT_FOUND, EXIT_USER_ERROR } from "../utils/exit-codes.js";
import { error, hint, info } from "../utils/output.js";

export interface ResolvedEntry {
  /** Path to a real .tsx file on disk. */
  path: string;
  /** True if stdin was persisted (not a tmp file). */
  persisted: boolean;
  /** No-op for real files and persisted stdin; removes tmp dir otherwise. */
  cleanup: () => void;
}

export interface ResolveEntryOptions {
  /**
   * Where to save stdin when entry is "-". A path persists to disk; null
   * writes to a tmp directory that is removed via cleanup().
   */
  savePath: string | null;
  /** If true and stdin was persisted, log the saved path. */
  announce?: boolean;
}

export async function resolveEntry(
  entry: string,
  opts: ResolveEntryOptions,
): Promise<ResolvedEntry> {
  if (entry === "-") {
    const source = await readStdin();
    if (!source.trim()) {
      error("Empty stdin — expected TSX source on stdin when entry is '-'.");
      hint(
        "Example:  echo 'export default () => <h1>Hi</h1>' | poster export - -o out.png",
      );
      process.exit(EXIT_USER_ERROR);
    }

    if (opts.savePath) {
      const abs = resolve(process.cwd(), opts.savePath);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, source);
      if (opts.announce) info(`Saved stdin → ${abs}`);
      return { path: abs, persisted: true, cleanup: () => {} };
    }

    const dir = mkdtempSync(join(tmpdir(), "poster-stdin-"));
    const path = join(dir, "entry.tsx");
    writeFileSync(path, source);
    return {
      path,
      persisted: false,
      cleanup: () => rmSync(dir, { recursive: true, force: true }),
    };
  }

  const abs = resolve(process.cwd(), entry);
  if (!existsSync(abs)) {
    error(`Entry not found: ${abs}`);
    process.exit(EXIT_NOT_FOUND);
  }
  return { path: abs, persisted: false, cleanup: () => {} };
}

/**
 * Default save location for a stdin entry, derived from the output path:
 * `./out/app.png` → `.poster/app.tsx`. Callers can override via --save.
 */
export function defaultSavePath(outPath: string): string {
  const base = outPath.split(/[\\/]/).pop() ?? "poster.png";
  const stem = base.replace(/\.[^.]+$/, "") || "poster";
  return join(".poster", `${stem}.tsx`);
}

function readStdin(): Promise<string> {
  return new Promise((res, rej) => {
    if (process.stdin.isTTY) {
      res("");
      return;
    }
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => res(data));
    process.stdin.on("error", rej);
  });
}
