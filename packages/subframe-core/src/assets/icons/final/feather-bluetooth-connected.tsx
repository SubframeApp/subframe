import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBluetoothConnected = React.forwardRef(function SvgFeatherBluetoothConnected(
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
          <path d="m7 7 10 10-5 5V2l5 5L7 17" />
          <line x1={18} x2={21} y1={12} y2={12} />
          <line x1={3} x2={6} y1={12} y2={12} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBluetoothConnected
