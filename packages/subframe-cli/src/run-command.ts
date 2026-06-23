import { CLILogger, makeCLILogger } from "./logger/logger-cli"
import { emitResult } from "./output/output"

/**
 * Run a command action with uniform error handling and machine-readable output.
 *
 * - creates the CLI logger and hands it to `fn`
 * - on success, emits `{ ok: true, command, ...result }` (only in --json mode)
 * - on failure, prints the error message, records telemetry, emits
 *   `{ ok: false, command, error }` (in --json mode), and exits non-zero
 *
 * Centralizing this keeps every command's success/error contract identical:
 * one clean error line (never a stack), a non-zero exit code, and a structured
 * JSON envelope on both success and failure.
 */
export async function runCommand(
  command: string,
  fn: (cliLogger: CLILogger) => Promise<Record<string, unknown> | void>,
): Promise<void> {
  const cliLogger = makeCLILogger()
  try {
    const result = await fn(cliLogger)
    emitResult({ ok: true, command, ...(result ?? {}) })
  } catch (err: any) {
    const message = err?.message ?? String(err)
    console.error(message)
    // Never let a telemetry failure mask the real error or change the exit code.
    try {
      await cliLogger.trackWarningAndFlush(`[CLI]: ${command} uncaught error`, { error: String(err) })
    } catch {
      // ignore
    }
    emitResult({ ok: false, command, error: message })
    process.exit(1)
  }
}
