import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLampDesk = React.forwardRef(function SvgFeatherLampDesk(
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
          <path d="m14 5-3 3 2 7 8-8-7-2Z" />
          <path d="m14 5-3 3-3-3 3-3 3 3Z" />
          <path d="M9.5 6.5 4 12l3 6" />
          <path d="M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLampDesk
