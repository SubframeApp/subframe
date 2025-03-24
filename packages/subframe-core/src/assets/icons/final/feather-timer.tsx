import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTimer = React.forwardRef(function SvgFeatherTimer(
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
          <line x1={10} x2={14} y1={2} y2={2} />
          <line x1={12} x2={15} y1={14} y2={11} />
          <circle cx={12} cy={14} r={8} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTimer
