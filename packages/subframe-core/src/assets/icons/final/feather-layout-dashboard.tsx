import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLayoutDashboard = React.forwardRef(function SvgFeatherLayoutDashboard(
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
          <rect width={7} height={9} x={3} y={3} rx={1} />
          <rect width={7} height={5} x={14} y={3} rx={1} />
          <rect width={7} height={9} x={14} y={12} rx={1} />
          <rect width={7} height={5} x={3} y={16} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLayoutDashboard
