import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPilcrowLeft = React.forwardRef(function SvgFeatherPilcrowLeft(
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
          <path d="M14 3v11" />
          <path d="M14 9h-3a3 3 0 0 1 0-6h9" />
          <path d="M18 3v11" />
          <path d="M22 18H2l4-4" />
          <path d="m6 22-4-4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPilcrowLeft
