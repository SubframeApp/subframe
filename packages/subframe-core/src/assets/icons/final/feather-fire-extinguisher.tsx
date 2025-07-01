import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFireExtinguisher = React.forwardRef(function SvgFeatherFireExtinguisher(
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
          <path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" />
          <path d="M9 18h8" />
          <path d="M18 3h-3" />
          <path d="M11 3a6 6 0 0 0-6 6v11" />
          <path d="M5 13h4" />
          <path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFireExtinguisher
