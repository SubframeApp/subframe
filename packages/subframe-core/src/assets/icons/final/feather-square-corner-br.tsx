import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareCornerBr = React.forwardRef(function SvgFeatherSquareCornerBr(
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
          <path d="M16 20.99L19 20.99C19.5304 20.99 20.0391 20.7793 20.4142 20.4042C20.7893 20.0291 21 19.5204 21 18.99L21 15.99M21 2.98999L21 2.99999M3 2.98999L3 2.99999M3 20.99L3 21" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareCornerBr
