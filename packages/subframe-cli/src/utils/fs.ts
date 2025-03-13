import { mkdir, stat } from "node:fs/promises"

// NOTE: must be used for joining paths that will be used in JavaScript code.
// This is because different OSes use different path separators e.g. Windows uses backslashes,
// and JavaScript only supports forward slashes.
export { join as posixJoin } from "node:path/posix"

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
