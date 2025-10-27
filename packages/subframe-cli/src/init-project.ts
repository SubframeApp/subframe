import { oraPromise } from "ora"
import { FAILED_TO_FETCH_PROJECT_ERROR } from "shared/constants"
import { TruncatedProjectId } from "shared/types"
import { promptForNewAccessToken } from "./access-token"
import { apiInitProject } from "./api-endpoints"

export async function initProject({
  accessToken,
  truncatedProjectId,
  cssType,
}: {
  accessToken: string
  truncatedProjectId: TruncatedProjectId | undefined
  cssType: "tailwind" | "tailwind-v4"
}) {
  try {
    const { styleFile, oldImportAlias } = await oraPromise(
      apiInitProject({
        token: accessToken,
        truncatedProjectId,
        cssType,
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
      return initProject({ accessToken: newAccessToken, truncatedProjectId, cssType })
    } else {
      throw error
    }
  }
}
