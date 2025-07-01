import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMapPinX = React.forwardRef(function SvgFeatherMapPinX(
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
          <path d="M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077" />
          <circle cx={12} cy={10} r={3} />
          <path d="m21.5 15.5-5 5" />
          <path d="m21.5 20.5-5-5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMapPinX
