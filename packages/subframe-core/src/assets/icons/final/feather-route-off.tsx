import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRouteOff = React.forwardRef(function SvgFeatherRouteOff(
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
          <path d="M9 19h8.5c.4 0 .9-.1 1.3-.2" />
          <path d="M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12" />
          <path d="m2 2 20 20" />
          <path d="M21 15.3a3.5 3.5 0 0 0-3.3-3.3" />
          <path d="M15 5h-4.3" />
          <circle cx={18} cy={5} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRouteOff
