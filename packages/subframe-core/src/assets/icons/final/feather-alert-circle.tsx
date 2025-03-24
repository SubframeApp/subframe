import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlertCircle = React.forwardRef(function SvgFeatherAlertCircle(
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
          <circle cx={12} cy={12} r={10} />
          <line x1={12} x2={12} y1={8} y2={12} />
          <line x1={12} x2={12.01} y1={16} y2={16} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlertCircle
