import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTextCursor = React.forwardRef(function SvgFeatherTextCursor(
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
          <path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" />
          <path d="M7 22h1a4 4 0 0 0 4-4v-1" />
          <path d="M7 2h1a4 4 0 0 1 4 4v1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTextCursor
