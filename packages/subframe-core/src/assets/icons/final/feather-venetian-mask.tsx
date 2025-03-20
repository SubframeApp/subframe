import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVenetianMask = React.forwardRef(function SvgFeatherVenetianMask(
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
          <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z" />
          <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z" />
          <path d="M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVenetianMask
