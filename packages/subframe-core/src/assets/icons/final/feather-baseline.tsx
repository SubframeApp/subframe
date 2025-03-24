import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBaseline = React.forwardRef(function SvgFeatherBaseline(
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
          <path d="M4 20h16" />
          <path d="m6 16 6-12 6 12" />
          <path d="M8 12h8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBaseline
