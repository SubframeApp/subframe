import { readFile, stat } from "node:fs/promises"
import type { DesignSystemImportPayload, DesignSystemImportPayloadSource } from "shared/types"

const FILE_SIZE_LIMIT = 512 * 1024 // 512KB

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string")
}

// TODO: this is a hack, we should probably use zod to validate the manifest
function parseManifest(raw: unknown) {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Manifest must be a JSON object")
  }

  const m = raw as Record<string, unknown>

  if (!isStringArray(m.theme)) {
    throw new Error("Manifest 'theme' must be an array of file paths")
  }

  if (!Array.isArray(m.components)) {
    throw new Error("Manifest 'components' must be an array")
  }

  const components: Array<{ name: string; sources: string[] }> = []
  for (const c of m.components) {
    if (typeof c !== "object" || c === null) {
      throw new Error("Each component must be an object")
    }
    const comp = c as Record<string, unknown>
    if (typeof comp.name !== "string" || !comp.name) {
      throw new Error("Each component must have a non-empty 'name'")
    }
    if (!isStringArray(comp.sources)) {
      throw new Error(`Component '${comp.name}' must have a 'sources' array of file paths`)
    }
    components.push({ name: comp.name, sources: comp.sources })
  }

  return { theme: m.theme, components }
}

async function resolveSource(filePath: string): Promise<DesignSystemImportPayloadSource> {
  const fileStat = await stat(filePath)

  if (fileStat.size > FILE_SIZE_LIMIT) {
    throw new Error(`File '${filePath}' exceeds size limit of 512KB (${fileStat.size} bytes)`)
  }

  const content = await readFile(filePath, "utf8")

  return { path: filePath, content }
}

export async function resolveManifest(raw: unknown): Promise<DesignSystemImportPayload> {
  const manifest = parseManifest(raw)

  const theme = await Promise.all(manifest.theme.map(resolveSource))

  const components = await Promise.all(
    manifest.components.map(async (component) => ({
      name: component.name,
      sources: await Promise.all(component.sources.map(resolveSource)),
    })),
  )

  return { theme, components }
}
