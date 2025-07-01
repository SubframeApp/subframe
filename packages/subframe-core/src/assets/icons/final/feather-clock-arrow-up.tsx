import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherClockArrowUp = React.forwardRef(function SvgFeatherClockArrowUp(
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
          <path d="M13.228 21.925A10 10 0 1 1 21.994 12.338" />
          <path d="M12 6v6l1.562.781" />
          <path d="m14 18 4-4 4 4" />
          <path d="M18 22v-8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherClockArrowUp
