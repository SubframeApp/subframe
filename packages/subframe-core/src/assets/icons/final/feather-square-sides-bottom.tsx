import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareSidesBottom = React.forwardRef(function SvgFeatherSquareSidesBottom(
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
          <path d="M21 16L21 15M3 16L3 15M16 21L8 21M16 3L15 3M21 9L21 8M3 9L3 8M9 3L8 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareSidesBottom
