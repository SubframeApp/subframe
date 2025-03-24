import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherIterationCw = React.forwardRef(function SvgFeatherIterationCw(
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
          <path d="M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8H4" />
          <polyline points="8 22 4 18 8 14" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherIterationCw
