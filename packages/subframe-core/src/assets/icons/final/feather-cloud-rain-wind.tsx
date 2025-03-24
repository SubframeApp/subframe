import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCloudRainWind = React.forwardRef(function SvgFeatherCloudRainWind(
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
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="m9.2 22 3-7" />
          <path d="m9 13-3 7" />
          <path d="m17 13-3 7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCloudRainWind
