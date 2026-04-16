import chalk from "chalk";

export interface OutputOptions {
  json?: boolean;
  quiet?: boolean;
}

export const success = (msg: string) => console.log(chalk.green("✓"), msg);
export const info = (msg: string) => console.log(chalk.blue("ℹ"), msg);
export const warn = (msg: string) => console.log(chalk.yellow("⚠"), msg);
export const error = (msg: string) => console.error(chalk.red("✗"), msg);
export const hint = (msg: string) => console.log(chalk.dim(`  ${msg}`));
export const cmd = (s: string) => chalk.cyan(s);

export function output(
  options: OutputOptions,
  handlers: {
    json?: () => object;
    quiet?: () => void;
    human: () => void;
  },
): void {
  if (options.json && handlers.json) {
    console.log(JSON.stringify(handlers.json(), null, 2));
  } else if (options.quiet) {
    handlers.quiet?.();
  } else {
    handlers.human();
  }
}
