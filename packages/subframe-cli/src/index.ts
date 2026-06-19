import { program } from "@commander-js/extra-typings"
import packageJson from "../package.json"
import { isBeta, isDev } from "./common"
import { importCommand } from "./import"
import { initCommand } from "./init"
import { pushComponentCommand } from "./push-component"
import { syncCommand } from "./sync"

program.version(packageJson.version).description("Subframe CLI")

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

// Treat beta like dev for telemetry: NODE_ENV gates the Segment logger, so
// only production runs against app.subframe.com report analytics.
process.env.NODE_ENV = isDev || isBeta ? "development" : "production"
program.parseAsync(process.argv)
