import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCloudMoonRain = React.forwardRef(function SvgFeatherCloudMoonRain(
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
          <path d="M10.083 9A6.002 6.002 0 0 1 16 4a4.243 4.243 0 0 0 6 6c0 2.22-1.206 4.16-3 5.197" />
          <path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" />
          <path d="M11 20v2" />
          <path d="M7 19v2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCloudMoonRain
