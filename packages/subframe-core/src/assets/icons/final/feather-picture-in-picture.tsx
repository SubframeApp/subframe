import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPictureInPicture = React.forwardRef(function SvgFeatherPictureInPicture(
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
          <path d="M8 4.5v5H3m-1-6 6 6m13 0v-3c0-1.16-.84-2-2-2h-7m-9 9v2c0 1.05.95 2 2 2h3" />
          <rect width={10} height={7} x={12} y={13.5} ry={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPictureInPicture
