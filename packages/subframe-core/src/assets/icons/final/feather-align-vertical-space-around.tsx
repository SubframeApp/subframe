import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignVerticalSpaceAround = React.forwardRef(function SvgFeatherAlignVerticalSpaceAround(
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
          <rect width={10} height={6} x={7} y={9} rx={2} />
          <path d="M22 20H2" />
          <path d="M22 4H2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignVerticalSpaceAround
