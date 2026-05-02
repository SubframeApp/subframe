import { oraPromise } from "ora"
import prompts from "prompts"
import { FAILED_TO_FETCH_PROJECT_ERROR } from "shared/constants"
import { InitProjectResponse, TruncatedProjectId } from "shared/types"
import { promptForNewAccessToken } from "./access-token"
import { apiInitProject, apiListProjects, apiListThemes } from "./api-endpoints"
import { CLILogger } from "./logger/logger-cli"
import { highlight } from "./output/format"
import { abortOnState } from "./prompt-helpers"

export async function selectProject({
  cliLogger,
  accessToken,
  projectIdOverride,
}: {
  cliLogger: CLILogger
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
    // We never expect to hit this.
    await cliLogger.trackWarningAndFlush("[CLI]: no projects found")
    throw new Error("No projects found. Please create a project at https://app.subframe.com first.")
  }

  if (projects.length === 1) {
    // Only one project - use it automatically
    return projects[0].truncatedProjectId
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
  cliLogger,
  accessToken,
  truncatedProjectId,
  cssType,
  themeId,
}: {
  cliLogger: CLILogger
  accessToken: string
  truncatedProjectId: TruncatedProjectId | undefined
  cssType: "tailwind" | "tailwind-v4"
  themeId?: string
}) {
  try {
    // NOTE: Important to return await so that we can catch the errors
    return await oraPromise(
      apiInitProject(accessToken, {
        truncatedProjectId,
        cssType,
        themeId,
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
      return initProject({ cliLogger, accessToken: newAccessToken, truncatedProjectId, cssType, themeId })
    }

    await cliLogger.trackWarningAndFlush("[CLI]: initProject failed", { error: error.toString() })
    throw error
  }
}

export async function selectTheme({
  accessToken,
  truncatedProjectId,
  themeIdOverride,
}: {
  accessToken: string
  truncatedProjectId: TruncatedProjectId
  themeIdOverride?: string
}): Promise<string | undefined> {
  const { themes } = await oraPromise(apiListThemes(accessToken, { truncatedProjectId }), {
    text: "Loading themes",
    successText: "Loaded themes",
    failText: "Failed to load themes",
  })

  if (themeIdOverride) {
    const match = themes.find((t) => t.id === themeIdOverride)
    if (match) return match.id
    console.warn(`Theme id "${themeIdOverride}" not found in this project. Falling back to the root theme.`)
    return undefined
  }

  if (themes.length <= 1) return undefined

  const choices = themes.map((t) => ({
    title: t.isRoot ? `${t.name} (root)` : t.name,
    value: t.id,
  }))

  const { selectedThemeId } = await prompts({
    type: "autocomplete",
    name: "selectedThemeId",
    message: "Which theme do you want to use?",
    choices,
    suggest: (input: string, choices: prompts.Choice[]) =>
      Promise.resolve(choices.filter((c) => c.title.toLowerCase().includes(input.toLowerCase()))),
    onState: abortOnState,
  })

  return selectedThemeId
}
