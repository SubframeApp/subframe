import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGitCompareArrows = React.forwardRef(function SvgFeatherGitCompareArrows(
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
          <circle cx={5} cy={6} r={3} />
          <path d="M12 6h5a2 2 0 0 1 2 2v7" />
          <path d="m15 9-3-3 3-3" />
          <circle cx={19} cy={18} r={3} />
          <path d="M12 18H7a2 2 0 0 1-2-2V9" />
          <path d="m9 15 3 3-3 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGitCompareArrows
