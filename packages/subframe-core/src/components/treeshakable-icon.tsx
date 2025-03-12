import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react"

export interface TreeshakableIconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: ReactNode
}

export const TreeshakableIcon = forwardRef<HTMLSpanElement, TreeshakableIconProps>((props, ref) => {
  const { className, icon, ...otherProps } = props

  return (
    <span className={className} ref={ref} {...otherProps}>
      {icon}
    </span>
  )
})

export default TreeshakableIcon
