// Polyfill fetch and webcrypto
import "isomorphic-fetch"
import "isomorphic-webcrypto"

import { isDev } from "./common"
import { initCommand } from "./init"
import { syncCommand } from "./sync"

const program = new Command()

if (isDev) {
  program.option("--dev")
}

program.addCommand(initCommand)
program.addCommand(syncCommand)

process.env.NODE_ENV = isDev ? "development" : "production"
program.parseAsync(process.argv)
