import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAnvil = React.forwardRef(function SvgFeatherAnvil(
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
          <path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
          <path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
          <path d="M9 12v5" />
          <path d="M15 12v5" />
          <path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAnvil
