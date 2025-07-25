import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTableColumnsSplit = React.forwardRef(function SvgFeatherTableColumnsSplit(
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
          <path d="M14 14v2" />
          <path d="M14 20v2" />
          <path d="M14 2v2" />
          <path d="M14 8v2" />
          <path d="M2 15h8" />
          <path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2" />
          <path d="M2 9h8" />
          <path d="M22 15h-4" />
          <path d="M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
          <path d="M22 9h-4" />
          <path d="M5 3v18" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTableColumnsSplit
