import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherClockArrowDown = React.forwardRef(function SvgFeatherClockArrowDown(
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
          <path d="M12.338 21.994A10 10 0 1 1 21.925 13.227" />
          <path d="M12 6v6l2 1" />
          <path d="m14 18 4 4 4-4" />
          <path d="M18 14v8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherClockArrowDown
