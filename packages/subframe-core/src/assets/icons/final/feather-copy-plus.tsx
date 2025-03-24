import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCopyPlus = React.forwardRef(function SvgFeatherCopyPlus(
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
          <line x1={15} x2={15} y1={12} y2={18} />
          <line x1={12} x2={18} y1={15} y2={15} />
          <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCopyPlus
