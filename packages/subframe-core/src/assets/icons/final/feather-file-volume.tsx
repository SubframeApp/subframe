import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileVolume = React.forwardRef(function SvgFeatherFileVolume(
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
          <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m7 10-3 2H2v4h2l3 2v-8Z" />
          <path d="M11 11c.64.8 1 1.87 1 3s-.36 2.2-1 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileVolume
