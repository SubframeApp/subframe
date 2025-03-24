import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLampCeiling = React.forwardRef(function SvgFeatherLampCeiling(
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
          <path d="M12 2v5" />
          <path d="M6 7h12l4 9H2l4-9Z" />
          <path d="M9.17 16a3 3 0 1 0 5.66 0" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLampCeiling
