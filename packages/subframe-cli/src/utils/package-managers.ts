import { detect } from "@antfu/ni"
import { execa } from "execa"
import { readFile } from "node:fs/promises"

export type PackageManager = "yarn" | "pnpm" | "npm" | "bun"

export async function getInstalledPackageVersion(packageName: string, cwd: string): Promise<string | null> {
  try {
    const packageJSON: {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    } = JSON.parse(await readFile(`${cwd}/package.json`, "utf-8"))

    if (packageJSON.dependencies?.[packageName]) {
      return packageJSON.dependencies[packageName]
    }

    if (packageJSON.devDependencies?.[packageName]) {
      return packageJSON.devDependencies[packageName]
    }

    return null
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

export function getInstallPackagesCommand(packageManager: PackageManager, packageSpecifiers: string[]): string[] {
  switch (packageManager) {
    case "yarn":
      return ["yarn", "add", ...packageSpecifiers]
    case "bun":
      return ["bun", "add", ...packageSpecifiers]
    case "pnpm":
      return ["pnpm", "add", ...packageSpecifiers]
    case "npm":
    default:
      return ["npm", "install", ...packageSpecifiers]
  }
}

export function getInstallCommand(packageManager: PackageManager): string[] {
  switch (packageManager) {
    case "yarn":
      return ["yarn"]
    case "bun":
      return ["bun", "install"]
    case "pnpm":
      return ["pnpm", "install"]
    case "npm":
    default:
      return ["npm", "install"]
  }
}

export function getRunDevCommand(packageManager: PackageManager): string[] {
  switch (packageManager) {
    case "yarn":
      return ["yarn", "dev"]
    case "bun":
      return ["bun", "dev"]
    case "pnpm":
      return ["pnpm", "dev"]
    case "npm":
    default:
      return ["npm", "run", "dev"]
  }
}
