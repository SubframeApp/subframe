import { oraPromise } from "ora"
import prompt from "prompts"
import { CLI_AUTH_ROUTE } from "shared/routes"
import { apiVerifyToken } from "./api-endpoints"
import { isDev } from "./common"
import { readAuthConfig, writeAuthConfig } from "./config"
import { CLILogger } from "./logger/logger-cli"
import { link } from "./output/format"
import { abortOnState } from "./prompt-helpers"

const BASE_URL = isDev ? "http://localhost:6501" : "https://app.subframe.com"

export async function verifyTokenWithOra(cliLogger: CLILogger, token: string): Promise<boolean> {
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
    return true
  } catch (error) {
    await cliLogger.trackWarningAndFlush("[CLI]: verifyToken failed", { error: error.toString() })
    return false
  }
}

export async function promptForNewAccessToken(cliLogger: CLILogger): Promise<string> {
  console.log("> To get new credentials, please visit the following URL in your web browser:")
  console.log(`> ${link(`${BASE_URL}${CLI_AUTH_ROUTE}`)}`)
  console.log()
  console.log("> You will need to login then enter the provided credentials below.")
  const { token } = await prompt({
    type: "text",
    name: "token",
    message: "Access token",
    validate: async (token: string) => {
      const isValid = await verifyTokenWithOra(cliLogger, token)
      return isValid ? true : `Invalid token`
    },
    onState: abortOnState,
  })

  await writeAuthConfig({ token })

  return token
}

export async function getAccessToken(cliLogger: CLILogger): Promise<string> {
  const authConfig = await readAuthConfig(cliLogger)
  if (authConfig && (await verifyTokenWithOra(cliLogger, authConfig.token))) {
    return authConfig.token
  }

  if (!authConfig) {
    console.log("> No existing credentials found.")
  } else {
    console.log("> Credentials are no longer valid.")
  }

  return promptForNewAccessToken(cliLogger)
}
