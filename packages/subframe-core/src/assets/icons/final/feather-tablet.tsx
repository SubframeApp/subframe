import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTablet = React.forwardRef(function SvgFeatherTablet(
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
          <rect width={16} height={20} x={4} y={2} rx={2} ry={2} />
          <line x1={12} x2={12.01} y1={18} y2={18} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTablet
