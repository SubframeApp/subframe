import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTheater = React.forwardRef(function SvgFeatherTheater(
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
          <path d="M2 10s3-3 3-8" />
          <path d="M22 10s-3-3-3-8" />
          <path d="M10 2c0 4.4-3.6 8-8 8" />
          <path d="M14 2c0 4.4 3.6 8 8 8" />
          <path d="M2 10s2 2 2 5" />
          <path d="M22 10s-2 2-2 5" />
          <path d="M8 15h8" />
          <path d="M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
          <path d="M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTheater
