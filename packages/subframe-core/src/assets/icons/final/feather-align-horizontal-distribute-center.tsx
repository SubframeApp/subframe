import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignHorizontalDistributeCenter = React.forwardRef(function SvgFeatherAlignHorizontalDistributeCenter(
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
          <rect width={6} height={14} x={4} y={5} rx={2} />
          <rect width={6} height={10} x={14} y={7} rx={2} />
          <path d="M17 22v-5" />
          <path d="M17 7V2" />
          <path d="M7 22v-3" />
          <path d="M7 5V2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignHorizontalDistributeCenter
