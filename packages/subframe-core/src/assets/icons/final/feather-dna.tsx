import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDna = React.forwardRef(function SvgFeatherDna(
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
          <path d="M2 15c6.667-6 13.333 0 20-6" />
          <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
          <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
          <path d="m17 6-2.5-2.5" />
          <path d="m14 8-1-1" />
          <path d="m7 18 2.5 2.5" />
          <path d="m3.5 14.5.5.5" />
          <path d="m20 9 .5.5" />
          <path d="m6.5 12.5 1 1" />
          <path d="m16.5 10.5 1 1" />
          <path d="m10 16 1.5 1.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDna
