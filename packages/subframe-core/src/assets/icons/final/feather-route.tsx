import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRoute = React.forwardRef(function SvgFeatherRoute(
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
          <circle cx={6} cy={19} r={3} />
          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
          <circle cx={18} cy={5} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRoute
