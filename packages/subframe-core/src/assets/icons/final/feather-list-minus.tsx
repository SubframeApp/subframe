import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListMinus = React.forwardRef(function SvgFeatherListMinus(
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
          <path d="M11 12H3" />
          <path d="M16 6H3" />
          <path d="M16 18H3" />
          <path d="M21 12h-6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListMinus
