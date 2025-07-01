import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherReceiptRussianRuble = React.forwardRef(function SvgFeatherReceiptRussianRuble(
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
          <path d="M8 15h5" />
          <path d="M8 11h5a2 2 0 1 0 0-4h-3v10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherReceiptRussianRuble
