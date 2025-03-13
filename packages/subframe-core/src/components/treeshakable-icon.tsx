import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react"

export interface TreeshakableIconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: ReactNode
  name?: never
}

export const TreeshakableIcon = forwardRef<HTMLSpanElement, TreeshakableIconProps>((props, ref) => {
  const { icon, ...otherProps } = props

  return (
    <span ref={ref} {...otherProps}>
      {icon}
    </span>
  )
})

export default TreeshakableIcon
