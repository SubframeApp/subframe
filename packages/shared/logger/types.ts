export interface BaseEvent {
  type: string
}

export interface IdentifyArgs {
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

export interface Logger {
  identify: ({ user, group }: IdentifyArgs) => void
  trackEvent(event: BaseEvent): void
  trackWarning: (event: string, additionalData?: { [key: string]: string | number | boolean }) => void
  trackPageView: () => void
  logException: (error: Error, additionalData?: { [key: string]: string | number | boolean }) => void
  flush?: () => Promise<void>
}

export type TypedLogger<T extends BaseEvent> = Omit<Logger, "trackEvent"> & {
  trackEvent: (event: T) => void
}

export const EXCEPTION_EVENT_NAME = "EXCEPTION_LOGGING"
