import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherStarHalf = React.forwardRef(function SvgFeatherStarHalf(
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
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherStarHalf
