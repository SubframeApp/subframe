import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileSearch = React.forwardRef(function SvgFeatherFileSearch(
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
          <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="m9 18-1.5-1.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileSearch
