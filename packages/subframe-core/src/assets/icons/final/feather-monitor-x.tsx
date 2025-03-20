import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMonitorX = React.forwardRef(function SvgFeatherMonitorX(
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
          <path d="m14.5 12.5-5-5" />
          <path d="m9.5 12.5 5-5" />
          <rect width={20} height={14} x={2} y={3} rx={2} />
          <path d="M12 17v4" />
          <path d="M8 21h8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMonitorX
