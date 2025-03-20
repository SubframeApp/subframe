import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareCornerTlBl = React.forwardRef(function SvgFeatherSquareCornerTlBl(
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
          <path d="M3 16L3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21L8 21M8 3L5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21072 3.96086 3 4.46957 3 5L3 8M21 21L20.99 21M21 3L20.99 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareCornerTlBl
