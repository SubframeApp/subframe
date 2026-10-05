import { emitResult } from "./output/output"

/**
 * Run a command action with uniform output.
 *
 * - on success, emits `{ ok: true, command, ...result }` (only in --json mode)
 * - on failure, emits `{ ok: false, command, error }` (in --json mode) and rethrows
 *   so `main()` prints the message, reports it and sets the exit code
 *
 * Centralizing this keeps every command's success/error contract identical:
 * one clean error line (never a stack), a non-zero exit code, and a structured
 * JSON envelope on both success and failure.
 */
export async function runCommand(command: string, fn: () => Promise<Record<string, unknown> | void>): Promise<void> {
  try {
    const result = await fn()
    emitResult({ ok: true, command, ...(result ?? {}) })
  } catch (err: any) {
    emitResult({ ok: false, command, error: err?.message ?? String(err) })
    throw err
  }
}
