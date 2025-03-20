import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSwissFranc = React.forwardRef(function SvgFeatherSwissFranc(
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
          <path d="M10 21V3h8" />
          <path d="M6 16h9" />
          <path d="M10 9.5h7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSwissFranc
