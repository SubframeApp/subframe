import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRectangleCircle = React.forwardRef(function SvgFeatherRectangleCircle(
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
          <path d="M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
          <circle cx={14} cy={12} r={8} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRectangleCircle
