import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLetterText = React.forwardRef(function SvgFeatherLetterText(
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
          <path d="M15 12h6" />
          <path d="M15 6h6" />
          <path d="m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13" />
          <path d="M3 18h18" />
          <path d="M3.92 11h6.16" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLetterText
