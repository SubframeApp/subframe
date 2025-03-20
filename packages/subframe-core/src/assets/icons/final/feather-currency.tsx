import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCurrency = React.forwardRef(function SvgFeatherCurrency(
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
          <circle cx={12} cy={12} r={8} />
          <line x1={3} x2={6} y1={3} y2={6} />
          <line x1={21} x2={18} y1={3} y2={6} />
          <line x1={3} x2={6} y1={21} y2={18} />
          <line x1={21} x2={18} y1={21} y2={18} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCurrency
