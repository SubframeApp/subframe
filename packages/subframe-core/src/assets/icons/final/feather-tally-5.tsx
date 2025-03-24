import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTally5 = React.forwardRef(function SvgFeatherTally5(
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
          <path d="M4 4v16" />
          <path d="M9 4v16" />
          <path d="M14 4v16" />
          <path d="M19 4v16" />
          <path d="M22 6 2 18" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTally5
