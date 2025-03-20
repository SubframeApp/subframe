import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquareCornerBl = React.forwardRef(function SvgFeatherSquareCornerBl(
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
          <path d="M3.00501 15.995L3.00501 18.995C3.00501 19.5254 3.21572 20.0341 3.59079 20.4092C3.96586 20.7843 4.47457 20.995 5.005 20.995L8.005 20.995M21.005 20.995L20.995 20.995M21.005 2.995L20.995 2.995M3.00501 2.99499L2.99501 2.99499" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquareCornerBl
