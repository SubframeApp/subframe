import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTruck = React.forwardRef(function SvgFeatherTruck(
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
          <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
          <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
          <circle cx={7} cy={18} r={2} />
          <path d="M15 18H9" />
          <circle cx={17} cy={18} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTruck
