import { Analytics } from "@segment/analytics-node"
import { WithRequired } from "../type-helpers"
import { SEGMENT_GROUP_KEY } from "./constants"
import { isAnonymousUserId } from "./helpers"
import { BaseEvent, EXCEPTION_EVENT_NAME, IdentifyArgs, TypedLogger } from "./types"

function shouldEnableLogger() {
  // disable in dev
  return process.env.NODE_ENV === "production"
}

export type NodeLogger<T extends BaseEvent = BaseEvent> = WithRequired<TypedLogger<T>, "flush">

export function makeNodeLogger<T extends BaseEvent = BaseEvent>({
  userId,
  teamId,
}: {
  userId: string
  teamId: number | null
}): NodeLogger<T> {
  /**
   * Local variables
   */
  let segmentAnalytics: Analytics | null = null
  let currentUserId: string | null = null
  let currentGroupDetails: { $groups: { [SEGMENT_GROUP_KEY]: string } } | null = null

  /**
   * Init
   */
  if (shouldEnableLogger()) {
    segmentAnalytics = new Analytics({
      writeKey: process.env.SEGMENT_WRITE_KEY ?? "",
      flushAt: 1,
    }).on("error", console.error)

    identify({ user: { userId }, group: teamId !== null ? { groupId: String(teamId) } : null })
  }

  /**
   * Main functions
   */
  function identify({ user, group }: IdentifyArgs) {
    currentUserId = user.userId
    currentGroupDetails = group ? { $groups: { [SEGMENT_GROUP_KEY]: group.groupId } } : null

    if (!shouldEnableLogger()) {
      return
    }

    // ignore anonymous users; nothing to identify
    if (isAnonymousUserId(user.userId)) {
      return
    }

    segmentAnalytics!.identify({
      userId: user.userId,
      traits: { ...user.additionalData },
    })
    if (group) {
      segmentAnalytics!.group({
        userId: user.userId,
        groupId: group.groupId,
        traits: { ...group.additionalData },
      })
    }
  }

  async function flush(): Promise<void> {
    if (!shouldEnableLogger()) {
      return
    }

    // segment batches events (10s delay), so you will need to flush them before exiting
    return segmentAnalytics!.flush()
  }

  function trackEventRaw({ event, additionalData = {} }: { event: string; additionalData?: object }): Promise<void> {
    return new Promise((resolve) => {
      if (!shouldEnableLogger()) {
        console.log("[Track Event]", event, additionalData)
        resolve()
        return
      }

      segmentAnalytics!.track(
        {
          userId: currentUserId || "",
          event,
          // Posthog requires specifying the group on all Segment events: https://posthog.com/docs/libraries/segment
          properties: { ...additionalData, ...currentGroupDetails },
        },
        () => resolve(),
      )
    })
  }

  function trackEvent(event: T): Promise<void> {
    const { type, ...additionalData } = event
    return trackEventRaw({ event: type, additionalData })
  }

  function trackWarning(event: string, additionalData: { [key: string]: string | number | boolean } = {}) {
    return trackEventRaw({
      event: `[Warning]: ${event}`,
      additionalData: {
        ...additionalData,
        warning: true,
        raw: JSON.stringify(additionalData),
      },
    })
  }

  function trackPageView() {
    throw new Error("trackPage not implemented on server side")
  }

  function logException(error: Error, additionalData: { [key: string]: string | number | boolean } = {}) {
    return trackEventRaw({
      event: EXCEPTION_EVENT_NAME,
      additionalData: {
        ...additionalData,
        error: JSON.stringify({
          name: error.name,
          message: error.message,
          stack: error.stack,
          // taken from https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
          raw: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        }),
      },
    })
  }

  return {
    identify,
    trackEvent,
    trackWarning,
    trackPageView,
    logException,
    flush,
  }
}
