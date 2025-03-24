import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignEndVertical = React.forwardRef(function SvgFeatherAlignEndVertical(
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
          <rect width={16} height={6} x={2} y={4} rx={2} />
          <rect width={9} height={6} x={9} y={14} rx={2} />
          <path d="M22 22V2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignEndVertical
