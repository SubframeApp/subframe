import classNames from "classnames"
import React from "react"
import styles from "./icon-wrapper.module.css"

export const IconWrapper = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  function IconWrapper(props, ref) {
    const { className, ...otherProps } = props
    return <span ref={ref} className={classNames(className, styles.root)} {...otherProps} />
  },
)
