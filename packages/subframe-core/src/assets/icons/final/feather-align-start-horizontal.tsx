import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignStartHorizontal = React.forwardRef(function SvgFeatherAlignStartHorizontal(
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
          <rect width={6} height={16} x={4} y={6} rx={2} />
          <rect width={6} height={9} x={14} y={6} rx={2} />
          <path d="M22 2H2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignStartHorizontal
