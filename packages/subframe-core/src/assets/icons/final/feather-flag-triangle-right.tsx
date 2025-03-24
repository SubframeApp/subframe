import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFlagTriangleRight = React.forwardRef(function SvgFeatherFlagTriangleRight(
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
          <path d="M7 22V2l10 5-10 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFlagTriangleRight
