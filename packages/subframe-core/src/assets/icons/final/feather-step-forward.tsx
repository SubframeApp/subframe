import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherStepForward = React.forwardRef(function SvgFeatherStepForward(
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
          <line x1={6} x2={6} y1={4} y2={20} />
          <polygon points="10,4 20,12 10,20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherStepForward
