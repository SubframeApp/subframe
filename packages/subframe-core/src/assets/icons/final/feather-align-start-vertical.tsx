import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignStartVertical = React.forwardRef(function SvgFeatherAlignStartVertical(
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
          <rect width={9} height={6} x={6} y={14} rx={2} />
          <rect width={16} height={6} x={6} y={4} rx={2} />
          <path d="M2 2v20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignStartVertical
