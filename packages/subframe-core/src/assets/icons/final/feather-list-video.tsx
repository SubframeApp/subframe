import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListVideo = React.forwardRef(function SvgFeatherListVideo(
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
          <path d="M12 12H3" />
          <path d="M16 6H3" />
          <path d="M12 18H3" />
          <path d="m16 12 5 3-5 3v-6Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListVideo
