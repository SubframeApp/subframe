import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherImages = React.forwardRef(function SvgFeatherImages(
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
          <path d="M18 22H4a2 2 0 0 1-2-2V6" />
          <path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" />
          <circle cx={12} cy={8} r={2} />
          <rect width={16} height={16} x={6} y={2} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherImages
