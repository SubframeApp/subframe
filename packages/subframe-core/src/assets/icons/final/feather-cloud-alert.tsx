import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCloudAlert = React.forwardRef(function SvgFeatherCloudAlert(
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
          <path d="M12 12v4" />
          <path d="M12 20h.01" />
          <path d="M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCloudAlert
