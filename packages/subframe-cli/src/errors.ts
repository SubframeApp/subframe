export class HttpResponseError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = "HttpResponseError"
  }
}

// A condition the user has to fix (or that was already logged as a warning); never a CLI bug.
export class UserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UserError"
  }
}
