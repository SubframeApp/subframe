import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSaveAll = React.forwardRef(function SvgFeatherSaveAll(
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
          <path d="M6 4a2 2 0 0 1 2-2h10l4 4v10.2a2 2 0 0 1-2 1.8H8a2 2 0 0 1-2-2Z" />
          <path d="M10 2v4h6" />
          <path d="M18 18v-7h-8v7" />
          <path d="M18 22H4a2 2 0 0 1-2-2V6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSaveAll
