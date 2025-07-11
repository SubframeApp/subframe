import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherReceiptJapaneseYen = React.forwardRef(function SvgFeatherReceiptJapaneseYen(
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
          <path d="m12 10 3-3" />
          <path d="m9 7 3 3v7.5" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherReceiptJapaneseYen
