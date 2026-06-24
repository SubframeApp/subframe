import { createServer, Server } from "node:http"

/**
 * A tiny mock of the Subframe CLI backend (`/api/cli/*`). The CLI points at it
 * via `--dev` (which sets BASE_URL to http://localhost:6501).
 *
 * Tests can inspect `calls` to assert which requests were made, and override any
 * route via `routes["POST /api/cli/sync"] = (body) => ({ status, json })` to
 * simulate errors or alternate responses.
 */
export interface RecordedCall {
  method: string
  path: string
  body: unknown
  auth?: string
}

type RouteHandler = (body: unknown) => { status?: number; json: unknown }

export interface MockServer {
  server: Server
  port: number
  calls: RecordedCall[]
  routes: Record<string, RouteHandler>
  reset(): void
  close(): Promise<void>
}

function codeFile(fileName: string, contents: string) {
  return {
    fileType: fileName.endsWith(".css") ? "css" : "tsx",
    fileName,
    directory: "",
    metadata: {},
    contents,
  }
}

const PROJECT_INFO = { teamId: 1, truncatedProjectId: "proj_1", name: "Test Project" }

// Sensible defaults that let a normal init/sync flow succeed.
// Built once the server's actual (ephemeral) port is known, so the import flow's
// presigned upload URL points back at this same server (mock S3).
function makeDefaultRoutes(baseUrl: string): Record<string, RouteHandler> {
  return {
    "GET /api/cli/verify": () => ({ json: { success: true, userId: "user_1", teamId: 1 } }),
    "GET /api/cli/list-projects": () => ({
      json: { projects: [{ truncatedProjectId: "proj_1", name: "Test Project" }] },
    }),
    "POST /api/cli/init": () => ({
      json: {
        styleFile: codeFile("ui-styles.css", "/* subframe styles */\n"),
        cssType: "tailwind",
        oldImportAlias: "@/ui",
        projectInfo: PROJECT_INFO,
      },
    }),
    "POST /api/cli/sync": () => ({
      json: {
        definitionFiles: [],
        otherFiles: [codeFile("Button.tsx", "export const Button = () => null\n")],
        missingComponents: [],
        projectInfo: PROJECT_INFO,
      },
    }),
    "POST /api/cli/import-alias": () => ({ json: { success: true } }),
    "POST /api/cli/push-component": (body) => ({
      json: { success: true, componentName: (body as { componentName?: string })?.componentName ?? "Component" },
    }),
    "POST /api/cli/import/create-session": () => ({
      json: { sessionId: "session_1", presignedUrl: `${baseUrl}/mock-s3-upload` },
    }),
    "PUT /mock-s3-upload": () => ({ json: {} }),
    "POST /api/cli/import/start": () => ({ json: { success: true } }),
  }
}

// Defaults to an ephemeral port (0 → the OS assigns a free one) so the suite
// never collides with a real dev server (e.g. a local backend on 6501).
export async function startMockServer(port = 0): Promise<MockServer> {
  const calls: RecordedCall[] = []
  const routes: Record<string, RouteHandler> = {}
  // Assigned once the server is listening and its base URL is known.
  let defaults: Record<string, RouteHandler> = {}

  const server = createServer((req, res) => {
    const chunks: Buffer[] = []
    req.on("data", (c) => chunks.push(c as Buffer))
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8")
      let body: unknown
      try {
        body = raw ? JSON.parse(raw) : undefined
      } catch {
        body = raw
      }

      const path = (req.url ?? "").split("?")[0]
      const key = `${req.method} ${path}`
      calls.push({ method: req.method ?? "", path, body, auth: req.headers.authorization })

      const handler = routes[key] ?? defaults[key]
      if (!handler) {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: `No mock route for ${key}` }))
        return
      }

      const { status = 200, json } = handler(body)
      res.writeHead(status, { "Content-Type": "application/json" })
      res.end(JSON.stringify(json))
    })
  })

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject)
    server.listen(port, "127.0.0.1", resolve)
  })

  const address = server.address()
  const actualPort = typeof address === "object" && address ? address.port : port
  defaults = makeDefaultRoutes(`http://127.0.0.1:${actualPort}`)

  return {
    server,
    port: actualPort,
    calls,
    routes,
    reset() {
      calls.length = 0
      for (const key of Object.keys(routes)) {
        delete routes[key]
      }
    },
    close() {
      return new Promise<void>((resolve) => server.close(() => resolve()))
    },
  }
}
