import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowUpToLine = React.forwardRef(function SvgFeatherArrowUpToLine(
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
          <path d="M5 3h14" />
          <path d="m18 13-6-6-6 6" />
          <path d="M12 7v14" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowUpToLine
