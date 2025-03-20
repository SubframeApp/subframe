import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTentTree = React.forwardRef(function SvgFeatherTentTree(
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
          <circle cx={4} cy={4} r={2} />
          <path d="m14 5 3-3 3 3" />
          <path d="m14 10 3-3 3 3" />
          <path d="M17 14V2" />
          <path d="M17 14H7l-5 8h20Z" />
          <path d="M8 14v8" />
          <path d="m9 14 5 8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTentTree
