import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareSidesLeft = React.forwardRef(function SvgFeatherSquareSidesLeft(
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
          <path d="M8 3H9M8 21H9M3 8V16M21 8V9M15 3H16M15 21H16M21 15V16" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareSidesLeft
