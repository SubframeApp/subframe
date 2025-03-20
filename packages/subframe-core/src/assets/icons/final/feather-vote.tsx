import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVote = React.forwardRef(function SvgFeatherVote(
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
          <path d="m9 12 2 2 4-4" />
          <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
          <path d="M22 19H2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVote
