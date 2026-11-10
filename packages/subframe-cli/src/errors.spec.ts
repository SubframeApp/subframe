import { describe, expect, it } from "vitest"
import { toUserErrorIfPermissionDenied, UserError } from "./errors"

function fsError(code: string, path: string): NodeJS.ErrnoException {
  return Object.assign(new Error(`${code}: operation not permitted, open '${path}'`), { code, path })
}

describe("toUserErrorIfPermissionDenied", () => {
  it("names the path and the macOS privacy setting for EPERM on darwin", () => {
    const err = toUserErrorIfPermissionDenied(fsError("EPERM", "/Users/a/Desktop/app/package.json"), "darwin")
    expect(err).toBeInstanceOf(UserError)
    expect((err as Error).message).toBe(
      "Permission denied (EPERM) for /Users/a/Desktop/app/package.json. Give your terminal app access in System Settings > Privacy & Security > Files and Folders (or Full Disk Access), or run the command from a folder you own.",
    )
  })

  it("does not point Windows users at macOS settings for EACCES", () => {
    const err = toUserErrorIfPermissionDenied(fsError("EACCES", "C:\\app\\.subframe\\sync.json"), "win32")
    expect(err).toBeInstanceOf(UserError)
    expect((err as Error).message).toBe(
      "Permission denied (EACCES) for C:\\app\\.subframe\\sync.json. Check that you have permission to read and write there, or run the command from a folder you own.",
    )
  })

  it("names both paths when a rename fails", () => {
    const rename = Object.assign(fsError("EACCES", "/p/a.tsx"), { dest: "/p/ui/a.tsx" })
    const err = toUserErrorIfPermissionDenied(rename, "linux")
    expect((err as Error).message).toMatch(/^Permission denied \(EACCES\) for \/p\/a\.tsx -> \/p\/ui\/a\.tsx\. /)
  })

  it("leaves other errors untouched so they are still reported", () => {
    const enoent = fsError("ENOENT", "/x")
    expect(toUserErrorIfPermissionDenied(enoent, "darwin")).toBe(enoent)
    const plain = new Error("boom")
    expect(toUserErrorIfPermissionDenied(plain, "darwin")).toBe(plain)
  })
})
