import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPointerOff = React.forwardRef(function SvgFeatherPointerOff(
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
          <path d="M10 4.5V4a2 2 0 0 0-2.41-1.957" />
          <path d="M13.9 8.4a2 2 0 0 0-1.26-1.295" />
          <path d="M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158" />
          <path d="m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343" />
          <path d="M6 6v8" />
          <path d="m2 2 20 20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPointerOff
