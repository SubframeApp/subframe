import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTrainTrack = React.forwardRef(function SvgFeatherTrainTrack(
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
          <path d="M2 17 17 2" />
          <path d="m2 14 8 8" />
          <path d="m5 11 8 8" />
          <path d="m8 8 8 8" />
          <path d="m11 5 8 8" />
          <path d="m14 2 8 8" />
          <path d="M7 22 22 7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTrainTrack
