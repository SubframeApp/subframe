import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSidebarOpen = React.forwardRef(function SvgFeatherSidebarOpen(
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
          <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
          <path d="M9 3v18" />
          <path d="m14 9 3 3-3 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSidebarOpen
