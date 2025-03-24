import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCloudMoon = React.forwardRef(function SvgFeatherCloudMoon(
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
          <path d="M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z" />
          <path d="M10.1 9A6 6 0 0 1 16 4a4.24 4.24 0 0 0 6 6 6 6 0 0 1-3 5.197" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCloudMoon
