import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCaptionsOff = React.forwardRef(function SvgFeatherCaptionsOff(
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
          <path d="M10.5 5H19a2 2 0 0 1 2 2v8.5" />
          <path d="M17 11h-.5" />
          <path d="M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" />
          <path d="m2 2 20 20" />
          <path d="M7 11h4" />
          <path d="M7 15h2.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCaptionsOff
