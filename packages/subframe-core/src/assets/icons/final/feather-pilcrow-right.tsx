import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPilcrowRight = React.forwardRef(function SvgFeatherPilcrowRight(
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
          <path d="M10 3v11" />
          <path d="M10 9H7a1 1 0 0 1 0-6h8" />
          <path d="M14 3v11" />
          <path d="m18 14 4 4H2" />
          <path d="m22 18-4 4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPilcrowRight
