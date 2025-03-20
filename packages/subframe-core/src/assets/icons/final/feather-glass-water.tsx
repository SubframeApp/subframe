import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGlassWater = React.forwardRef(function SvgFeatherGlassWater(
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
          <path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z" />
          <path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGlassWater
