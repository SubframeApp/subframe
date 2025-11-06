"use client"

import * as RadixToggleGroup from "@radix-ui/react-toggle-group"
import React from "react"
import { forwardRef } from "../lib/forward-ref"
import { Optional } from "../lib/typescript-helpers"

interface RootProps extends Optional<RadixToggleGroup.ToggleGroupSingleProps, "type"> {}

export const Root = forwardRef<HTMLDivElement, RootProps>(function Root(
  { className, type = "single", ...otherProps },
  ref,
) {
  return <RadixToggleGroup.Root ref={ref} className={className} type={type} {...otherProps} />
})

export const Item = RadixToggleGroup.Item

export const ToggleGroup = { Root, Item }
