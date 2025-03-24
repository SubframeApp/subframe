import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTent = React.forwardRef(function SvgFeatherTent(
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
          <path d="M3.5 21 14 3" />
          <path d="M20.5 21 10 3" />
          <path d="M15.5 21 12 15l-3.5 6" />
          <path d="M2 21h20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTent
