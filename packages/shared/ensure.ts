function describeValue(x: unknown): string {
  try {
    return JSON.stringify(x) ?? String(x)
  } catch {
    return String(x)
  }
}

// Use throwError=false when you want type-checking, but not to throw an actual error
export function ensureUnreachable(x: never, throwError: boolean = true) {
  if (throwError) {
    throw new Error(`ensureUnreachable() reached with: ${describeValue(x)}`)
  }
  return x
}

export function ensureExists<T>(value: T | null | undefined): T {
  if (typeof value === "undefined" || value === null) {
    throw new Error(`ensureExists() failed; expected value to be defined and non-null: ${value}`)
  }
  return value
}

export function ensureLength<T>(value: T[], length: number): T[] {
  if (value.length !== length) {
    throw new Error(`ensureLength() failed; expected value to have a length of ${length}: ${value}`)
  }
  return value
}

export function ensureIsString(
  value: unknown,
  message: string = "ensureIsString() failed; expected value to be a string",
): string {
  if (typeof value !== "string") {
    throw new Error(`${message}: ${describeValue(value)}`)
  }
  return value
}

export function ensureIsNumber(value: unknown): number {
  if (typeof value !== "number") {
    throw new Error(`ensureIsNumber() failed; expected value to be a number: ${describeValue(value)}`)
  }
  return value
}

// TODO cleanup this function to only take in an array
export function ensureIsExactlyOne<T>(value: T[], parentType?: string): T {
  if (value.length !== 1) {
    const context = parentType ? ` when parsing children of ${parentType}` : ""
    throw new Error(
      `ensureIsExactlyOne() failed; expected value to have a length of 1${context}, but got ${value.length}`,
    )
  }
  return value[0]
}
