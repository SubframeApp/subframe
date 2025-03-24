import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVideoOff = React.forwardRef(function SvgFeatherVideoOff(
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
          <path d="M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8" />
          <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z" />
          <line x1={2} x2={22} y1={2} y2={22} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVideoOff
