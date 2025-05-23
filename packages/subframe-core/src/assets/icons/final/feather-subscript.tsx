import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSubscript = React.forwardRef(function SvgFeatherSubscript(
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
          <path d="m4 5 8 8" />
          <path d="m12 5-8 8" />
          <path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSubscript
