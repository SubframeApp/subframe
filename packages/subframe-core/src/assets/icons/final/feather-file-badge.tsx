import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileBadge = React.forwardRef(function SvgFeatherFileBadge(
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
          <path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-6" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M7 16.5 8 22l-3-1-3 1 1-5.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileBadge
