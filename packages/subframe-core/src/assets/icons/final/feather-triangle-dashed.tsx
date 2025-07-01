import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTriangleDashed = React.forwardRef(function SvgFeatherTriangleDashed(
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
          <path d="M10.17 4.193a2 2 0 0 1 3.666.013" />
          <path d="M14 21h2" />
          <path d="m15.874 7.743 1 1.732" />
          <path d="m18.849 12.952 1 1.732" />
          <path d="M21.824 18.18a2 2 0 0 1-1.835 2.824" />
          <path d="M4.024 21a2 2 0 0 1-1.839-2.839" />
          <path d="m5.136 12.952-1 1.732" />
          <path d="M8 21h2" />
          <path d="m8.102 7.743-1 1.732" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTriangleDashed
