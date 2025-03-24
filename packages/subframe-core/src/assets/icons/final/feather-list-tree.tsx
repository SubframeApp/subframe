import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListTree = React.forwardRef(function SvgFeatherListTree(
  props: React.HTMLAttributes<HTMLSpanElement>,
  ref: React.Ref<HTMLSpanElement>,
) {
  return (
    <IconWrapper ref={ref} {...props}>
      {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12h-8" />
          <path d="M21 6H8" />
          <path d="M21 18h-8" />
          <path d="M3 6v4c0 1.1.9 2 2 2h3" />
          <path d="M3 10v6c0 1.1.9 2 2 2h3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListTree
