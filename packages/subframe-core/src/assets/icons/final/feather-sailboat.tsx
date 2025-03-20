import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSailboat = React.forwardRef(function SvgFeatherSailboat(
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
          <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
          <path d="M21 14 10 2 3 14h18Z" />
          <path d="M10 2v16" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSailboat
