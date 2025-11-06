"use client"

import * as RadixSelect from "@radix-ui/react-select"
import classNames from "classnames"
import React from "react"
import { forwardRef } from "../lib/forward-ref"
import styles from "./select.module.css"

interface RootProps extends RadixSelect.SelectProps {}

export const Root = forwardRef<HTMLDivElement, RootProps>(function SelectRoot({ children, ...otherProps }, _ref) {
  return <RadixSelect.Root {...otherProps}>{children}</RadixSelect.Root>
})

export const Trigger = forwardRef<HTMLButtonElement, RadixSelect.SelectTriggerProps>(function Trigger(
  { className, children, ...otherProps },
  ref,
) {
  return (
    <RadixSelect.Trigger className={classNames(className, styles.trigger)} ref={ref} {...otherProps}>
      {children}
    </RadixSelect.Trigger>
  )
})

export const Value = forwardRef<HTMLButtonElement, RadixSelect.SelectValueProps>(function Value(
  {
    children, // NOTE: ignored
    placeholder,
    className,
    ...otherProps
  },
  ref,
) {
  return (
    // NOTE: this needs a wrapper since Radix strips all styling from RadixSelect.Value
    <span className={classNames(className, styles.value)} {...otherProps} ref={ref}>
      <RadixSelect.Value placeholder={placeholder} />
    </span>
  )
})

export const Content = forwardRef<HTMLDivElement, RadixSelect.SelectContentProps>(function Content(
  { className, children, position = "popper", sideOffset = 4, ...otherProps },
  ref,
) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={classNames(className, styles.content)}
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        {...otherProps}
      >
        <Select.Viewport asChild>{children}</Select.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  )
})

export const Viewport = forwardRef<HTMLDivElement, RadixSelect.SelectViewportProps>(function Viewport(
  { className, children, ...otherProps },
  ref,
) {
  return (
    <RadixSelect.Viewport className={classNames(className, styles.viewport)} ref={ref} {...otherProps}>
      {children}
    </RadixSelect.Viewport>
  )
})

export const Item = forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(function Item(
  { className, children, value, ...otherProps },
  ref,
) {
  return (
    <RadixSelect.Item className={classNames(className, styles.item)} ref={ref} value={value} {...otherProps}>
      {children}
    </RadixSelect.Item>
  )
})

export const ItemText = RadixSelect.ItemText

export const Select = {
  Root,
  Trigger,
  Value,
  Content,
  Viewport,
  Item,
  ItemText,
}
