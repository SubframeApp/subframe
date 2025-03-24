import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPanelTop = React.forwardRef(function SvgFeatherPanelTop(
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
          <line x1={3} x2={21} y1={9} y2={9} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPanelTop
