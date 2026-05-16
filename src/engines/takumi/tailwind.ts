// Real Tailwind v4 expansion for the Takumi engine.
//
// We collect every `className` token in the React tree, hand them to the
// real Tailwind compiler from `@tailwindcss/node`, and pass the resulting
// CSS to Takumi as a stylesheet. Takumi's internal `tw` parser is disabled
// in the engine (`tailwindClassesProperty: "__poster_unused_tw_prop__"`)
// so this is the only thing interpreting Tailwind utilities.
//
// Two exports:
//
//   warmTailwind()                — call once at startup; resolves the
//                                   async compile so the rest is sync.
//   tailwindCssForClasses(tokens) — compile a set of class candidates
//                                   into a CSS stylesheet string.
//
// We use lightningcss via `optimize()` only to un-nest Tailwind v4's
// nested rules (`& ::first-letter { … }`); some downstream CSS consumers
// don't handle nesting cleanly.

import { compile, optimize } from "@tailwindcss/node";

type TwBuild = (candidates: string[]) => string;

let cachedBuild: TwBuild | null = null;

async function ensureCompiler(): Promise<TwBuild> {
  if (cachedBuild) return cachedBuild;
  const tw = await compile('@import "tailwindcss";', {
    base: process.cwd(),
    onDependency: () => {},
  });
  cachedBuild = tw.build;
  return cachedBuild;
}

/**
 * Resolve the Tailwind compiler once. Idempotent. The Takumi engine awaits
 * this at the top of every render so `tailwindCssForClasses` can be sync.
 */
export async function warmTailwind(): Promise<void> {
  await ensureCompiler();
}

/**
 * Expand a set of class candidates into a CSS stylesheet string. Throws if
 * called before `warmTailwind()` has resolved.
 */
export function tailwindCssForClasses(classes: Iterable<string>): string {
  if (!cachedBuild) {
    throw new Error(
      "poster/tailwind: compiler not warmed. Call `await warmTailwind()` first.",
    );
  }
  const raw = cachedBuild([...classes]);
  return optimize(raw, { minify: false }).code;
}
