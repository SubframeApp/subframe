import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLampFloor = React.forwardRef(function SvgFeatherLampFloor(
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
          <path d="M9 2h6l3 7H6l3-7Z" />
          <path d="M12 9v13" />
          <path d="M9 22h6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLampFloor
