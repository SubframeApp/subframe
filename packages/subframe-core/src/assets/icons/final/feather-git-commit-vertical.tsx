import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGitCommitVertical = React.forwardRef(function SvgFeatherGitCommitVertical(
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
          <path d="M12 3v6" />
          <circle cx={12} cy={12} r={3} />
          <path d="M12 15v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGitCommitVertical
