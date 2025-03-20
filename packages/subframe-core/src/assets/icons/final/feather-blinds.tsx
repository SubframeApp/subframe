import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBlinds = React.forwardRef(function SvgFeatherBlinds(
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
          <path d="M3 3h18" />
          <path d="M20 7H8" />
          <path d="M20 11H8" />
          <path d="M10 19h10" />
          <path d="M8 15h12" />
          <path d="M4 3v14" />
          <circle cx={4} cy={19} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBlinds
