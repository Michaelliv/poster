// Exit codes the CLI actually uses. 0 and 1 are implicit (Node's defaults
// for clean exit and uncaught exception), so we only name the distinctions
// that matter for scripting.
export const EXIT_USER_ERROR = 2; // Invalid input, missing args
export const EXIT_NOT_FOUND = 3; // File not found
