import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBookA = React.forwardRef(function SvgFeatherBookA(
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="m8 13 4-7 4 7" />
          <path d="M9.1 11h5.7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBookA
