import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareCornerTlTrBl = React.forwardRef(function SvgFeatherSquareCornerTlTrBl(
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
          <path d="M3 16L3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21L8 21M8 3L5 3C4.46957 3 3.96086 3.21072 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5L3 8M21 8L21 5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3L16 3M21 21L20.99 21" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareCornerTlTrBl
