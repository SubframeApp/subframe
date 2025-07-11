import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAmphora = React.forwardRef(function SvgFeatherAmphora(
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
          <path d="M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8" />
          <path d="M10 5H8a2 2 0 0 0 0 4h.68" />
          <path d="M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8" />
          <path d="M14 5h2a2 2 0 0 1 0 4h-.68" />
          <path d="M18 22H6" />
          <path d="M9 2h6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAmphora
