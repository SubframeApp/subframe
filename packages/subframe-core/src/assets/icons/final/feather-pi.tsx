import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPi = React.forwardRef(function SvgFeatherPi(
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
          <line x1={9} x2={9} y1={4} y2={20} />
          <path d="M4 7c0-1.7 1.3-3 3-3h13" />
          <path d="M18 20c-1.7 0-3-1.3-3-3V4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPi
