import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChurch = React.forwardRef(function SvgFeatherChurch(
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
          <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2" />
          <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
          <path d="M18 22V5l-6-3-6 3v17" />
          <path d="M12 7v5" />
          <path d="M10 9h4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChurch
