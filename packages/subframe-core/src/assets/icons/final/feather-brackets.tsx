import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBrackets = React.forwardRef(function SvgFeatherBrackets(
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
          <path d="M16 3h3v18h-3" />
          <path d="M8 21H5V3h3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBrackets
