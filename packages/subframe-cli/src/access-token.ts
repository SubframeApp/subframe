import { oraPromise } from "ora"
import prompt from "prompts"
import { CLI_AUTH_ROUTE } from "shared/routes"
import { apiVerifyToken } from "./api-endpoints"
import { BASE_URL } from "./common"
import { getTeamIdForToken, getToken, storeToken } from "./config"
import { SUBFRAME_AUTH_TOKEN_ENV } from "./constants"
import { isNonInteractive, NonInteractiveError } from "./interactive"
import { CLILogger } from "./logger/logger-cli"
import { link } from "./output/format"
import { abortOnState } from "./prompt-helpers"

interface TokenWithTeam {
  token: string
  teamId: number
}

export async function verifyTokenWithOra(cliLogger: CLILogger, token: string): Promise<TokenWithTeam | null> {
  try {
    const { userId, teamId } = await oraPromise(apiVerifyToken(token), {
      prefixText: "",
      text: "Authenticating with Subframe",
      successText: "Authenticated",
      failText: "Failed to authenticate",
    })
    cliLogger.identify({
      user: {
        userId,
      },
      group: {
        groupId: String(teamId),
      },
    })
    return { token, teamId }
  } catch (error) {
    await cliLogger.trackWarningAndFlush("[CLI]: verifyToken failed", { error: error.toString() })
    return null
  }
}

export async function promptForNewAccessToken(cliLogger: CLILogger): Promise<TokenWithTeam> {
  // Without a TTY there is nobody to paste a token, so fail with guidance rather
  // than hang on a prompt that can never be answered.
  if (isNonInteractive()) {
    throw new NonInteractiveError(
      `No Subframe credentials found. Set the ${SUBFRAME_AUTH_TOKEN_ENV} environment variable ` +
        `or pass --auth-token <token>. Generate a token at ${BASE_URL}${CLI_AUTH_ROUTE}.`,
    )
  }

  console.log("> To get new credentials, please visit the following URL in your web browser:")
  console.log(`> ${link(`${BASE_URL}${CLI_AUTH_ROUTE}`)}`)
  console.log()
  console.log("> You will need to login then enter the provided credentials below.")

  let tokenWithTeam: TokenWithTeam | null = null

  await prompt({
    type: "text",
    name: "token",
    message: "Access token",
    validate: async (token: string) => {
      tokenWithTeam = await verifyTokenWithOra(cliLogger, token)
      return tokenWithTeam ? true : `Invalid token`
    },
    onState: abortOnState,
  })

  if (!tokenWithTeam) {
    throw new Error("Unexpected error: failed to verify token")
  }

  await storeToken(cliLogger, tokenWithTeam)

  return tokenWithTeam
}

export async function getAccessToken(cliLogger: CLILogger, { teamId }: { teamId?: number }): Promise<TokenWithTeam> {
  if (!teamId) {
    return promptForNewAccessToken(cliLogger)
  }

  const token = await getToken(cliLogger, { teamId })
  if (token && (await verifyTokenWithOra(cliLogger, token))) {
    return { token, teamId }
  }

  if (!token) {
    console.log("> No existing credentials found.")
  } else {
    console.log("> Credentials are no longer valid.")
  }

  return promptForNewAccessToken(cliLogger)
}

/**
 * Resolve a token supplied out-of-band (flag or env var). If it's already cached
 * from a previous run, reuse it without another verify round-trip; otherwise
 * verify it once and cache it. `source` names where it came from for errors.
 */
async function resolveSuppliedToken(cliLogger: CLILogger, token: string, source: string): Promise<TokenWithTeam> {
  const cachedTeamId = await getTeamIdForToken(cliLogger, token)
  if (cachedTeamId !== null) {
    return { token, teamId: cachedTeamId }
  }

  const verified = await verifyTokenWithOra(cliLogger, token)
  if (!verified) {
    throw new Error(`Failed to authenticate with ${source}`)
  }
  await storeToken(cliLogger, verified)
  return verified
}

/**
 * Resolve an access token for any command, in priority order:
 *
 * 1. an explicit `--auth-token` flag
 * 2. the {@link SUBFRAME_AUTH_TOKEN_ENV} environment variable (preferred for CI/agents)
 * 3. a previously cached token for `teamId`, otherwise an interactive prompt
 *    (which fails fast in non-interactive mode)
 *
 * A token from (1) or (2) is verified and cached on first use so subsequent
 * commands work without re-supplying it (and without re-verifying it).
 */
export async function resolveAccessToken(
  cliLogger: CLILogger,
  { authTokenFlag, teamId }: { authTokenFlag?: string; teamId?: number },
): Promise<TokenWithTeam> {
  if (authTokenFlag) {
    return resolveSuppliedToken(cliLogger, authTokenFlag, "the provided --auth-token")
  }

  const envToken = process.env[SUBFRAME_AUTH_TOKEN_ENV]
  if (envToken) {
    return resolveSuppliedToken(cliLogger, envToken, `the token in ${SUBFRAME_AUTH_TOKEN_ENV}`)
  }

  return getAccessToken(cliLogger, { teamId })
}
