import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFlipHorizontal2 = React.forwardRef(function SvgFeatherFlipHorizontal2(
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
          <path d="m3 7 5 5-5 5V7" />
          <path d="m21 7-5 5 5 5V7" />
          <path d="M12 20v2" />
          <path d="M12 14v2" />
          <path d="M12 8v2" />
          <path d="M12 2v2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFlipHorizontal2
