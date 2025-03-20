import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGalleryThumbnails = React.forwardRef(function SvgFeatherGalleryThumbnails(
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
          <rect width={18} height={14} x={3} y={3} rx={2} />
          <path d="M4 21h1" />
          <path d="M9 21h1" />
          <path d="M14 21h1" />
          <path d="M19 21h1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGalleryThumbnails
