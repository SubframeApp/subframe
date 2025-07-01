import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRotateCwSquare = React.forwardRef(function SvgFeatherRotateCwSquare(
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
          <path d="M12 5H6a2 2 0 0 0-2 2v3" />
          <path d="m9 8 3-3-3-3" />
          <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRotateCwSquare
