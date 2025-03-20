import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareCornerTr = React.forwardRef(function SvgFeatherSquareCornerTr(
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
          <path d="M20.995 7.995V4.995C20.995 4.46456 20.7843 3.95585 20.4092 3.58078C20.0341 3.20571 19.5254 2.995 18.995 2.995H15.995M2.995 2.995H3.005M2.995 20.995H3.005M20.995 20.995H21.005" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareCornerTr
