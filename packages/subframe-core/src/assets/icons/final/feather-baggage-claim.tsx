import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBaggageClaim = React.forwardRef(function SvgFeatherBaggageClaim(
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
          <path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" />
          <path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" />
          <rect width={13} height={8} x={8} y={6} rx={1} />
          <circle cx={18} cy={20} r={2} />
          <circle cx={9} cy={20} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBaggageClaim
