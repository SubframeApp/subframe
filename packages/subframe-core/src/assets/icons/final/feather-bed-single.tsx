import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBedSingle = React.forwardRef(function SvgFeatherBedSingle(
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
          <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
          <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
          <path d="M3 18h18" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBedSingle
