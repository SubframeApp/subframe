import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherReceiptCent = React.forwardRef(function SvgFeatherReceiptCent(
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
          <path d="M12 6.5v11" />
          <path d="M15 9.4a4 4 0 1 0 0 5.2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherReceiptCent
