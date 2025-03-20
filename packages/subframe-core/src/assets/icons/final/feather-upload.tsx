import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUpload = React.forwardRef(function SvgFeatherUpload(
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1={12} x2={12} y1={3} y2={15} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUpload
