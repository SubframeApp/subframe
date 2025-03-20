import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShrink = React.forwardRef(function SvgFeatherShrink(
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
          <path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" />
          <path d="M9 19.8V15m0 0H4.2M9 15l-6 6" />
          <path d="M15 4.2V9m0 0h4.8M15 9l6-6" />
          <path d="M9 4.2V9m0 0H4.2M9 9 3 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShrink
