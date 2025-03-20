import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherToggleLeft = React.forwardRef(function SvgFeatherToggleLeft(
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
          <rect width={20} height={12} x={2} y={6} rx={6} ry={6} />
          <circle cx={8} cy={12} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherToggleLeft
