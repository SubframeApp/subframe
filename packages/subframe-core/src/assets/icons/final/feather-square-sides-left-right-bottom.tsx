import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareSidesLeftRightBottom = React.forwardRef(function SvgFeatherSquareSidesLeftRightBottom(
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
          <path d="M8 21H16M8 3H9M3 16V8M21 16V8M15 3H16" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareSidesLeftRightBottom
