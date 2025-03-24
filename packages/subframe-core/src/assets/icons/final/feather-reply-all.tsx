import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherReplyAll = React.forwardRef(function SvgFeatherReplyAll(
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
          <polyline points="7 17 2 12 7 7" />
          <polyline points="12 17 7 12 12 7" />
          <path d="M22 18v-2a4 4 0 0 0-4-4H7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherReplyAll
