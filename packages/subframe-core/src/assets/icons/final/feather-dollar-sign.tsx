import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDollarSign = React.forwardRef(function SvgFeatherDollarSign(
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
          <line x1={12} x2={12} y1={2} y2={22} />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDollarSign
