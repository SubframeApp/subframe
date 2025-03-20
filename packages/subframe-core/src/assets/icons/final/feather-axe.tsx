import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAxe = React.forwardRef(function SvgFeatherAxe(
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
          <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
          <path d="M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAxe
