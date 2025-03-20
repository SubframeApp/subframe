import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRadioReceiver = React.forwardRef(function SvgFeatherRadioReceiver(
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
          <path d="M5 16v2" />
          <path d="M19 16v2" />
          <rect width={20} height={8} x={2} y={8} rx={2} />
          <path d="M18 12h0" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRadioReceiver
