import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherHardDrive = React.forwardRef(function SvgFeatherHardDrive(
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
          <line x1={22} x2={2} y1={12} y2={12} />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          <line x1={6} x2={6.01} y1={16} y2={16} />
          <line x1={10} x2={10.01} y1={16} y2={16} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherHardDrive
