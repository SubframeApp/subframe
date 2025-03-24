import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareSidesTopRightBottom = React.forwardRef(function SvgFeatherSquareSidesTopRightBottom(
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
          <path d="M16 3H8M16 21H8M21 8V16M3 8V9M3 15V16" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareSidesTopRightBottom
