import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherNavigation2Off = React.forwardRef(function SvgFeatherNavigation2Off(
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
          <path d="M9.31 9.31 5 21l7-4 7 4-1.17-3.17" />
          <path d="M14.53 8.88 12 2l-1.17 3.17" />
          <line x1={2} x2={22} y1={2} y2={22} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherNavigation2Off
