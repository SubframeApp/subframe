import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherReceiptSwissFranc = React.forwardRef(function SvgFeatherReceiptSwissFranc(
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
          <path d="M10 17V7h5" />
          <path d="M10 11h4" />
          <path d="M8 15h5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherReceiptSwissFranc
