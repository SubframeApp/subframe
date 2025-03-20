import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGalleryVerticalEnd = React.forwardRef(function SvgFeatherGalleryVerticalEnd(
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
          <path d="M7 2h10" />
          <path d="M5 6h14" />
          <rect width={18} height={12} x={3} y={10} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGalleryVerticalEnd
