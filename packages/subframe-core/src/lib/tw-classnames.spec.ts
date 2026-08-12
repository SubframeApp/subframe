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

  // A font mixin (`text-heading-2`, `text-label`, …) is a single class that bundles
  // font-size + line-height + font-weight + letter-spacing. tailwind-merge cannot
  // partially override a bundled class, so the merge rules are:
  //   - font-size and a mixin are mutually exclusive (changing the size swaps the token)
  //   - an explicit font-weight/leading/tracking after a mixin overrides only that
  //     property and keeps the mixin (the single-property utility wins via the cascade)
  //   - a mixin after explicit utilities replaces them all (it is a complete unit)
  //   - mixins are independent of font-family and text color
  describe("font mixins", () => {
    describe("vs font-size (mutually exclusive)", () => {
      it("a trailing font-size replaces the mixin", () => {
        expect(twClassNames("text-heading-2", "text-[24px]")).toBe("text-[24px]")
      })

      it("a trailing mixin replaces the font-size", () => {
        expect(twClassNames("text-[24px]", "text-heading-2")).toBe("text-heading-2")
      })
    })

    describe("vs font-weight (override keeps the mixin)", () => {
      it("a trailing arbitrary font-weight overrides only the weight", () => {
        expect(twClassNames("text-heading-2", "font-[400]")).toBe("text-heading-2 font-[400]")
      })

      it("a trailing named font-weight overrides only the weight", () => {
        expect(twClassNames("text-heading-2", "font-bold")).toBe("text-heading-2 font-bold")
      })

      it("a trailing mixin replaces the font-weight", () => {
        expect(twClassNames("font-[400]", "text-heading-2")).toBe("text-heading-2")
        expect(twClassNames("font-bold", "text-heading-2")).toBe("text-heading-2")
      })

      it("multiple font-weights still collapse while the mixin is retained", () => {
        expect(twClassNames("text-heading-2 font-[400]", "font-[700]")).toBe("text-heading-2 font-[700]")
      })
    })

    describe("vs leading (override keeps the mixin)", () => {
      it("a trailing leading overrides only the line-height", () => {
        expect(twClassNames("text-heading-2", "leading-[40px]")).toBe("text-heading-2 leading-[40px]")
      })

      it("a trailing mixin replaces the leading", () => {
        expect(twClassNames("leading-[40px]", "text-heading-2")).toBe("text-heading-2")
      })

      it("multiple leadings still collapse while the mixin is retained", () => {
        expect(twClassNames("text-heading-2 leading-[16px]", "leading-[40px]")).toBe("text-heading-2 leading-[40px]")
      })
    })

    describe("vs tracking / letter-spacing (override keeps the mixin)", () => {
      it("a trailing arbitrary tracking overrides only the letter-spacing", () => {
        expect(twClassNames("text-heading-2", "tracking-[2px]")).toBe("text-heading-2 tracking-[2px]")
      })

      it("a trailing named tracking overrides only the letter-spacing", () => {
        expect(twClassNames("text-heading-2", "tracking-wide")).toBe("text-heading-2 tracking-wide")
      })

      it("a trailing mixin replaces the tracking", () => {
        expect(twClassNames("tracking-[2px]", "text-heading-2")).toBe("text-heading-2")
        expect(twClassNames("tracking-wide", "text-heading-2")).toBe("text-heading-2")
      })

      it("multiple trackings still collapse while the mixin is retained", () => {
        expect(twClassNames("text-heading-2 tracking-[1px]", "tracking-[2px]")).toBe("text-heading-2 tracking-[2px]")
      })
    })

    describe("vs font-family (independent)", () => {
      it("keeps both regardless of order", () => {
        expect(twClassNames("text-heading-2", "font-heading-2")).toBe("text-heading-2 font-heading-2")
        expect(twClassNames("font-heading-2", "text-heading-2")).toBe("font-heading-2 text-heading-2")
        expect(twClassNames("text-heading-2", "font-sans")).toBe("text-heading-2 font-sans")
      })

      it("an arbitrary font-weight does not disturb the font-family", () => {
        expect(twClassNames("font-heading-2", "font-[400]")).toBe("font-heading-2 font-[400]")
      })
    })

    describe("vs text color (independent)", () => {
      it("keeps both regardless of order", () => {
        expect(twClassNames("text-heading-2", "text-default-font")).toBe("text-heading-2 text-default-font")
        expect(twClassNames("text-default-font", "text-heading-2")).toBe("text-default-font text-heading-2")
        expect(twClassNames("text-label", "text-brand-300")).toBe("text-label text-brand-300")
        expect(twClassNames("text-brand-300", "text-label")).toBe("text-brand-300 text-label")
      })
    })

    describe("vs another mixin (last wins)", () => {
      it("collapses to the trailing mixin", () => {
        expect(twClassNames("text-heading-2", "text-body")).toBe("text-body")
        expect(twClassNames("text-body", "text-heading-2")).toBe("text-heading-2")
      })
    })

    describe("with combined overrides", () => {
      it("any font-size in the override replaces the whole mixin", () => {
        expect(twClassNames("text-heading-2", "text-[24px] font-[400] leading-[16px]")).toBe(
          "text-[24px] font-[400] leading-[16px]",
        )
        expect(twClassNames("text-label", "text-[24px] font-[500] leading-[38px]")).toBe(
          "text-[24px] font-[500] leading-[38px]",
        )
      })

      it("weight + leading overrides without a font-size keep the mixin", () => {
        expect(twClassNames("text-heading-2", "font-[400] leading-[16px]")).toBe(
          "text-heading-2 font-[400] leading-[16px]",
        )
      })

      it("a mixin applied last replaces explicit size/weight/leading", () => {
        expect(twClassNames("text-[24px] font-medium leading-[38px]", "text-label")).toBe("text-label")
      })

      it("two fully-explicit typography sets collapse normally", () => {
        expect(twClassNames("text-[24px] font-[500] leading-[38px]", "text-[14px] font-[400] leading-[16px]")).toBe(
          "text-[14px] font-[400] leading-[16px]",
        )
      })
    })

    describe("full element class strings", () => {
      it("overriding only the weight keeps the heading typography plus family and color", () => {
        expect(twClassNames("text-heading-2 font-heading-2 text-default-font", "font-[400]")).toBe(
          "text-heading-2 font-heading-2 text-default-font font-[400]",
        )
      })

      it("overriding the size drops the mixin but keeps family and color", () => {
        expect(twClassNames("text-heading-2 font-heading-2 text-default-font", "text-[24px]")).toBe(
          "font-heading-2 text-default-font text-[24px]",
        )
      })
    })
  })
})
