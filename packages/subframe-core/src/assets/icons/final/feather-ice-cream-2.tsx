import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherIceCream2 = React.forwardRef(function SvgFeatherIceCream2(
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
          <path d="M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6Zm-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0" />
          <path d="M12.14 11a3.5 3.5 0 1 1 6.71 0" />
          <path d="M15.5 6.5a3.5 3.5 0 1 0-7 0" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherIceCream2
