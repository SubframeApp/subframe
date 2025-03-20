import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMailbox = React.forwardRef(function SvgFeatherMailbox(
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
          <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
          <polyline points="15,9 18,9 18,11" />
          <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
          <line x1={6} x2={7} y1={10} y2={10} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMailbox
