import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGitCompare = React.forwardRef(function SvgFeatherGitCompare(
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
          <circle cx={18} cy={18} r={3} />
          <circle cx={6} cy={6} r={3} />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <path d="M11 18H8a2 2 0 0 1-2-2V9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGitCompare
