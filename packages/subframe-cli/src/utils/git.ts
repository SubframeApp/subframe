import { execa } from "execa"
import { rm } from "node:fs/promises"
import { join } from "node:path"

async function isInGitRepository(cwd: string): Promise<boolean> {
  try {
    await execa("git", ["rev-parse", "--is-inside-work-tree"], { cwd })
    return true
  } catch (_) {}
  return false
}

async function isInMercurialRepository(cwd: string): Promise<boolean> {
  try {
    await execa("hg", ["--cwd", ".", "root"], { cwd })
    return true
  } catch (_) {}
  return false
}

async function isDefaultBranchSet(cwd: string): Promise<boolean> {
  try {
    await execa("git config init.defaultBranch", { cwd })
    return true
  } catch (_) {}
  return false
}

// Adapted from create-next-app
// https://github.com/vercel/next.js/blob/0cac089867b4465690385c2d48f5f3df5c5e000a/packages/create-next-app/helpers/git.ts#L30
export async function tryGitInit(cwd: string): Promise<boolean> {
  let didInit = false
  try {
    await execa("git", ["--version"], { cwd })
    const [inGit, inHg] = await Promise.all([isInGitRepository(cwd), isInMercurialRepository(cwd)])
    if (inGit || inHg) {
      return false
    }

    await execa("git", ["init"], { cwd })
    didInit = true

    if (!isDefaultBranchSet(cwd)) {
      await execa("git", ["checkout", "-b", "main"], { cwd })
    }

    await execa("git", ["add", "-A"], { cwd })
    await execa("git", ["commit", "-m", "Initial commit from Subframe init"], { cwd })

    return true
  } catch (e) {
    if (didInit) {
      try {
        await rm(join(cwd, ".git"), { recursive: true, force: true })
      } catch (_) {}
    }
    return false
  }
}
