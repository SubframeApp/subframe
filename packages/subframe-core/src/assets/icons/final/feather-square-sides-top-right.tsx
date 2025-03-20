import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareSidesTopRight = React.forwardRef(function SvgFeatherSquareSidesTopRight(
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
          <path d="M21 8L21 16M3 8L3 9M16 3L8 3M16 21L15 21M3 15L3 16M9 21L8 21" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareSidesTopRight
