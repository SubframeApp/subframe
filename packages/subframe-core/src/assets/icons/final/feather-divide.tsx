import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDivide = React.forwardRef(function SvgFeatherDivide(
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
          <circle cx={12} cy={6} r={1} />
          <line x1={5} x2={19} y1={12} y2={12} />
          <circle cx={12} cy={18} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDivide
