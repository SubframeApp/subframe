import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCheckLine = React.forwardRef(function SvgFeatherCheckLine(
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
          <path d="M20 4L9 15" />
          <path d="M21 19L3 19" />
          <path d="M9 15L4 10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCheckLine
