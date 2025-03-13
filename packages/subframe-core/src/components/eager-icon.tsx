import React, { forwardRef, HTMLAttributes, ReactNode } from "react"
import * as Icons from "../assets/icons/final"
import type { IconName } from "../generated/iconNames"
import { EmptyIcon } from "./icon"

export interface EagerIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName
}

export const EagerIcon = forwardRef<HTMLSpanElement, EagerIconProps>((props, ref) => {
  const { name, ...otherProps } = props

  let children: ReactNode = null

  if (name === null) {
    children = null
  } else if (name === "empty") {
    children = <EmptyIcon />
  } else {
    const Icon = Icons[name]
    if (!Icon) {
      console.warn(`Icon "${name}" not found.`)
      children = <EmptyIcon />
    }

    children = <Icon />
  }

  return (
    <span ref={ref} {...otherProps}>
      {children}
    </span>
  )
})

export default EagerIcon
