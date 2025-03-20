import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLocate = React.forwardRef(function SvgFeatherLocate(
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
          <line x1={2} x2={5} y1={12} y2={12} />
          <line x1={19} x2={22} y1={12} y2={12} />
          <line x1={12} x2={12} y1={2} y2={5} />
          <line x1={12} x2={12} y1={19} y2={22} />
          <circle cx={12} cy={12} r={7} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLocate
