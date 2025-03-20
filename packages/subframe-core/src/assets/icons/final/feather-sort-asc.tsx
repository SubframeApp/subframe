import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSortAsc = React.forwardRef(function SvgFeatherSortAsc(
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
          <path d="M11 11h4" />
          <path d="M11 15h7" />
          <path d="M11 19h10" />
          <path d="M9 7 6 4 3 7" />
          <path d="M6 6v14" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSortAsc
