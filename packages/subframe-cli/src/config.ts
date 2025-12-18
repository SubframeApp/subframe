import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import XDGAppPaths from "xdg-app-paths"
import { isDev } from "./common"
import { CLILogger } from "./logger/logger-cli"
import { exists } from "./utils/fs"

const SUBFRAME_DIRECTORY = XDGAppPaths("com.subframe.cli").dataDirs()[0]
const AUTH_CONFIG_FILENAME = isDev ? "auth.dev.json" : "auth.json"
const SUBFRAME_AUTH_CONFIG_PATH = join(SUBFRAME_DIRECTORY, AUTH_CONFIG_FILENAME)

interface AuthConfig {
  tokens: {
    [teamId: number]: string
  }
}

function isAuthConfig(config: any): config is AuthConfig {
  return typeof config === "object" && config !== null && typeof config.tokens === "object"
}

async function readAuthConfig(cliLogger: CLILogger): Promise<AuthConfig | null> {
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

async function writeAuthConfig(authConfig: AuthConfig): Promise<void> {
  await mkdir(SUBFRAME_DIRECTORY, { recursive: true })
  await writeFile(SUBFRAME_AUTH_CONFIG_PATH, JSON.stringify(authConfig, null, 2))
}

export async function getToken(cliLogger: CLILogger, { teamId }: { teamId: number }): Promise<string | null> {
  const config = await readAuthConfig(cliLogger)
  return config?.tokens[teamId] ?? null
}

export async function storeToken(
  cliLogger: CLILogger,
  { teamId, token }: { teamId: number; token: string },
): Promise<void> {
  const config = await readAuthConfig(cliLogger)
  const tokens = config?.tokens ?? {}
  tokens[teamId] = token
  await writeAuthConfig({ tokens })
}
