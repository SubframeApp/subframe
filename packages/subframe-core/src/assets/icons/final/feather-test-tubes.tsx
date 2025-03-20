import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTestTubes = React.forwardRef(function SvgFeatherTestTubes(
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
          <path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22v0A2.5 2.5 0 0 1 4 19.5V2" />
          <path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5V2" />
          <path d="M3 2h7" />
          <path d="M14 2h7" />
          <path d="M9 16H4" />
          <path d="M20 16h-5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTestTubes
