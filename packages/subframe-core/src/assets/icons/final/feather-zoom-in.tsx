import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherZoomIn = React.forwardRef(function SvgFeatherZoomIn(
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
          <circle cx={11} cy={11} r={8} />
          <line x1={21} x2={16.65} y1={21} y2={16.65} />
          <line x1={11} x2={11} y1={8} y2={14} />
          <line x1={8} x2={14} y1={11} y2={11} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherZoomIn
