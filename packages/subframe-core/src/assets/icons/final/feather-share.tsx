import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShare = React.forwardRef(function SvgFeatherShare(
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
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1={12} x2={12} y1={2} y2={15} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShare
