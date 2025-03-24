import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareSidesTop = React.forwardRef(function SvgFeatherSquareSidesTop(
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
          <path d="M3 8L3 9M21 8L21 9M8 3L16 3M8 21L9 21M3 15L3 16M21 15L21 16M15 21L16 21" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareSidesTop
