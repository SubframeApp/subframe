import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFlipVertical2 = React.forwardRef(function SvgFeatherFlipVertical2(
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
          <path d="m17 3-5 5-5-5h10" />
          <path d="m17 21-5-5-5 5h10" />
          <path d="M4 12H2" />
          <path d="M10 12H8" />
          <path d="M16 12h-2" />
          <path d="M22 12h-2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFlipVertical2
