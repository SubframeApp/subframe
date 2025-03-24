import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareCornerBrBl = React.forwardRef(function SvgFeatherSquareCornerBrBl(
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
          <path d="M16 21L19 21C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19L21 16M3 16L3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21L8 21M21 3L21 3.01M3 3L3 3.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareCornerBrBl
