import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVolume = React.forwardRef(function SvgFeatherVolume(
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
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVolume
