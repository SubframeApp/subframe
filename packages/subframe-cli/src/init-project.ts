import { FAILED_TO_FETCH_PROJECT_ERROR } from "@subframe/shared/constants"
import { oraPromise } from "ora"
import { promptForNewAccessToken } from "./access-token"
import { apiInitProject } from "./api-endpoints"

export async function initProject({
  accessToken,
  truncatedProjectId,
}: {
  accessToken: string
  truncatedProjectId: string | undefined
}) {
  try {
    const { styleFile, oldImportAlias } = await oraPromise(
      apiInitProject({
        token: accessToken,
        truncatedProjectId,
      }),
      {
        text: "Initializing Subframe project",
        failText: "Failed to initialize Subframe project",
      },
    )
    return { styleFile, oldImportAlias }
  } catch (error) {
    if (error.message === FAILED_TO_FETCH_PROJECT_ERROR) {
      console.log("> Unable to fetch project. Try authenticating again.")
      const newAccessToken = await promptForNewAccessToken()
      return initProject({ accessToken: newAccessToken, truncatedProjectId })
    } else {
      throw error
    }
  }
}
