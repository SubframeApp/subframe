import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherEyeClosed = React.forwardRef(function SvgFeatherEyeClosed(
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
          <path d="m15 18-.722-3.25" />
          <path d="M2 8a10.645 10.645 0 0 0 20 0" />
          <path d="m20 15-1.726-2.05" />
          <path d="m4 15 1.726-2.05" />
          <path d="m9 18 .722-3.25" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherEyeClosed
