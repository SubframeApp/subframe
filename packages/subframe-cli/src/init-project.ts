import { oraPromise } from "ora"
import prompts from "prompts"
import { promptForNewAccessToken } from "./access-token"
import { apiInitProject, apiListProjects } from "./api-endpoints"
import { InitProjectResponse, TruncatedProjectId } from "./api-types"
import { COMMAND_PROJECT_ID_KEY, FAILED_TO_FETCH_PROJECT_ERROR } from "./constants"
import { UserError } from "./errors"
import { isNonInteractive, NonInteractiveError } from "./interactive"
import { log } from "./log"
import { highlight } from "./output/format"
import { abortOnState } from "./prompt-helpers"

export async function selectProject({
  accessToken,
  projectIdOverride,
}: {
  accessToken: string
  projectIdOverride?: TruncatedProjectId
}): Promise<TruncatedProjectId> {
  // If a project ID was provided via flag or local settings, use it
  if (projectIdOverride) {
    return projectIdOverride
  }

  const { projects } = await oraPromise(apiListProjects(accessToken), {
    text: "Loading projects",
    successText: "Loaded projects",
    failText: "Failed to load projects",
  })

  if (projects.length === 0) {
    log.warn("No projects found")
    throw new UserError("No projects found. Please create a project at https://app.subframe.com first.")
  }

  if (projects.length === 1) {
    // Only one project - use it automatically
    return projects[0].truncatedProjectId
  }

  // Multiple projects, no way to choose without input - fail with the list so the
  // caller knows exactly which id to pass. Never guess a project for them.
  if (isNonInteractive()) {
    const available = projects.map((p) => `  - ${p.name} (${p.truncatedProjectId})`).join("\n")
    throw new NonInteractiveError(
      `Multiple Subframe projects found. Pass ${COMMAND_PROJECT_ID_KEY} <projectId>.\nAvailable projects:\n${available}`,
    )
  }

  // Multiple projects - prompt user to select one
  const choices = projects.map((p: { truncatedProjectId: TruncatedProjectId; name: string }) => ({
    title: p.name,
    value: p.truncatedProjectId,
  }))

  const { selectedProjectId } = await prompts({
    type: "autocomplete",
    name: "selectedProjectId",
    message: "Which Subframe project do you want to use?",
    choices,
    suggest: (input: string, choices: prompts.Choice[]) =>
      Promise.resolve(choices.filter((c) => c.title.toLowerCase().includes(input.toLowerCase()))),
    onState: abortOnState,
  })

  return selectedProjectId
}

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
      const { token: newAccessToken } = await promptForNewAccessToken()
      return initProject({ accessToken: newAccessToken, truncatedProjectId, cssType })
    }

    throw error
  }
}
