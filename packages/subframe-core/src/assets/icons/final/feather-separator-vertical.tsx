import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSeparatorVertical = React.forwardRef(function SvgFeatherSeparatorVertical(
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
          <line x1={12} x2={12} y1={3} y2={21} />
          <polyline points="8 8 4 12 8 16" />
          <polyline points="16 16 20 12 16 8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSeparatorVertical
