import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareDashedBottomCode = React.forwardRef(function SvgFeatherSquareDashedBottomCode(
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
          <path d="m10 10-2 2 2 2" />
          <path d="m14 14 2-2-2-2" />
          <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" />
          <path d="M9 21h1" />
          <path d="M14 21h1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareDashedBottomCode
