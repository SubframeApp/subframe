import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCable = React.forwardRef(function SvgFeatherCable(
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
          <path d="M4 9a2 2 0 0 1-2-2V5h6v2a2 2 0 0 1-2 2Z" />
          <path d="M3 5V3" />
          <path d="M7 5V3" />
          <path d="M19 15V6.5a3.5 3.5 0 0 0-7 0v11a3.5 3.5 0 0 1-7 0V9" />
          <path d="M17 21v-2" />
          <path d="M21 21v-2" />
          <path d="M22 19h-6v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCable
