import { mkdir, stat } from "node:fs/promises"

export async function exists(path: string): Promise<boolean> {
  const pathStat = await stat(path).catch(() => null)
  if (!pathStat) {
    return false
  }
  return true
}

export async function isDirectory(path: string): Promise<boolean> {
  const pathStat = await stat(path).catch(() => null)
  if (!pathStat) {
    return false
  }
  return pathStat.isDirectory()
}

export async function mkdirIfNotExist(path: string): Promise<void> {
  if (!(await isDirectory(path))) {
    await mkdir(path, { recursive: true })
  }
}
