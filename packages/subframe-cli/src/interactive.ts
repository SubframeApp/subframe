import prompts from "prompts"
import { flagJson, flagNonInteractive, flagYes } from "./flags"
import { abortOnState } from "./prompt-helpers"

/**
 * Whether the CLI should avoid interactive prompts.
 *
 * This is true when any of the following hold:
 * - the user passed `--yes`/`-y` (accept defaults) or `--non-interactive` (strict)
 * - the user asked for machine output (`--json`) — prompting would corrupt that
 *   output, so we never prompt in that mode
 * - stdin is not a TTY (e.g. CI, an AI agent, or a piped invocation)
 *
 * In non-interactive mode we never block on a prompt. Instead we use the value
 * from a flag if provided, fall back to a safe default when one exists, or fail
 * fast with an actionable error telling the caller which flag to pass.
 */
export function isNonInteractive(): boolean {
  return flagYes || flagNonInteractive || flagJson || !process.stdin.isTTY
}

/**
 * Strict mode (`--non-interactive`): never fall back to a default. Every value
 * must come from a flag, or the command fails telling you which flag is missing.
 * Plain `--yes` / a non-TTY stay lenient and accept the safe defaults.
 */
export function isStrict(): boolean {
  return flagNonInteractive
}

/**
 * Thrown when a value is required but cannot be obtained without prompting.
 * The message is written for a human or agent reading CLI output, so it should
 * name the flag (or env var) that would unblock the command.
 */
export class NonInteractiveError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NonInteractiveError"
  }
}

type Question = prompts.PromptObject<string>

function resolveDefault(question: Question): unknown {
  switch (question.type) {
    case "confirm":
      return question.initial ?? false
    case "text":
    case "password":
    case "invisible":
      return typeof question.initial === "string" ? question.initial : undefined
    case "select":
    case "autocomplete": {
      const choices = question.choices as prompts.Choice[] | undefined
      if (!choices || choices.length === 0) {
        return undefined
      }
      const initial = typeof question.initial === "number" ? question.initial : 0
      return choices[initial]?.value
    }
    default:
      return question.initial
  }
}

export interface AskOptions {
  /**
   * Value supplied via a CLI flag. When defined it is used directly and no
   * prompt is shown (in interactive or non-interactive mode).
   */
  override?: unknown
  /**
   * When true, the question has no safe default: in non-interactive mode we
   * throw instead of guessing. Use this for choices where picking wrong is
   * costly (which project, which framework, the project name).
   */
  required?: boolean
  /**
   * Error message shown in non-interactive mode when no override/default is
   * available. Should tell the caller which flag or env var to provide.
   */
  requiredHint?: string
}

/**
 * Run a question's own `validate` (and `format`) against a value the same way an
 * interactive answer would be checked, so a bad flag value or default fails with
 * the question's error message instead of silently flowing downstream.
 * The prompts callable types take extra (values, prompt) args we don't pass.
 */
async function validateAndFormat<T>(question: Question, value: unknown, fallbackMessage: string): Promise<T> {
  const validate = question.validate as ((value: unknown) => boolean | string | Promise<boolean | string>) | undefined
  if (typeof validate === "function") {
    const validation = await validate(value)
    if (validation !== true) {
      throw new NonInteractiveError(typeof validation === "string" ? validation : fallbackMessage)
    }
  }

  const format = question.format as ((value: unknown) => unknown) | undefined
  if (typeof format === "function") {
    return (await format(value)) as T
  }
  return value as T
}

/**
 * Ask a single `prompts` question, honoring non-interactive mode.
 *
 * Resolution order:
 * 1. an explicit `override` (from a flag) is validated/normalized the same way an
 *    interactive answer would be, then used
 * 2. in non-interactive mode, the question's default is used and validated —
 *    unless `required`, or strict mode (`--non-interactive`), in which case a
 *    missing value fails fast with an actionable hint
 * 3. otherwise the user is prompted interactively
 *
 * Returns the answer value directly (not the `{ [name]: value }` wrapper).
 */
export async function ask<T = unknown>(question: Question, options: AskOptions = {}): Promise<T> {
  const name = question.name as string
  const invalidMessage = options.requiredHint ?? `Invalid value for "${name}".`

  if (options.override !== undefined) {
    return validateAndFormat<T>(question, options.override, invalidMessage)
  }

  if (isNonInteractive()) {
    const fallback = options.required || isStrict() ? undefined : resolveDefault(question)

    if (fallback === undefined) {
      throw new NonInteractiveError(
        options.requiredHint ??
          `"${name}" is required, but no value was provided and the terminal is non-interactive. ` +
            `Pass the corresponding flag, or run in an interactive terminal.`,
      )
    }

    return validateAndFormat<T>(question, fallback, invalidMessage)
  }

  const answers = await prompts({ ...question, onState: abortOnState })
  return answers[name] as T
}
