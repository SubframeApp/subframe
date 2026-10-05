import * as Sentry from "@sentry/node-core"
import { isBeta, isDev, isTelemetryAllowed } from "./common"

type LogAttributes = Record<string, string | number | boolean | null>

const FLUSH_TIMEOUT_MS = 2000

function getEnvironment() {
  if (isDev) {
    return "development"
  }
  return isBeta ? "beta" : "production"
}

function warn(message: string, attributes?: LogAttributes) {
  Sentry.logger.warn(message, attributes)
}

function error(err: Error, attributes?: LogAttributes) {
  Sentry.captureException(err, { extra: attributes })
}

export function initLog() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: !!process.env.SENTRY_DSN && isTelemetryAllowed,
    release: process.env.SENTRY_RELEASE,
    environment: getEnvironment(),
    enableLogs: true,
    sendDefaultPii: false,
    includeServerName: false,
    // Console output carries project names and paths.
    maxBreadcrumbs: 0,
  })
}

export async function flushLog() {
  await Sentry.flush(FLUSH_TIMEOUT_MS)
}

export const log = { warn, error }
