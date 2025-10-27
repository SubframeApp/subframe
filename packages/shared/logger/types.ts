export interface BaseEvent {
  type: string
}

export interface Logger {
  identify: ({
    user,
    group,
  }: {
    user: {
      userId: string
      email?: string
      additionalData?: object
    }
    group: {
      groupId: string
      additionalData?: object
    } | null
  }) => void
  trackEvent(event: BaseEvent): void
  trackEventAndFlush?: (event: BaseEvent) => Promise<void>
  trackWarning: (event: string, additionalData?: { [key: string]: string | number | boolean }) => void
  trackWarningAndFlush?: (event: string, additionalData?: { [key: string]: string | number | boolean }) => Promise<void>
  trackPageView: () => void
  logException: (error: Error, additionalData?: { [key: string]: string | number | boolean }) => void
  logExceptionAndFlush?: (error: Error, additionalData?: { [key: string]: string | number | boolean }) => Promise<void>
}

export type TypedLogger<T extends BaseEvent> = Omit<Logger, "trackEvent" | "trackEventAndFlush"> & {
  trackEvent: (event: T) => void
  trackEventAndFlush?: (event: T) => Promise<void>
}

export const EXCEPTION_EVENT_NAME = "EXCEPTION_LOGGING"
