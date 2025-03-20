import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGitBranch = React.forwardRef(function SvgFeatherGitBranch(
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
          <line x1={6} x2={6} y1={3} y2={15} />
          <circle cx={18} cy={6} r={3} />
          <circle cx={6} cy={18} r={3} />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGitBranch
