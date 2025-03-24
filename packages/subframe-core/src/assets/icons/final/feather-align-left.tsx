import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignLeft = React.forwardRef(function SvgFeatherAlignLeft(
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
          <line x1={21} x2={3} y1={6} y2={6} />
          <line x1={15} x2={3} y1={12} y2={12} />
          <line x1={17} x2={3} y1={18} y2={18} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignLeft
