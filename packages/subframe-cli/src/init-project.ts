import { oraPromise } from "ora"
import { FAILED_TO_FETCH_PROJECT_ERROR } from "shared/constants"
import { InitProjectResponse, TruncatedProjectId } from "shared/types"
import { promptForNewAccessToken } from "./access-token"
import { apiInitProject } from "./api-endpoints"
import { CLILogger } from "./logger/logger-cli"
import { highlight } from "./output/format"

export async function initProject({
  cliLogger,
  accessToken,
  truncatedProjectId,
  cssType,
}: {
  cliLogger: CLILogger
  accessToken: string
  truncatedProjectId: TruncatedProjectId | undefined
  cssType: "tailwind" | "tailwind-v4"
}) {
  try {
    // NOTE: Important to return await so that we can catch the errors
    return await oraPromise(
      apiInitProject(accessToken, {
        truncatedProjectId,
        cssType,
      }),
      {
        text: "Initializing Subframe project",
        successText: (result: InitProjectResponse) => `Successfully initialized ${highlight(result.projectInfo.name)}`,
        failText: "Failed to initialize Subframe project",
      },
    )
  } catch (error) {
    if (error.message === FAILED_TO_FETCH_PROJECT_ERROR) {
      console.log("> Unable to fetch project. Try authenticating again.")
      const { token: newAccessToken } = await promptForNewAccessToken(cliLogger)
      return initProject({ cliLogger, accessToken: newAccessToken, truncatedProjectId, cssType })
    }

    await cliLogger.trackWarningAndFlush("[CLI]: initProject failed", { error: error.toString() })
    throw error
  }
}
