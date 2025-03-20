import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherHeading4 = React.forwardRef(function SvgFeatherHeading4(
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
          <path d="M4 12h8" />
          <path d="M4 18V6" />
          <path d="M12 18V6" />
          <path d="M17 10v4h4" />
          <path d="M21 10v8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherHeading4
