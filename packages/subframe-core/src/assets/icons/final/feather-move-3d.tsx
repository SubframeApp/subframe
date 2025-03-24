import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMove3D = React.forwardRef(function SvgFeatherMove3D(
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
          <path d="M5 3v16h16" />
          <path d="m5 19 6-6" />
          <path d="m2 6 3-3 3 3" />
          <path d="m18 16 3 3-3 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMove3D
