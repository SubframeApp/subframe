import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRollerCoaster = React.forwardRef(function SvgFeatherRollerCoaster(
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
          <path d="M6 19V5" />
          <path d="M10 19V6.8" />
          <path d="M14 19v-7.8" />
          <path d="M18 5v4" />
          <path d="M18 19v-6" />
          <path d="M22 19V9" />
          <path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRollerCoaster
