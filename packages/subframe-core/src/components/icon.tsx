"use client"

import React from "react"
import * as Icons from "../assets/icons/final"
import { IconWrapper } from "./icon-wrapper"

// If empty, then renders as an empty icon, but takes up the same amount of space
// If null, then does not render anything.
export type IconName = keyof typeof Icons | "empty" | null

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconName
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(props, ref) {
  const { name, ...otherProps } = props

  if (name === null) {
    return null
  }

  if (name === "empty") {
    return (
      <IconWrapper ref={ref} {...otherProps}>
        <svg width="1em" height="1em"></svg>
      </IconWrapper>
    )
  }

  const Component = Icons[name]
  // TODO warn?
  if (!Component) {
    console.warn(`Icon rendered with invalid name: ${name}`)
    return <IconWrapper ref={ref} {...otherProps} />
  }

  // Icon components are already wrapped with an IconWrapper internally.
  return <Component ref={ref} {...otherProps} />
})
