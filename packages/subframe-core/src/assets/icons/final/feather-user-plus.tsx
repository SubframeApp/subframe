import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserPlus = React.forwardRef(function SvgFeatherUserPlus(
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx={9} cy={7} r={4} />
          <line x1={19} x2={19} y1={8} y2={14} />
          <line x1={22} x2={16} y1={11} y2={11} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserPlus
