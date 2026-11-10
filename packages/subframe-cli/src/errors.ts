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

function permissionFixHint(platform: NodeJS.Platform): string {
  if (platform === "darwin") {
    return "Give your terminal app access in System Settings > Privacy & Security > Files and Folders (or Full Disk Access), or run the command from a folder you own."
  }
  return "Check that you have permission to read and write there, or run the command from a folder you own."
}

/** A file the OS refuses to let the CLI touch is the user's setup, not a CLI bug. */
export function toUserErrorIfPermissionDenied(err: unknown, platform: NodeJS.Platform): unknown {
  if (!(err instanceof Error)) {
    return err
  }
  const { code, path, dest } = err as NodeJS.ErrnoException & { dest?: string }
  if (code !== "EPERM" && code !== "EACCES") {
    return err
  }
  const subject = [path, dest].filter((p) => p !== undefined).join(" -> ") || "a file"
  return new UserError(`Permission denied (${code}) for ${subject}. ${permissionFixHint(platform)}`)
}
