import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMailSearch = React.forwardRef(function SvgFeatherMailSearch(
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
          <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z" />
          <circle cx={18} cy={18} r={3} />
          <path d="m22 22-1.5-1.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMailSearch
