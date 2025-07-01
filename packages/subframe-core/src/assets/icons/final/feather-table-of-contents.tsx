import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTableOfContents = React.forwardRef(function SvgFeatherTableOfContents(
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
          <path d="M16 12H3" />
          <path d="M16 18H3" />
          <path d="M16 6H3" />
          <path d="M21 12h.01" />
          <path d="M21 18h.01" />
          <path d="M21 6h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTableOfContents
