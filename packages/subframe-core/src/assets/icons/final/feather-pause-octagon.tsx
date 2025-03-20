import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPauseOctagon = React.forwardRef(function SvgFeatherPauseOctagon(
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
          <path d="M10 15V9" />
          <path d="M14 15V9" />
          <path d="M7.714 2h8.572L22 7.714v8.572L16.286 22H7.714L2 16.286V7.714L7.714 2z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPauseOctagon
