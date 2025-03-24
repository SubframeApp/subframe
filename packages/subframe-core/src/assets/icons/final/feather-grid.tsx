import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGrid = React.forwardRef(function SvgFeatherGrid(
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
          <line x1={3} y1={9} x2={21} y2={9} />
          <line x1={3} y1={15} x2={21} y2={15} />
          <line x1={9} y1={3} x2={9} y2={21} />
          <line x1={15} y1={3} x2={15} y2={21} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGrid
