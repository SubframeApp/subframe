import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFilterX = React.forwardRef(function SvgFeatherFilterX(
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
          <path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055" />
          <path d="m22 3-5 5" />
          <path d="m17 3 5 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFilterX
