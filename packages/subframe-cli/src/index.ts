import { program } from "@commander-js/extra-typings"
import packageJson from "../package.json"
import { isDev } from "./common"
import { importCommand } from "./import"
import { initCommand } from "./init"
import { pushComponentCommand } from "./push-component"
import { syncCommand } from "./sync"

program.version(packageJson.version).description("Subframe CLI")

if (isDev) {
  program.option("--dev")
}

program.addCommand(initCommand)
program.addCommand(syncCommand)
program.addCommand(pushComponentCommand)
program.addCommand(importCommand)

process.env.NODE_ENV = isDev ? "development" : "production"
program.parseAsync(process.argv)
