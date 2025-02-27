import { program } from "commander"
import { isDev } from "./common"
import { initCommand } from "./init"
import { syncCommand } from "./sync"
import packageJson from "../package.json"

program.version(packageJson.version).description("Subframe CLI")

if (isDev) {
  program.option("--dev")
}

program.addCommand(initCommand)
program.addCommand(syncCommand)

process.env.NODE_ENV = isDev ? "development" : "production"
program.parseAsync(process.argv)
