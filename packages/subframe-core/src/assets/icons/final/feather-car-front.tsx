import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCarFront = React.forwardRef(function SvgFeatherCarFront(
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
          <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
          <path d="M7 14h.01" />
          <path d="M17 14h.01" />
          <rect width={18} height={8} x={3} y={10} rx={2} />
          <path d="M5 18v2" />
          <path d="M19 18v2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCarFront
