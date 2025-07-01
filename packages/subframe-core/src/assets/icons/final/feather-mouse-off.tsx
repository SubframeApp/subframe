import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMouseOff = React.forwardRef(function SvgFeatherMouseOff(
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
          <path d="M12 6v.343" />
          <path d="M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218" />
          <path d="M19 13.343V9A7 7 0 0 0 8.56 2.902" />
          <path d="M22 22 2 2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMouseOff
