import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignEndHorizontal = React.forwardRef(function SvgFeatherAlignEndHorizontal(
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
          <rect width={6} height={16} x={4} y={2} rx={2} />
          <rect width={6} height={9} x={14} y={9} rx={2} />
          <path d="M22 22H2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignEndHorizontal
