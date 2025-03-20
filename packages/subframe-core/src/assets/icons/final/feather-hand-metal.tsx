import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherHandMetal = React.forwardRef(function SvgFeatherHandMetal(
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
          <path d="M18 12.5V10a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" />
          <path d="M14 11V9a2 2 0 1 0-4 0v2" />
          <path d="M10 10.5V5a2 2 0 1 0-4 0v9" />
          <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherHandMetal
