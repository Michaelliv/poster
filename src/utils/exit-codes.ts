// Exit codes the CLI uses. 0 (success) is Node's default; the rest are
// named so scripts can distinguish failure modes.
export const EXIT_ERROR = 1; // Generic failure
export const EXIT_USER_ERROR = 2; // Invalid input, missing args
export const EXIT_NOT_FOUND = 3; // File not found
