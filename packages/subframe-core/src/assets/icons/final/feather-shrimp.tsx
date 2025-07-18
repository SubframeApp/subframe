import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShrimp = React.forwardRef(function SvgFeatherShrimp(
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
          <path d="M11 12h.01" />
          <path d="M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" />
          <path d="M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8" />
          <path d="M14 8a8.5 8.5 0 0 1 0 8" />
          <path d="M16 16c2 0 4.5-4 4-6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShrimp
