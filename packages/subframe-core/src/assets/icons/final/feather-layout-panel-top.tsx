import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLayoutPanelTop = React.forwardRef(function SvgFeatherLayoutPanelTop(
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
          <rect width={18} height={7} x={3} y={3} rx={1} />
          <rect width={7} height={7} x={3} y={14} rx={1} />
          <rect width={7} height={7} x={14} y={14} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLayoutPanelTop
