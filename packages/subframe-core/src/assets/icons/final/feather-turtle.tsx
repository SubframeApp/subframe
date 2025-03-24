import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTurtle = React.forwardRef(function SvgFeatherTurtle(
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
          <path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z" />
          <path d="M4.82 7.9 8 10" />
          <path d="M15.18 7.9 12 10" />
          <path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTurtle
