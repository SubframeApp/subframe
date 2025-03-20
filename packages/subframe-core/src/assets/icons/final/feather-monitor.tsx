import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMonitor = React.forwardRef(function SvgFeatherMonitor(
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
          <rect width={20} height={14} x={2} y={3} rx={2} />
          <line x1={8} x2={16} y1={21} y2={21} />
          <line x1={12} x2={12} y1={17} y2={21} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMonitor
