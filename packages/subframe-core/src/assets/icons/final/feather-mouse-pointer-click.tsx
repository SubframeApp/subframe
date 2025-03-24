import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMousePointerClick = React.forwardRef(function SvgFeatherMousePointerClick(
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
          <path d="m9 9 5 12 1.8-5.2L21 14Z" />
          <path d="M7.2 2.2 8 5.1" />
          <path d="m5.1 8-2.9-.8" />
          <path d="M14 4.1 12 6" />
          <path d="m6 12-1.9 2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMousePointerClick
