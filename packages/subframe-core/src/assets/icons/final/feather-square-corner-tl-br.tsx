import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareCornerTlBr = React.forwardRef(function SvgFeatherSquareCornerTlBr(
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
          <path d="M16.005 20.995L19.005 20.995C19.5354 20.995 20.0441 20.7843 20.4192 20.4092C20.7943 20.0341 21.005 19.5254 21.005 18.995L21.005 15.995M8.005 2.99499L5.005 2.99499C4.47457 2.99499 3.96586 3.20571 3.59079 3.58078C3.21572 3.95585 3.005 4.46456 3.005 4.99499L3.005 7.99499M21.005 2.995L21.005 3.005M3.005 20.995L3.005 21.005" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareCornerTlBr
