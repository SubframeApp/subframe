import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherParentheses = React.forwardRef(function SvgFeatherParentheses(
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
          <path d="M8 21s-4-3-4-9 4-9 4-9" />
          <path d="M16 3s4 3 4 9-4 9-4 9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherParentheses
