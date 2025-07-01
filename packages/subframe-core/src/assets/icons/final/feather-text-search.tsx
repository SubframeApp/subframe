import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTextSearch = React.forwardRef(function SvgFeatherTextSearch(
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
          <path d="M21 6H3" />
          <path d="M10 12H3" />
          <path d="M10 18H3" />
          <circle cx={17} cy={15} r={3} />
          <path d="m21 19-1.9-1.9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTextSearch
