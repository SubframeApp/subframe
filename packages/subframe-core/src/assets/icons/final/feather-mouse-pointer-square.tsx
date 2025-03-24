import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMousePointerSquare = React.forwardRef(function SvgFeatherMousePointerSquare(
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
          <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
          <path d="m12 12 4 10 1.7-4.3L22 16Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMousePointerSquare
