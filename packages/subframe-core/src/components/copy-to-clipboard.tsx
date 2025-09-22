"use client"

import copy from "copy-to-clipboard"
import React, { useCallback } from "react"
import { composeRefs } from "../lib/compose-react-refs"

// NOTE: this is the nearly same code as https://github.com/nkbt/react-copy-to-clipboard only written
// as a functional component and with forwarding refs, minus a few useless props
interface Props extends React.HTMLAttributes<HTMLElement> {
  clipboardText?: string
  children?: React.ReactElement
  onCopy?: () => void // NOTE: deviating from react-copy-to-clipboard here
  // NOTE: a smaller set of options
  options?: {
    format: string
  }
}

export const Root = React.forwardRef<HTMLElement, Props>(function CopyToClipboardRootComponent(props: Props, ref) {
  const { clipboardText, onCopy, children, options, ...otherProps } = props

  const format = options?.format
  const elem = children && React.Children.only(children)
  const elemOnClick = elem?.props?.onClick

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (clipboardText !== undefined) {
        if (format) {
          copy(clipboardText, { format })
        } else {
          copy(clipboardText)
        }

        if (onCopy) {
          onCopy()
        }
      }

      // Call the original onClick handler if provided
      if (typeof elemOnClick === "function") {
        elemOnClick(event)
      }
    },
    [onCopy, clipboardText, elemOnClick, format],
  )

  return elem
    ? React.cloneElement(elem as any, { ...otherProps, onClick, ref: composeRefs(ref, elem?.props?.ref) })
    : null
})

export const CopyToClipboard = { Root }
