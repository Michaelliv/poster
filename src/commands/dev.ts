import { watch } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { readFileSync } from "node:fs";
import { build } from "./build.js";
import { info, success, type OutputOptions } from "../utils/output.js";

export interface DevArgs {
  entry: string;
  port?: number;
  title?: string;
  width?: number;
  height?: number;
}

export async function dev(args: DevArgs, options: OutputOptions): Promise<void> {
  const entry = resolve(process.cwd(), args.entry);
  const port = args.port ?? 5173;
  const outPath = join(tmpdir(), `poster-${Date.now()}.html`);

  const rebuild = async () => {
    try {
      await build(
        {
          entry,
          out: outPath,
          title: args.title,
          width: args.width,
          height: args.height,
        },
        { ...options, quiet: true },
      );
      info(`rebuilt ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      console.error("build error:", (err as Error).message);
    }
  };

  await rebuild();

  watch(entry, { persistent: true }, () => {
    rebuild();
  });

  const server = createServer((req, res) => {
    if (req.url === "/" || req.url?.startsWith("/index.html")) {
      const html = readFileSync(outPath, "utf-8");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
      return;
    }
    res.writeHead(404);
    res.end("not found");
  });

  server.listen(port, () => {
    success(`poster dev — http://localhost:${port}`);
    info(`watching ${entry}`);
  });
}
