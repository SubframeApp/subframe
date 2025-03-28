import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBean = React.forwardRef(function SvgFeatherBean(
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
          <path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z" />
          <path d="M5.341 10.62a4 4 0 1 0 5.279-5.28" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBean
