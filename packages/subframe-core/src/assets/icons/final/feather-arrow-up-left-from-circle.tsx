import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowUpLeftFromCircle = React.forwardRef(function SvgFeatherArrowUpLeftFromCircle(
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
          <path d="M2 8V2h6" />
          <path d="m2 2 10 10" />
          <path d="M12 2A10 10 0 1 1 2 12" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowUpLeftFromCircle
