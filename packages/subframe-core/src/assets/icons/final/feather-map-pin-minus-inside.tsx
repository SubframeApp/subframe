import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMapPinMinusInside = React.forwardRef(function SvgFeatherMapPinMinusInside(
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
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <path d="M9 10h6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMapPinMinusInside
