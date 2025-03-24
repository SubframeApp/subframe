import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSlidersHorizontal = React.forwardRef(function SvgFeatherSlidersHorizontal(
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
          <line x1={21} x2={14} y1={4} y2={4} />
          <line x1={10} x2={3} y1={4} y2={4} />
          <line x1={21} x2={12} y1={12} y2={12} />
          <line x1={8} x2={3} y1={12} y2={12} />
          <line x1={21} x2={16} y1={20} y2={20} />
          <line x1={12} x2={3} y1={20} y2={20} />
          <line x1={14} x2={14} y1={2} y2={6} />
          <line x1={8} x2={8} y1={10} y2={14} />
          <line x1={16} x2={16} y1={18} y2={22} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSlidersHorizontal
