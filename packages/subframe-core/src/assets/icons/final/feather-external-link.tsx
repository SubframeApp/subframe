import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherExternalLink = React.forwardRef(function SvgFeatherExternalLink(
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
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1={10} x2={21} y1={14} y2={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherExternalLink
