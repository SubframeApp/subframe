import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBookKey = React.forwardRef(function SvgFeatherBookKey(
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H14" />
          <path d="M20 8v14H6.5a2.5 2.5 0 0 1 0-5H20" />
          <circle cx={14} cy={8} r={2} />
          <path d="m20 2-4.5 4.5" />
          <path d="m19 3 1 1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBookKey
