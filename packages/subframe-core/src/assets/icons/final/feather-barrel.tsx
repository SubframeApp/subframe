import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBarrel = React.forwardRef(function SvgFeatherBarrel(
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
          <path d="M10 3a41 41 0 0 0 0 18" />
          <path d="M14 3a41 41 0 0 1 0 18" />
          <path d="M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z" />
          <path d="M3.84 17h16.32" />
          <path d="M3.84 7h16.32" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBarrel
