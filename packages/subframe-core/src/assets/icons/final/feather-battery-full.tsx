import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBatteryFull = React.forwardRef(function SvgFeatherBatteryFull(
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
          <rect width={16} height={10} x={2} y={7} rx={2} ry={2} />
          <line x1={22} x2={22} y1={11} y2={13} />
          <line x1={6} x2={6} y1={11} y2={13} />
          <line x1={10} x2={10} y1={11} y2={13} />
          <line x1={14} x2={14} y1={11} y2={13} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBatteryFull
