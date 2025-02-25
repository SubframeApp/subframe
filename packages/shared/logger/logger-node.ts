import { Analytics } from "@segment/analytics-node"
import { WithRequired } from "../type-helpers"
import { BaseEvent, EXCEPTION_EVENT_NAME, TypedLogger } from "./types"

function shouldEnableLogger() {
  // disable in dev
  return process.env.NODE_ENV === "production"
}

type NodeLogger<T extends BaseEvent = BaseEvent> = WithRequired<
  TypedLogger<T>,
  "trackEventAndFlush" | "trackWarningAndFlush" | "logExceptionAndFlush"
>

export function makeNodeLogger<T extends BaseEvent = BaseEvent>(userId: string): NodeLogger<T> {
  let segmentAnalytics: Analytics | null = null
  let currentUserId: string | null = null

  function identifyUser(userId: string) {
    currentUserId = userId
  }

  if (shouldEnableLogger()) {
    segmentAnalytics = new Analytics({
      writeKey: process.env.SEGMENT_WRITE_KEY ?? "",
      flushAt: 1,
    }).on("error", console.error)
    identifyUser(userId)
  }

  function trackEventRaw(userId: string | null, event: string, additionalData: object = {}): Promise<void> {
    return new Promise((resolve) => {
      if (!shouldEnableLogger()) {
        console.log("[Track Event]", event, additionalData)
        resolve()
        return
      }

      segmentAnalytics!.track({ userId: userId || "", event, properties: additionalData }, () => resolve())
    })
  }

  function trackEvent(event: T): Promise<void> {
    const { type, ...additionalData } = event
    return trackEventRaw(currentUserId, type, additionalData)
  }

  async function trackEventAndFlush(event: T) {
    await trackEvent(event)
    await flushAndClose()
  }

  function trackWarning(event: string, additionalData: { [key: string]: string | number | boolean } = {}) {
    return trackEventRaw(currentUserId, `[Warning]: ${event}`, {
      ...additionalData,
      warning: true,
      raw: JSON.stringify(additionalData),
    })
  }

  async function trackWarningAndFlush(
    event: string,
    additionalData: { [key: string]: string | number | boolean } = {},
  ) {
    await trackWarning(event, additionalData)
    await flushAndClose()
  }

  function trackPageView() {
    throw new Error("trackPage not implemented on server side")
  }

  function logException(error: Error, additionalData: { [key: string]: string | number | boolean } = {}) {
    return trackEventRaw(currentUserId, EXCEPTION_EVENT_NAME, {
      ...additionalData,
      error: JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack,
        // taken from https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
        raw: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      }),
    })
  }

  async function logExceptionAndFlush(error: Error, additionalData: { [key: string]: string | number | boolean } = {}) {
    await logException(error, additionalData)
    await flushAndClose()
  }

  async function flushAndClose(): Promise<void> {
    if (!shouldEnableLogger()) {
      return
    }

    // segment batches events (10s delay), so you will need to flush them before exiting
    return segmentAnalytics!.closeAndFlush()
  }
  return {
    identifyUser,
    trackEvent,
    trackEventAndFlush,
    trackWarning,
    trackWarningAndFlush,
    trackPageView,
    logException,
    logExceptionAndFlush,
  }
}
