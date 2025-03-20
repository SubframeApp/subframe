import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherContact2 = React.forwardRef(function SvgFeatherContact2(
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
          <path d="M16 18a4 4 0 0 0-8 0" />
          <circle cx={12} cy={11} r={3} />
          <rect width={18} height={18} x={3} y={4} rx={2} />
          <line x1={8} x2={8} y1={2} y2={4} />
          <line x1={16} x2={16} y1={2} y2={4} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherContact2
