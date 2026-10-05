import * as Sentry from "@sentry/node-core"
import { homedir } from "node:os"
import { FetchError } from "node-fetch"
import packageJson from "../package.json"
import { isBeta, isDev, isTelemetryAllowed } from "./common"
import { HttpResponseError, UserError } from "./errors"

type SentryLog = Parameters<NonNullable<Sentry.NodeOptions["beforeSendLog"]>>[0]

type LogAttributes = Record<string, string | number | boolean | null>

const FLUSH_TIMEOUT_MS = 2000

const NETWORK_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "ECONNABORTED",
  "ENOTFOUND",
  "EAI_AGAIN",
  "ETIMEDOUT",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "EPIPE",
])

function scrubPaths(text: string): string {
  // cwd first: it usually sits inside the home directory.
  const roots: [string, string][] = [
    [process.cwd(), "<cwd>"],
    [homedir(), "~"],
  ]
  let scrubbed = text
  for (const [root, replacement] of roots) {
    if (root.length > 1) {
      scrubbed = scrubbed.replaceAll(root, replacement)
    }
  }
  return scrubbed
}

function scrubStrings(values: Record<string, unknown> | undefined) {
  if (!values) {
    return
  }
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === "string") {
      values[key] = scrubPaths(value)
    }
  }
}

function scrubEvent(event: Sentry.ErrorEvent): Sentry.ErrorEvent {
  // The hostname is machine-identifying and the SDK fills it in after init options.
  delete event.server_name
  if (event.message) {
    event.message = scrubPaths(event.message)
  }
  for (const exception of event.exception?.values ?? []) {
    if (exception.value) {
      exception.value = scrubPaths(exception.value)
    }
    for (const frame of exception.stacktrace?.frames ?? []) {
      if (frame.filename) {
        frame.filename = scrubPaths(frame.filename)
      }
      if (frame.abs_path) {
        frame.abs_path = scrubPaths(frame.abs_path)
      }
    }
  }
  scrubStrings(event.extra)
  return event
}

function scrubLog(log: SentryLog): SentryLog | null {
  log.message = scrubPaths(log.message)
  scrubStrings(log.attributes)
  return log
}

function getEnvironment() {
  if (isDev) {
    return "development"
  }
  return isBeta ? "beta" : "production"
}

function isRequestWithoutResponse(error: unknown): boolean {
  if (error instanceof FetchError) {
    return true
  }
  const code = (error as { code?: unknown } | null)?.code
  return typeof code === "string" && NETWORK_ERROR_CODES.has(code)
}

function getErrorCode(error: unknown): string {
  const { code, type } = error as { code?: unknown; type?: unknown }
  return String(code ?? type)
}

function warn(message: string, attributes?: LogAttributes) {
  Sentry.logger.warn(message, attributes)
}

function error(err: Error, attributes?: LogAttributes) {
  Sentry.captureException(err, { extra: attributes })
}

/**
 * The single classifier for errors that are caught: rejections the server already
 * handled and user conditions are dropped, requests that never got a response are
 * a warning, and anything else is a bug worth a Sentry issue.
 */
export function reportError(err: unknown) {
  if (err instanceof HttpResponseError || err instanceof UserError) {
    return
  }
  if (isRequestWithoutResponse(err)) {
    warn("Request failed without a response", { code: getErrorCode(err) })
    return
  }
  error(err instanceof Error ? err : new Error(String(err)))
}

export function initLog() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: !!process.env.SENTRY_DSN && isTelemetryAllowed,
    release: `@subframe/cli@${packageJson.version}`,
    environment: getEnvironment(),
    enableLogs: true,
    sendDefaultPii: false,
    includeServerName: false,
    // Console output carries project names and paths.
    maxBreadcrumbs: 0,
    beforeSend: scrubEvent,
    beforeSendLog: scrubLog,
  })
}

export async function flushLog() {
  await Sentry.flush(FLUSH_TIMEOUT_MS)
}

export const log = { warn, error }
