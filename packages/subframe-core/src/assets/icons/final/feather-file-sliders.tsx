import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileSliders = React.forwardRef(function SvgFeatherFileSliders(
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
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M8 12h8" />
          <path d="M10 11v2" />
          <path d="M8 17h8" />
          <path d="M14 16v2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileSliders
