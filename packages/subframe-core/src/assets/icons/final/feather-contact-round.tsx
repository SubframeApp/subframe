import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherContactRound = React.forwardRef(function SvgFeatherContactRound(
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
          <path d="M16 2v2" />
          <path d="M17.915 22a6 6 0 0 0-12 0" />
          <path d="M8 2v2" />
          <circle cx={12} cy={12} r={4} />
          <rect x={3} y={4} width={18} height={18} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherContactRound
