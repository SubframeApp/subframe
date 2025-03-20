import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGitPullRequestCreate = React.forwardRef(function SvgFeatherGitPullRequestCreate(
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
          <circle cx={6} cy={6} r={3} />
          <path d="M6 9v12" />
          <path d="M13 6h3a2 2 0 0 1 2 2v3" />
          <path d="M18 15v6" />
          <path d="M21 18h-6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGitPullRequestCreate
