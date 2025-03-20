import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBellPlus = React.forwardRef(function SvgFeatherBellPlus(
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
          <path d="M19.3 14.8C20.1 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 1 0 1.9.2 2.8.7" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          <path d="M15 8h6" />
          <path d="M18 5v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBellPlus
