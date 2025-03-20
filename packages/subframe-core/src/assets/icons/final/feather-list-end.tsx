import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListEnd = React.forwardRef(function SvgFeatherListEnd(
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
          <path d="M16 12H3" />
          <path d="M16 6H3" />
          <path d="M10 18H3" />
          <path d="M21 6v10a2 2 0 0 1-2 2h-5" />
          <path d="m16 16-2 2 2 2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListEnd
