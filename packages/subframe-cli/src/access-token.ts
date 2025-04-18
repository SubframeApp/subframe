import { CLI_AUTH_ROUTE } from "@subframe/shared/routes"
import { oraPromise } from "ora"
import prompt from "prompts"
import { apiVerifyToken } from "./api-endpoints"
import { isDev } from "./common"
import { readAuthConfig, writeAuthConfig } from "./config"
import { link } from "./output/format"
import { abortOnState } from "./sync-helpers"

const BASE_URL = isDev ? "http://localhost:6501" : "https://app.subframe.com"

async function verifyToken(token: string): Promise<boolean> {
  try {
    const isValid = await apiVerifyToken(token)
    return isValid
  } catch (error) {
    throw new Error("Failed to authenticate with Subframe")
  }
}

export async function verifyTokenWithOra(token: string): Promise<boolean> {
  try {
    await oraPromise(verifyToken(token), {
      prefixText: "",
      text: "Authenticating with Subframe",
      successText: "Authenticated",
      failText: "Failed to authenticate",
    })
    return true
  } catch (error) {
    return false
  }
}

export async function promptForNewAccessToken(): Promise<string> {
  console.log("> To get new credentials, please visit the following URL in your web browser:")
  console.log(`> ${link(`${BASE_URL}${CLI_AUTH_ROUTE}`)}`)
  console.log()
  console.log("> You will need to login then enter the provided credentials below.")
  const { token } = await prompt({
    type: "text",
    name: "token",
    message: "Access token",
    validate: async (token: string) => {
      const isValid = await verifyTokenWithOra(token)
      return isValid ? true : `Invalid token`
    },
    onState: abortOnState,
  })

  await writeAuthConfig({ token })

  return token
}

export async function getAccessToken(): Promise<string> {
  const authConfig = await readAuthConfig()
  if (authConfig && (await verifyTokenWithOra(authConfig.token))) {
    return authConfig.token
  }

  if (!authConfig) {
    console.log("> No existing credentials found.")
  } else {
    console.log("> Credentials are no longer valid.")
  }

  return promptForNewAccessToken()
}
