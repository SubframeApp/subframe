import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherJapaneseYen = React.forwardRef(function SvgFeatherJapaneseYen(
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
          <path d="M12 9.5V21m0-11.5L6 3m6 6.5L18 3" />
          <path d="M6 15h12" />
          <path d="M6 11h12" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherJapaneseYen
