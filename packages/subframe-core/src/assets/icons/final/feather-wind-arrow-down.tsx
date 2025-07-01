import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherWindArrowDown = React.forwardRef(function SvgFeatherWindArrowDown(
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
          <path d="M10 2v8" />
          <path d="M12.8 21.6A2 2 0 1 0 14 18H2" />
          <path d="M17.5 10a2.5 2.5 0 1 1 2 4H2" />
          <path d="m6 6 4 4 4-4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherWindArrowDown
