import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGitCommit = React.forwardRef(function SvgFeatherGitCommit(
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
          <circle cx={12} cy={12} r={3} />
          <line x1={3} y1={12} x2={9} y2={12} />
          <line x1={15} y1={12} x2={21} y2={12} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGitCommit
