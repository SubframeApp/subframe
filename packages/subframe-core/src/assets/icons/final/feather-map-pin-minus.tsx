import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMapPinMinus = React.forwardRef(function SvgFeatherMapPinMinus(
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
          <path d="M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738" />
          <circle cx={12} cy={10} r={3} />
          <path d="M16 18h6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMapPinMinus
