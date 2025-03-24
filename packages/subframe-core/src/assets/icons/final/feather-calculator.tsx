import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalculator = React.forwardRef(function SvgFeatherCalculator(
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
          <rect width={16} height={20} x={4} y={2} rx={2} />
          <line x1={8} x2={16} y1={6} y2={6} />
          <line x1={16} x2={16} y1={14} y2={18} />
          <path d="M16 10h.01" />
          <path d="M12 10h.01" />
          <path d="M8 10h.01" />
          <path d="M12 14h.01" />
          <path d="M8 14h.01" />
          <path d="M12 18h.01" />
          <path d="M8 18h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalculator
