import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherJoystick = React.forwardRef(function SvgFeatherJoystick(
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
          <path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z" />
          <path d="M6 15v-2" />
          <path d="M12 15V9" />
          <circle cx={12} cy={6} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherJoystick
