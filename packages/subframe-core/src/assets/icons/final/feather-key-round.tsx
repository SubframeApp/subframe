import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherKeyRound = React.forwardRef(function SvgFeatherKeyRound(
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
          <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
          <circle cx={16.5} cy={7.5} r={0.5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherKeyRound
