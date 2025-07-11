import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBubbles = React.forwardRef(function SvgFeatherBubbles(
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
          <path d="M7.2 14.8a2 2 0 0 1 2 2" />
          <circle cx={18.5} cy={8.5} r={3.5} />
          <circle cx={7.5} cy={16.5} r={5.5} />
          <circle cx={7.5} cy={4.5} r={2.5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBubbles
