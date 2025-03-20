import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCaseSensitive = React.forwardRef(function SvgFeatherCaseSensitive(
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
          <path d="m3 15 4-8 4 8" />
          <path d="M4 13h6" />
          <circle cx={18} cy={12} r={3} />
          <path d="M21 9v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCaseSensitive
