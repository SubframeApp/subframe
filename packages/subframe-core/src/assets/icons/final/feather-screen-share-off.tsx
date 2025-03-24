import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherScreenShareOff = React.forwardRef(function SvgFeatherScreenShareOff(
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
          <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="m22 3-5 5" />
          <path d="m17 3 5 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherScreenShareOff
