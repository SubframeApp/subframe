import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherOutdent = React.forwardRef(function SvgFeatherOutdent(
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
          <polyline points="7 8 3 12 7 16" />
          <line x1={21} x2={11} y1={12} y2={12} />
          <line x1={21} x2={11} y1={6} y2={6} />
          <line x1={21} x2={11} y1={18} y2={18} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherOutdent
