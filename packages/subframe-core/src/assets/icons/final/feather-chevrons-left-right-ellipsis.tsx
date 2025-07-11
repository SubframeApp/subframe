import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChevronsLeftRightEllipsis = React.forwardRef(function SvgFeatherChevronsLeftRightEllipsis(
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
          <path d="M12 12h.01" />
          <path d="M16 12h.01" />
          <path d="m17 7 5 5-5 5" />
          <path d="m7 7-5 5 5 5" />
          <path d="M8 12h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChevronsLeftRightEllipsis
