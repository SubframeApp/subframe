import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTrainFront = React.forwardRef(function SvgFeatherTrainFront(
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
          <path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
          <path d="m9 15-1-1" />
          <path d="m15 15 1-1" />
          <path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
          <path d="m8 19-2 3" />
          <path d="m16 19 2 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTrainFront
