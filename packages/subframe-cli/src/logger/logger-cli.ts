import { ANONYMOUS_CLI_USER_ID } from "shared/logger/constants"
import { makeNodeLogger, NodeLogger } from "shared/logger/logger-node"

type CLITrackEventType = {
  type: "cli:starter-kit_cloned"
  framework: "nextjs" | "vite" | "astro"
  cssType: "tailwind" | "tailwind-v4"
}

export type CLILogger = NodeLogger<CLITrackEventType> & {
  trackWarningAndFlush: (...params: Parameters<CLILogger["trackWarning"]>) => Promise<void>
  trackEventAndFlush: (...params: Parameters<CLILogger["trackEvent"]>) => Promise<void>
}

export function makeCLILogger(): CLILogger {
  const nodeLogger = makeNodeLogger<CLITrackEventType>({ userId: ANONYMOUS_CLI_USER_ID, teamId: null })

  return {
    identify: nodeLogger.identify,
    trackEvent: nodeLogger.trackEvent,
    trackWarning: nodeLogger.trackWarning,
    trackPageView: nodeLogger.trackPageView,
    logException: nodeLogger.logException,
    flush: nodeLogger.flush,
    trackWarningAndFlush: async (...params: Parameters<CLILogger["trackWarning"]>) => {
      nodeLogger.trackWarning(...params)
      await nodeLogger.flush()
    },
    trackEventAndFlush: async (...params: Parameters<CLILogger["trackEvent"]>) => {
      nodeLogger.trackEvent(...params)
      await nodeLogger.flush()
    },
  }
}
