import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRainbow = React.forwardRef(function SvgFeatherRainbow(
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
          <path d="M22 17a10 10 0 0 0-20 0" />
          <path d="M6 17a6 6 0 0 1 12 0" />
          <path d="M10 17a2 2 0 0 1 4 0" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRainbow
