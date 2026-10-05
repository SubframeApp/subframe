/** An expected failure: its message is for the user and the CLI never reports it. */
export class UserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UserError"
  }
}

export class HttpResponseError extends UserError {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = "HttpResponseError"
  }
}
