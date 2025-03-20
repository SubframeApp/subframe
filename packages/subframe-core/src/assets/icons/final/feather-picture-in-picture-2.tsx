import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPictureInPicture2 = React.forwardRef(function SvgFeatherPictureInPicture2(
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
          <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" />
          <rect width={10} height={7} x={12} y={13} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPictureInPicture2
