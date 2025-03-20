import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPoundSterling = React.forwardRef(function SvgFeatherPoundSterling(
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
          <path d="M18 7c0-5.333-8-5.333-8 0" />
          <path d="M10 7v14" />
          <path d="M6 21h12" />
          <path d="M6 13h10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPoundSterling
