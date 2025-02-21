import { detect } from "@antfu/ni"
import { execa } from "execa"
import { readFile } from "fs/promises"

type PackageManager = "yarn" | "pnpm" | "npm" | "bun"

export async function getInstalledPackageVersion(packageName: string, cwd: string): Promise<string | null> {
  try {
    const packageJSON: { dependencies: Record<string, string> } = await readFile(`${cwd}/package.json`, "utf-8").then(
      JSON.parse,
    )

    if (!packageJSON.dependencies) {
      return null
    }

    if (!packageJSON.dependencies[packageName]) {
      return null
    }

    return packageJSON.dependencies[packageName]
  } catch (e) {
    return null
  }
}

export async function getPackageManager(cwd: string): Promise<PackageManager> {
  const packageManager = await detect({ programmatic: true, cwd: cwd })

  switch (packageManager) {
    case "yarn":
    case "yarn@berry":
      return "yarn"
    case "pnpm":
    case "pnpm@6":
      return "pnpm"
    case "bun":
      return "bun"
    case "npm":
    default:
      return "npm"
  }
}

export async function getLatestPackageVersion(packageName: string) {
  return execa("curl", [`https://registry.npmjs.org/${packageName}/latest`])
    .then((result) => result.stdout)
    .then((result) => JSON.parse(result))
    .then((result) => result.version)
}

export function makePackageSpecifier(packageName: string, packageVersion: string) {
  return `${packageName}@${packageVersion}`
}
