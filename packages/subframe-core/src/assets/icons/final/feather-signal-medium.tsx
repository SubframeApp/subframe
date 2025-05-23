import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSignalMedium = React.forwardRef(function SvgFeatherSignalMedium(
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
          <path d="M2 20h.01" />
          <path d="M7 20v-4" />
          <path d="M12 20v-8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSignalMedium
