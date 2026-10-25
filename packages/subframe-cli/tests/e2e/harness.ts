import { execa } from "execa"
import { mkdtempSync, writeFileSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { afterAll, afterEach, beforeAll } from "vitest"
import { MockServer, startMockServer } from "./mock-server"

// Base URL of the mock server for the current test file, set by setupMockServer
// and consumed by runCli (via SUBFRAME_BASE_URL). Lets each file use an ephemeral
// port instead of a hardcoded one, so the suite never collides with a real dev
// server on 6501.
let activeBaseUrl: string | undefined

/** Token the mock backend accepts by default (see mock-server defaultRoutes). */
export const TOKEN = "test-token"

/** A typical .subframe/sync.json for an already-initialized project. */
export const PROJECT_SETTINGS = {
  projectId: "proj_1",
  directory: "./src",
  importAlias: "@/ui/*",
  teamId: 1,
  cssType: "tailwind",
}

// The real CLI entrypoint (the published bin), so we exercise argv parsing,
// TTY detection, process.exit codes, and stdout/stderr exactly as a user would.
const CLI_BIN = resolve(__dirname, "../../bin/main-sync.js")

/**
 * A fake `curl` placed first on PATH so `getLatestPackageVersion` (which shells
 * out to `curl https://registry.npmjs.org/...`) resolves offline and the suite
 * stays hermetic. It always reports version 1.0.0.
 */
let fakeBinDir: string | undefined
function fakeCurlDir(): string {
  if (!fakeBinDir) {
    fakeBinDir = mkdtempSync(join(tmpdir(), "subframe-cli-bin-"))
    const curlPath = join(fakeBinDir, "curl")
    writeFileSync(curlPath, `#!/bin/sh\necho '{"version":"1.0.0"}'\n`, { mode: 0o755 })
  }
  return fakeBinDir
}

export interface CliResult {
  exitCode: number
  stdout: string
  stderr: string
  /** Parsed stdout when --json was used (throws if stdout isn't valid JSON). */
  json(): unknown
  timedOut: boolean
  /** The isolated HOME the run used (pass it back via RunOptions.home to reuse the token cache). */
  home: string
}

export interface RunOptions {
  cwd: string
  /** Value for SUBFRAME_AUTH_TOKEN; omit to simulate having no credentials. */
  token?: string
  /** Reuse a specific HOME (e.g. to test the cached-token path across two runs). */
  home?: string
  /** Extra env vars. */
  env?: Record<string, string>
}

/**
 * Register a mock server for the current test file (shared across its tests,
 * reset between them) on an ephemeral port. runCli points the CLI at it via
 * SUBFRAME_BASE_URL.
 */
export function setupMockServer(): () => MockServer {
  let mock: MockServer
  beforeAll(async () => {
    mock = await startMockServer()
    activeBaseUrl = `http://127.0.0.1:${mock.port}`
  })
  afterAll(async () => {
    await mock.close()
    activeBaseUrl = undefined
  })
  afterEach(() => {
    mock.reset()
  })
  return () => mock
}

/** A fresh isolated HOME directory. */
export function makeHome(): string {
  return mkdtempSync(join(tmpdir(), "subframe-cli-home-"))
}

/**
 * Run the CLI as a subprocess (always against the --dev backend at
 * localhost:6501) with an isolated home dir, a non-TTY stdin, and a hard
 * timeout so a regression that reintroduces a blocking prompt fails loudly
 * instead of hanging the suite.
 */
export async function runCli(args: string[], options: RunOptions): Promise<CliResult> {
  const home = options.home ?? makeHome()

  const env: Record<string, string> = {
    HOME: home,
    XDG_DATA_HOME: join(home, ".local", "share"),
    // eslint-disable-next-line turbo/no-undeclared-env-vars -- test helper, not a turbo-cached input
    PATH: `${fakeCurlDir()}:${process.env.PATH ?? ""}`,
    // Make sure nothing routes our localhost calls through a proxy.
    HTTP_PROXY: "",
    HTTPS_PROXY: "",
    NO_PROXY: "*",
    // Point the CLI at this file's mock server (ephemeral port), overriding --dev's
    // hardcoded localhost:6501 so we never collide with a real dev server.
    ...(activeBaseUrl ? { SUBFRAME_BASE_URL: activeBaseUrl } : {}),
    ...(options.token ? { SUBFRAME_AUTH_TOKEN: options.token } : {}),
    ...options.env,
  }

  const result = await execa("node", [CLI_BIN, ...args, "--dev"], {
    cwd: options.cwd,
    env,
    extendEnv: true,
    reject: false,
    stdin: "ignore", // non-TTY: prompts must not block
    timeout: 20_000,
  })

  return {
    exitCode: result.exitCode ?? 1,
    stdout: result.stdout,
    stderr: result.stderr,
    timedOut: result.timedOut === true,
    home,
    json() {
      return JSON.parse(result.stdout)
    },
  }
}

/** Write a file (creating parent dirs) relative to `dir`. */
export async function writeProjectFile(dir: string, relativePath: string, contents: string): Promise<string> {
  const abs = join(dir, relativePath)
  await mkdir(dirname(abs), { recursive: true })
  await writeFile(abs, contents)
  return abs
}

/** Create a temp project directory and return its absolute path. */
export function makeProjectDir(): string {
  return mkdtempSync(join(tmpdir(), "subframe-cli-proj-"))
}

export interface ScaffoldOptions {
  /** Dependencies to list in package.json (e.g. tailwindcss, @subframe/core). */
  dependencies?: Record<string, string>
  /**
   * Version to pin @subframe/core at. Defaults to a very high version so the
   * dependency check finds nothing to install. Pass `null` to omit it entirely
   * (so the install step actually has work to do, e.g. to exercise that prompt).
   */
  coreVersion?: string | null
  /** When set, writes .subframe/sync.json with these settings. */
  syncSettings?: Record<string, unknown>
  /** Subdirectories to create (e.g. ["src"]). */
  dirs?: string[]
}

/** Write a minimal project (package.json + optional .subframe/sync.json) into `dir`. */
export async function scaffoldProject(dir: string, options: ScaffoldOptions = {}): Promise<void> {
  const coreVersion = options.coreVersion === undefined ? "999.0.0" : options.coreVersion
  // @subframe/core at a high version + the fake curl reporting 1.0.0 means
  // installDependencies finds nothing to install and never shells out.
  const dependencies = {
    ...(coreVersion === null ? {} : { "@subframe/core": coreVersion }),
    ...options.dependencies,
  }

  await writeFile(
    join(dir, "package.json"),
    JSON.stringify({ name: "test-project", version: "0.0.0", dependencies }, null, 2),
  )

  for (const sub of options.dirs ?? []) {
    await mkdir(join(dir, sub), { recursive: true })
  }

  if (options.syncSettings) {
    await mkdir(join(dir, ".subframe"), { recursive: true })
    await writeFile(join(dir, ".subframe", "sync.json"), JSON.stringify(options.syncSettings, null, 2))
  }
}
