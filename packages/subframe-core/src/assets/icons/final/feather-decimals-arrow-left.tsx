import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDecimalsArrowLeft = React.forwardRef(function SvgFeatherDecimalsArrowLeft(
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
          <path d="m13 21-3-3 3-3" />
          <path d="M20 18H10" />
          <path d="M3 11h.01" />
          <rect x={6} y={3} width={5} height={8} rx={2.5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDecimalsArrowLeft
