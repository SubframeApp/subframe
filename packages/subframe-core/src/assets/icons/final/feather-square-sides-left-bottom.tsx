import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareSidesLeftBottom = React.forwardRef(function SvgFeatherSquareSidesLeftBottom(
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
          <path d="M3 16L3 8M21 16L21 15M8 21L16 21M8 3L9 3M21 9L21 8M15 3L16 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareSidesLeftBottom
