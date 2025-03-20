import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSortDesc = React.forwardRef(function SvgFeatherSortDesc(
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
          <path d="M11 5h10" />
          <path d="M11 9h7" />
          <path d="M11 13h4" />
          <path d="m3 17 3 3 3-3" />
          <path d="M6 18V4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSortDesc
