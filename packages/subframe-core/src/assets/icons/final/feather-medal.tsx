import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMedal = React.forwardRef(function SvgFeatherMedal(
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
          <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
          <path d="M11 12 5.12 2.2" />
          <path d="m13 12 5.88-9.8" />
          <path d="M8 7h8" />
          <circle cx={12} cy={17} r={5} />
          <path d="M12 18v-2h-.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMedal
