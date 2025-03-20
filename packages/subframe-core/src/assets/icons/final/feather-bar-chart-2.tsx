import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBarChart2 = React.forwardRef(function SvgFeatherBarChart2(
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
          <line x1={18} x2={18} y1={20} y2={10} />
          <line x1={12} x2={12} y1={20} y2={4} />
          <line x1={6} x2={6} y1={20} y2={14} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBarChart2
