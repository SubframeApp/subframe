import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRefreshCcwDot = React.forwardRef(function SvgFeatherRefreshCcwDot(
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
          <path d="M3 2v6h6" />
          <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
          <path d="M21 22v-6h-6" />
          <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
          <circle cx={12} cy={12} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRefreshCcwDot
