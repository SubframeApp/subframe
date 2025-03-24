import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBookCopy = React.forwardRef(function SvgFeatherBookCopy(
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
          <path d="M2 16V4a2 2 0 0 1 2-2h11" />
          <path d="M5 14H4a2 2 0 1 0 0 4h1" />
          <path d="M22 18H11a2 2 0 1 0 0 4h11V6H11a2 2 0 0 0-2 2v12" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBookCopy
