import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGamepad = React.forwardRef(function SvgFeatherGamepad(
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
          <line x1={6} x2={10} y1={12} y2={12} />
          <line x1={8} x2={8} y1={10} y2={14} />
          <line x1={15} x2={15.01} y1={13} y2={13} />
          <line x1={18} x2={18.01} y1={11} y2={11} />
          <rect width={20} height={12} x={2} y={6} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGamepad
