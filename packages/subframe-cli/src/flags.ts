/**
 * Global flags parsed directly from argv.
 *
 * These are read from argv (not from commander's parsed options) so they're
 * available at module-load time and regardless of where they appear relative to
 * the subcommand. This is the single source of truth for the cross-cutting
 * flags; `interactive.ts` and `output/output.ts` derive their behavior from
 * here rather than each re-scanning argv.
 *
 * (The environment flags --dev/--beta live in common.ts because they also gate
 * BASE_URL and the telemetry env; they are intentionally not duplicated here.)
 */
import {
  COMMAND_JSON_KEY,
  COMMAND_NON_INTERACTIVE_KEY,
  COMMAND_YES_KEY,
  COMMAND_YES_KEY_SHORT,
} from "shared/constants"

const argv = process.argv

export const flagYes = argv.includes(COMMAND_YES_KEY) || argv.includes(COMMAND_YES_KEY_SHORT)
export const flagNonInteractive = argv.includes(COMMAND_NON_INTERACTIVE_KEY)
export const flagJson = argv.includes(COMMAND_JSON_KEY)
