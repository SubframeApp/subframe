import { Analytics } from "@segment/analytics-node"

// hardcoded by Posthog: https://posthog.com/docs/libraries/segment#using-group-analytics
const SEGMENT_GROUP_KEY = "segment_group"

// Note: These are not secrets and fine being hardcoded in the source code.
const ANONYMOUS_SERVER_USER_ID = "ANONYMOUS_SERVER_USER-06576d5d-29ba-406c-8453-1aefa8d4d6b7" as const
export const ANONYMOUS_CLI_USER_ID = "ANONYMOUS_CLI_USER-db6a3ec1-756a-4931-acdd-ec29f531603c" as const
const ANONYMOUS_DESKTOP_USER_ID = "ANONYMOUS_DESKTOP_USER-3f8c2b1a-9d47-4e6f-bb05-2c1e7a8f4d9b" as const

interface BaseEvent {
  type: string
}

interface IdentifyArgs {
  user: {
    userId: string
    email?: string
    additionalData?: object
  }
  group: {
    groupId: string
    additionalData?: object
  } | null
}

interface Logger {
  identify: ({ user, group }: IdentifyArgs) => void
  trackEvent(event: BaseEvent): void
  trackWarning: (event: string, additionalData?: { [key: string]: string | number | boolean }) => void
  trackPageView: () => void
  logException: (error: Error, additionalData?: { [key: string]: string | number | boolean }) => void
  flush?: () => Promise<void>
}

type TypedLogger<T extends BaseEvent> = Omit<Logger, "trackEvent"> & {
  trackEvent: (event: T) => void
}

const EXCEPTION_EVENT_NAME = "EXCEPTION_LOGGING"

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

function isSharedAnonymousUserId(userId: string) {
  return userId === ANONYMOUS_SERVER_USER_ID || userId === ANONYMOUS_CLI_USER_ID || userId === ANONYMOUS_DESKTOP_USER_ID
}

function shouldEnableLogger() {
  return !!process.env.SEGMENT_WRITE_KEY
}

function shouldConsoleLog() {
  return process.env.NODE_ENV !== "production"
}

export type NodeLogger<T extends BaseEvent = BaseEvent> = WithRequired<TypedLogger<T>, "flush">

export function makeNodeLogger<T extends BaseEvent = BaseEvent>({
  userId,
  teamId,
  location,
  defaultProperties,
}: {
  userId: string
  teamId: number | null
  location: "CLI" | "Server" | "Desktop"
  // Flat properties added to every event; event-specific fields take precedence.
  defaultProperties?: Record<string, string | number | boolean>
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

    // ignore non team specific anonymous users; nothing to identify
    if (isSharedAnonymousUserId(user.userId)) {
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
      if (shouldConsoleLog()) {
        console.log("[Track Event]", event, { ...defaultProperties, ...additionalData })
      }

      if (!shouldEnableLogger()) {
        resolve()
        return
      }

      segmentAnalytics!.track(
        {
          userId: currentUserId || "",
          event,
          // Posthog requires specifying the group on all Segment events: https://posthog.com/docs/libraries/segment
          properties: { ...defaultProperties, ...additionalData, ...currentGroupDetails },
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
      event: `[Warning]: ${location} - ${event}`,
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
