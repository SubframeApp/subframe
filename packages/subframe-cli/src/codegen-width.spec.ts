import { describe, expect, it } from "vitest"

/**
 * Component definition types for testing codegen behavior.
 * These types represent the structure of Subframe component JSON.
 */
interface SizeWidth {
  type: "hug" | "fill" | "fixed"
  maxSize?: number
}

interface NodeSize {
  height: { type: string }
  width: SizeWidth
}

interface NodeOverride {
  category: "override"
  type: string
  data: {
    size?: NodeSize
  }
}

interface SelectorOverrides {
  [nodeId: string]: NodeOverride
}

interface SelectorState {
  [selectorId: string]: {
    category: "selector"
    id: string
    instanceProps: Record<string, unknown>
    overrides: {
      default: SelectorOverrides
    }
  }
}

interface ComponentSelectors {
  default: {
    base: SelectorState
  }
  mobile?: {
    base: SelectorState
  }
}

interface ComponentNode {
  id: string
  size: NodeSize
  [key: string]: unknown
}

interface ComponentDefinition {
  id: string
  name: string
  nodes: Record<string, ComponentNode>
  rootNodeId: string
  selectors: ComponentSelectors
}

/**
 * Extracts the width configuration for a node in a specific breakpoint.
 * For the default breakpoint, returns the node's size.width.
 * For mobile, returns the override if present, otherwise the default.
 */
function getNodeWidthConfig(
  component: ComponentDefinition,
  nodeId: string,
  breakpoint: "default" | "mobile",
): SizeWidth | undefined {
  const node = component.nodes[nodeId]
  if (!node) return undefined

  if (breakpoint === "default") {
    return node.size?.width
  }

  // For mobile, check if there's an override
  const mobileSelectors = component.selectors.mobile?.base
  if (!mobileSelectors) return undefined

  for (const selectorState of Object.values(mobileSelectors)) {
    const override = selectorState.overrides.default[nodeId]
    if (override?.data?.size?.width) {
      return override.data.size.width
    }
  }

  return undefined
}

/**
 * Determines if a mobile override explicitly removes the maxSize.
 * This happens when the default has maxSize but the mobile override doesn't.
 */
function mobileRemovesMaxWidth(
  component: ComponentDefinition,
  nodeId: string,
): boolean {
  const defaultWidth = getNodeWidthConfig(component, nodeId, "default")
  const mobileWidth = getNodeWidthConfig(component, nodeId, "mobile")

  // If default has maxSize and mobile override exists but doesn't have maxSize,
  // then mobile is explicitly removing the max-width
  if (defaultWidth?.maxSize !== undefined && mobileWidth !== undefined) {
    return mobileWidth.maxSize === undefined
  }

  return false
}

/**
 * Generates the Tailwind class for max-width.
 * Returns null if no max-width should be applied.
 */
function generateMaxWidthClass(maxSize: number | undefined): string | null {
  if (maxSize === undefined) return null
  return `max-w-[${maxSize}px]`
}

/**
 * Generates the mobile override class when max-width is removed.
 * Should return "mobile:max-w-none" when the mobile override removes maxSize.
 */
function generateMobileMaxWidthOverrideClass(
  component: ComponentDefinition,
  nodeId: string,
): string | null {
  if (mobileRemovesMaxWidth(component, nodeId)) {
    return "mobile:max-w-none"
  }
  return null
}

// Sample component JSON from the issue
const SAMPLE_COMPONENT: ComponentDefinition = {
  id: "68097d83-a887-40c6-b175-e2da46f7e4ed",
  name: "Custom Component",
  nodes: {
    "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b": {
      id: "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b",
      name: "Stack",
      type: "stack",
      category: "primitive",
      childrenIds: [],
      size: {
        height: { type: "hug" },
        width: { maxSize: 28, type: "hug" },
      },
    },
  },
  rootNodeId: "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b",
  selectors: {
    default: {
      base: {
        "8dd5fc5a-f5e0-4ee1-b740-78071a014e8e": {
          category: "selector",
          id: "8dd5fc5a-f5e0-4ee1-b740-78071a014e8e",
          instanceProps: {},
          overrides: {
            default: {},
          },
        },
      },
    },
    mobile: {
      base: {
        "8dd5fc5a-f5e0-4ee1-b740-78071a014e8e": {
          category: "selector",
          id: "8dd5fc5a-f5e0-4ee1-b740-78071a014e8e",
          instanceProps: {},
          overrides: {
            default: {
              "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b": {
                category: "override",
                data: {
                  size: {
                    height: { type: "hug" },
                    width: { type: "hug" },
                  },
                },
                type: "stack",
              },
            },
          },
        },
      },
    },
  },
}

describe("codegen width handling", () => {
  describe("getNodeWidthConfig", () => {
    it("should return the default width config for a node", () => {
      const nodeId = "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b"
      const widthConfig = getNodeWidthConfig(SAMPLE_COMPONENT, nodeId, "default")

      expect(widthConfig).toEqual({ maxSize: 28, type: "hug" })
    })

    it("should return the mobile override width config when present", () => {
      const nodeId = "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b"
      const widthConfig = getNodeWidthConfig(SAMPLE_COMPONENT, nodeId, "mobile")

      expect(widthConfig).toEqual({ type: "hug" })
      expect(widthConfig?.maxSize).toBeUndefined()
    })
  })

  describe("mobileRemovesMaxWidth", () => {
    it("should detect when mobile override removes maxSize", () => {
      const nodeId = "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b"

      expect(mobileRemovesMaxWidth(SAMPLE_COMPONENT, nodeId)).toBe(true)
    })

    it("should return false when there is no mobile override", () => {
      const componentWithoutMobileOverride: ComponentDefinition = {
        ...SAMPLE_COMPONENT,
        selectors: {
          default: SAMPLE_COMPONENT.selectors.default,
        },
      }
      const nodeId = "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b"

      expect(mobileRemovesMaxWidth(componentWithoutMobileOverride, nodeId)).toBe(false)
    })
  })

  describe("generateMaxWidthClass", () => {
    it("should generate max-w class when maxSize is defined", () => {
      expect(generateMaxWidthClass(28)).toBe("max-w-[28px]")
      expect(generateMaxWidthClass(100)).toBe("max-w-[100px]")
    })

    it("should return null when maxSize is undefined", () => {
      expect(generateMaxWidthClass(undefined)).toBeNull()
    })
  })

  describe("generateMobileMaxWidthOverrideClass", () => {
    it("should generate mobile:max-w-none when mobile override removes maxSize", () => {
      const nodeId = "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b"

      expect(generateMobileMaxWidthOverrideClass(SAMPLE_COMPONENT, nodeId)).toBe("mobile:max-w-none")
    })

    it("should return null when there is no mobile override", () => {
      const componentWithoutMobileOverride: ComponentDefinition = {
        ...SAMPLE_COMPONENT,
        selectors: {
          default: SAMPLE_COMPONENT.selectors.default,
        },
      }
      const nodeId = "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b"

      expect(generateMobileMaxWidthOverrideClass(componentWithoutMobileOverride, nodeId)).toBeNull()
    })
  })

  describe("full className generation", () => {
    it("should generate correct classes for component with max-width removed on mobile", () => {
      const nodeId = "20e37ec9-e8eb-46bb-9fd2-e34e45b7928b"
      const defaultWidth = getNodeWidthConfig(SAMPLE_COMPONENT, nodeId, "default")

      const classes: string[] = []

      // Add default max-width class
      const maxWidthClass = generateMaxWidthClass(defaultWidth?.maxSize)
      if (maxWidthClass) {
        classes.push(maxWidthClass)
      }

      // Add mobile override class if max-width is removed on mobile
      const mobileOverrideClass = generateMobileMaxWidthOverrideClass(SAMPLE_COMPONENT, nodeId)
      if (mobileOverrideClass) {
        classes.push(mobileOverrideClass)
      }

      expect(classes).toContain("max-w-[28px]")
      expect(classes).toContain("mobile:max-w-none")
      expect(classes.join(" ")).toBe("max-w-[28px] mobile:max-w-none")
    })
  })
})
