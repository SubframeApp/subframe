import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPanelBottomOpen = React.forwardRef(function SvgFeatherPanelBottomOpen(
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
          <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
          <line x1={3} x2={21} y1={15} y2={15} />
          <path d="m9 10 3-3 3 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPanelBottomOpen
