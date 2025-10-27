import classNames from "classnames"
import { createTailwindMerge, getDefaultConfig } from "tailwind-merge"

export function createTwClassNames(subframeFontMixins: string[]) {
  const customTWMerge = createTailwindMerge(() => {
    const defaultConfig = getDefaultConfig()

    return {
      ...defaultConfig,
      classGroups: {
        ...defaultConfig.classGroups,
        // "subframe-colors": [{ text: [isTextColor] }],
        "subframe-font-mixins": subframeFontMixins,
        // "font-size": [{ text: [isFontStyle] }, ...defaultConfig.classGroups["font-size"]],
        // leading: [{ text: [isFontStyle] }, ...defaultConfig.classGroups.leading],
        // "font-weight": [{ text: [isFontStyle] }, ...defaultConfig.classGroups["font-weight"]],
      },
      conflictingClassGroups: {
        ...defaultConfig.conflictingClassGroups,
        // font colors
        // "text-color": ["subframe-colors"],

        // font mixins
        "subframe-font-mixins": ["font-size", "leading", "font-weight"],
        "font-size": ["subframe-font-mixins"],
        leading: ["subframe-font-mixins"],
        "font-weight": ["subframe-font-mixins"],
      },
    }
  })

  return (...args: Parameters<typeof classNames>) => customTWMerge(classNames(...args))
}

// TODO: Remove. Going forward this is generated into a utils.ts file.
export const twClassNames = createTwClassNames([
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
])
