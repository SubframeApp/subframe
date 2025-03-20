import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMousePointer2 = React.forwardRef(function SvgFeatherMousePointer2(
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
          <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMousePointer2
