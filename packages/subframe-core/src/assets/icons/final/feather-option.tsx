import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherOption = React.forwardRef(function SvgFeatherOption(
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
          <path d="M3 3h6l6 18h6" />
          <path d="M14 3h7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherOption
