import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListFilterPlus = React.forwardRef(function SvgFeatherListFilterPlus(
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
          <path d="M10 18h4" />
          <path d="M11 6H3" />
          <path d="M15 6h6" />
          <path d="M18 9V3" />
          <path d="M7 12h8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListFilterPlus
