import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherIterationCcw = React.forwardRef(function SvgFeatherIterationCcw(
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
          <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8" />
          <polyline points="16 14 20 18 16 22" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherIterationCcw
