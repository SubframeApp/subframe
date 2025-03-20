import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMoveDiagonal = React.forwardRef(function SvgFeatherMoveDiagonal(
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
          <polyline points="13 5 19 5 19 11" />
          <polyline points="11 19 5 19 5 13" />
          <line x1={19} x2={5} y1={5} y2={19} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMoveDiagonal
