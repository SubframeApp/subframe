import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import XDGAppPaths from "xdg-app-paths"
import { CLILogger } from "./logger/logger-cli"
import { exists } from "./utils/fs"

const SUBFRAME_DIRECTORY = XDGAppPaths("com.subframe.cli").dataDirs()[0]
const SUBFRAME_AUTH_CONFIG_PATH = join(SUBFRAME_DIRECTORY, "auth.json")

interface AuthConfig {
  token: string
}

function isAuthConfig(config: any): config is AuthConfig {
  return typeof config === "object" && config !== null && typeof config.token === "string"
}

export async function readAuthConfig(cliLogger: CLILogger): Promise<AuthConfig | null> {
  try {
    if (!(await exists(SUBFRAME_AUTH_CONFIG_PATH))) {
      return null
    }

    const config = JSON.parse(await readFile(SUBFRAME_AUTH_CONFIG_PATH, "utf8"))
    if (!isAuthConfig(config)) {
      return null
    }

    return config
  } catch (err) {
    await cliLogger.trackWarningAndFlush("[CLI]: readAuthConfig failed", { error: err.toString() })
    return null
  }
}

export async function writeAuthConfig(authConfig: AuthConfig): Promise<void> {
  await mkdir(SUBFRAME_DIRECTORY, { recursive: true })
  await writeFile(SUBFRAME_AUTH_CONFIG_PATH, JSON.stringify(authConfig, null, 2))
}
