import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherZapOff = React.forwardRef(function SvgFeatherZapOff(
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
          <polyline points="12.41 6.75 13 2 10.57 4.92" />
          <polyline points="18.57 12.91 21 10 15.66 10" />
          <polyline points="8 8 3 14 12 14 11 22 16 16" />
          <line x1={2} x2={22} y1={2} y2={22} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherZapOff
