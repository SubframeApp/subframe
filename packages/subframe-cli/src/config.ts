import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import XDGAppPaths from "xdg-app-paths"
import { isBeta, isDev } from "./common"
import { CLILogger } from "./logger/logger-cli"
import { exists } from "./utils/fs"

const SUBFRAME_DIRECTORY = XDGAppPaths("com.subframe.cli").dataDirs()[0]
// Tokens are scoped per environment since each backend issues its own.
// Keeping them in separate files prevents beta tokens from clobbering prod tokens.
const AUTH_CONFIG_FILENAME = isDev ? "auth.dev.json" : isBeta ? "auth.beta.json" : "auth.json"
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

/**
 * Look up the team a token is already cached under, if any. Lets callers reuse a
 * previously-verified token without another round-trip to the verify endpoint.
 */
export async function getTeamIdForToken(cliLogger: CLILogger, token: string): Promise<number | null> {
  const config = await readAuthConfig(cliLogger)
  if (!config) {
    return null
  }
  for (const [teamId, cachedToken] of Object.entries(config.tokens)) {
    if (cachedToken === token) {
      return Number(teamId)
    }
  }
  return null
}

export async function storeToken(
  cliLogger: CLILogger,
  { teamId, token }: { teamId: number; token: string },
): Promise<void> {
  const config = await readAuthConfig(cliLogger)
  const tokens = config?.tokens ?? {}
  // Avoid a redundant read-modify-write (and the file race under concurrent jobs)
  // when the cached token is already identical.
  if (tokens[teamId] === token) {
    return
  }
  tokens[teamId] = token
  await writeAuthConfig({ tokens })
}
