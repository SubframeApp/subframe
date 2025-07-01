import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMessageCirclePlus = React.forwardRef(function SvgFeatherMessageCirclePlus(
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
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMessageCirclePlus
