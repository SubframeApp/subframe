/**
 * Machine-readable output handling for `--json`.
 *
 * In `--json` mode we route human-facing `console.log` chatter (and the timing
 * helpers) to stderr so that stdout carries only the structured result, written
 * via {@link emitResult}.
 *
 * Note: spinners (ora) already write to stderr and disable their animation when
 * stdout is not a TTY, so they don't pollute the JSON result.
 */
import { flagJson } from "../flags"

export const isJsonOutput = flagJson

/**
 * Redirect human-facing stdout chatter to stderr so that stdout carries only the
 * structured JSON result. Call once at startup.
 */
export function configureOutput(): void {
  if (!isJsonOutput) {
    return
  }
  const toStderr = console.error.bind(console)
  console.log = (...args: unknown[]) => toStderr(...args)
  // Timing helpers default to stdout; neutralize them so they don't break JSON.
  console.time = () => {}
  console.timeEnd = () => {}
}

/**
 * Emit a command's final result. In `--json` mode this writes the object to
 * stdout as JSON; otherwise it does nothing (the command's own logging stands).
 */
export function emitResult(result: Record<string, unknown>): void {
  if (isJsonOutput) {
    process.stdout.write(JSON.stringify(result, null, 2) + "\n")
  }
}
