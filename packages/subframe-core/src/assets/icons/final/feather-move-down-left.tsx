import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMoveDownLeft = React.forwardRef(function SvgFeatherMoveDownLeft(
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
          <path d="M11 19H5V13" />
          <path d="M19 5L5 19" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMoveDownLeft
