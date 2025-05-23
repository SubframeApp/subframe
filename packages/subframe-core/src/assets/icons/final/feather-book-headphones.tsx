import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBookHeadphones = React.forwardRef(function SvgFeatherBookHeadphones(
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <circle cx={9} cy={12} r={1} />
          <path d="M8 12v-2a4 4 0 0 1 8 0v2" />
          <circle cx={15} cy={12} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBookHeadphones
