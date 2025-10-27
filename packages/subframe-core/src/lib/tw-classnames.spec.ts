import { describe, expect, it } from "vitest"
import { createTwClassNames } from "./tw-classnames"

const SUBFRAME_FONT_MIXINS = [
  // old font mixins
  "text-label",
  "text-label-bold",
  "text-body",
  "text-body-bold",
  "text-subheader",
  "text-section-header",
  "text-header",
  "text-monospace-body",

  // new font mixins
  "text-caption",
  "text-caption-bold",
  "text-heading-3",
  "text-heading-2",
  "text-heading-1",
]

const twClassNames = createTwClassNames(SUBFRAME_FONT_MIXINS)

describe("twClassNames", () => {
  describe("color related", () => {
    it("should override font colors", () => {
      expect(twClassNames("text-gray-300", "text-brand-300")).toBe("text-brand-300")
      expect(twClassNames("text-brand-300", "text-gray-300")).toBe("text-gray-300")
    })

    it("should override hard-coded font colors", () => {
      expect(twClassNames("text-gray-300", "text-neutral-border")).toBe("text-neutral-border")
      expect(twClassNames("text-neutral-border", "text-gray-300")).toBe("text-gray-300")
    })

    it("should override background colors", () => {
      expect(twClassNames("bg-gray-300", "bg-brand-300")).toBe("bg-brand-300")
      expect(twClassNames("bg-brand-300", "bg-gray-300")).toBe("bg-gray-300")
    })
  })

  describe("spacing", () => {
    it("should override custom spacing", () => {
      expect(twClassNames("pt-4", "pt-192")).toBe("pt-192")
    })

    it("should allow axis padding utilities to override directional padding", () => {
      expect(twClassNames("pr-1", "px-0")).toBe("px-0")
      expect(twClassNames("px-3", "p-2")).toBe("p-2")
    })
  })

  describe("font mixins", () => {
    it("should override font sizes", () => {
      expect(twClassNames("text-label", "text-[24px] font-[500] leading-[38px]")).toBe(
        "text-[24px] font-[500] leading-[38px]",
      )
      expect(twClassNames("text-[24px] font-medium leading-[38px]", "text-label")).toBe("text-label")
      expect(twClassNames("text-[24px] font-[500] leading-[38px]", "text-[14px] font-[400] leading-[16px]")).toBe(
        "text-[14px] font-[400] leading-[16px]",
      )
    })
  })

  describe("interactions between font mixins and colors", () => {
    it("should not override any colors and vice-versa", () => {
      expect(twClassNames("text-label", "text-brand-300")).toBe("text-label text-brand-300")
      expect(twClassNames("text-brand-300", "text-label")).toBe("text-brand-300 text-label")
    })
  })
})
