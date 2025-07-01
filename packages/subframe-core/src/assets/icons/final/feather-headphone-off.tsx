import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherHeadphoneOff = React.forwardRef(function SvgFeatherHeadphoneOff(
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
          <path d="M21 14h-1.343" />
          <path d="M9.128 3.47A9 9 0 0 1 21 12v3.343" />
          <path d="m2 2 20 20" />
          <path d="M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3" />
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherHeadphoneOff
