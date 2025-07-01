import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGeorgianLari = React.forwardRef(function SvgFeatherGeorgianLari(
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
          <path d="M11.5 21a7.5 7.5 0 1 1 7.35-9" />
          <path d="M13 12V3" />
          <path d="M4 21h16" />
          <path d="M9 12V3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGeorgianLari
