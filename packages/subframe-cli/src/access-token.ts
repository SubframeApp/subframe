import { oraPromise } from "ora"
import prompt from "prompts"
import { CLI_AUTH_ROUTE } from "shared/routes"
import { apiVerifyToken } from "./api-endpoints"
import { isDev } from "./common"
import { getToken, storeToken } from "./config"
import { CLILogger } from "./logger/logger-cli"
import { link } from "./output/format"
import { abortOnState } from "./prompt-helpers"

const BASE_URL = isDev ? "http://localhost:6501" : "https://app.subframe.com"

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
