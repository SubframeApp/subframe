import { program } from "@commander-js/extra-typings"
import packageJson from "../package.json"
import { analytics } from "./analytics"
import { isDev } from "./common"
import { COMMAND_JSON_KEY, COMMAND_NON_INTERACTIVE_KEY, COMMAND_YES_KEY, COMMAND_YES_KEY_SHORT } from "./constants"
import { UserError } from "./errors"
import { importCommand } from "./import"
import { initCommand } from "./init"
import { flushLog, initLog, log } from "./log"
import { configureOutput } from "./output/output"
import { pushComponentCommand } from "./push-component"
import { syncCommand } from "./sync"

program.version(packageJson.version).description("Subframe CLI")

// Global flags for non-interactive / automated use. These are read directly
// from argv (see ./flags) so they work whether they appear before or after the
// subcommand; registering them here keeps commander from rejecting them and
// surfaces them in `subframe --help`.
program
  .option(
    `${COMMAND_YES_KEY_SHORT}, ${COMMAND_YES_KEY}`,
    "accept defaults and never prompt (also implied when stdin is not a TTY)",
  )
  .option(
    COMMAND_NON_INTERACTIVE_KEY,
    "strict: never prompt and never assume defaults; fail if a required value is missing",
  )
  .option(COMMAND_JSON_KEY, "print a machine-readable JSON result on stdout")

// Route human chatter to stderr (and emit JSON results) when requested.
configureOutput()

if (isDev) {
  program.option("--dev")
}

// Register --beta whenever it's passed so commander doesn't reject it as an
// unknown option. The flag itself is read from argv in common.ts (isBeta).
if (process.argv.includes("--beta")) {
  program.option("--beta")
}

program.addCommand(initCommand)
program.addCommand(syncCommand)
program.addCommand(pushComponentCommand)
program.addCommand(importCommand)

async function main() {
  initLog()
  try {
    await program.parseAsync(process.argv)
  } catch (err: any) {
    console.error(err?.message ?? String(err))
    process.exitCode = 1
    if (!(err instanceof UserError)) {
      log.error(err instanceof Error ? err : new Error(String(err)))
    }
  } finally {
    await Promise.allSettled([flushLog(), analytics.flush()])
  }
}

void main()
