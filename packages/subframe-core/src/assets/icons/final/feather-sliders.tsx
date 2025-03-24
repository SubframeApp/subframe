import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSliders = React.forwardRef(function SvgFeatherSliders(
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
          <line x1={4} x2={4} y1={21} y2={14} />
          <line x1={4} x2={4} y1={10} y2={3} />
          <line x1={12} x2={12} y1={21} y2={12} />
          <line x1={12} x2={12} y1={8} y2={3} />
          <line x1={20} x2={20} y1={21} y2={16} />
          <line x1={20} x2={20} y1={12} y2={3} />
          <line x1={2} x2={6} y1={14} y2={14} />
          <line x1={10} x2={14} y1={8} y2={8} />
          <line x1={18} x2={22} y1={16} y2={16} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSliders
