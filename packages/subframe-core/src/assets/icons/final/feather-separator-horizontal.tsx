import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSeparatorHorizontal = React.forwardRef(function SvgFeatherSeparatorHorizontal(
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
          <line x1={3} x2={21} y1={12} y2={12} />
          <polyline points="8 8 12 4 16 8" />
          <polyline points="16 16 12 20 8 16" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSeparatorHorizontal
