import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLamp = React.forwardRef(function SvgFeatherLamp(
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
          <path d="M8 2h8l4 10H4L8 2Z" />
          <path d="M12 12v6" />
          <path d="M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLamp
