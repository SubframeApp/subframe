import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherReceiptPoundSterling = React.forwardRef(function SvgFeatherReceiptPoundSterling(
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
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M8 13h5" />
          <path d="M10 17V9.5a2.5 2.5 0 0 1 5 0" />
          <path d="M8 17h7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherReceiptPoundSterling
