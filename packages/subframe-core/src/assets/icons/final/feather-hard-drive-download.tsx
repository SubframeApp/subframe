import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherHardDriveDownload = React.forwardRef(function SvgFeatherHardDriveDownload(
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
          <path d="M12 2v8" />
          <path d="m16 6-4 4-4-4" />
          <rect width={20} height={8} x={2} y={14} rx={2} />
          <path d="M6 18h.01" />
          <path d="M10 18h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherHardDriveDownload
