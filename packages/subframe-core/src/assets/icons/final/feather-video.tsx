import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVideo = React.forwardRef(function SvgFeatherVideo(
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
          <path d="m22 8-6 4 6 4V8Z" />
          <rect width={14} height={12} x={2} y={6} rx={2} ry={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVideo
