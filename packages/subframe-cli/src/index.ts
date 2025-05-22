import { program } from "@commander-js/extra-typings"
import packageJson from "../package.json"
import { buildCommand } from "./build"
import { isDev } from "./common"
import { initCommand } from "./init"
import { syncCommand } from "./sync"

program.version(packageJson.version).description("Subframe CLI")

if (isDev) {
  program.option("--dev")
}

program.addCommand(initCommand)
program.addCommand(syncCommand)
program.addCommand(buildCommand)

process.env.NODE_ENV = isDev ? "development" : "production"
program.parseAsync(process.argv)
