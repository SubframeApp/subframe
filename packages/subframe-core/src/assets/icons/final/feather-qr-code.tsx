import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherQrCode = React.forwardRef(function SvgFeatherQrCode(
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
          <rect width={5} height={5} x={3} y={3} rx={1} />
          <rect width={5} height={5} x={16} y={3} rx={1} />
          <rect width={5} height={5} x={3} y={16} rx={1} />
          <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
          <path d="M21 21v.01" />
          <path d="M12 7v3a2 2 0 0 1-2 2H7" />
          <path d="M3 12h.01" />
          <path d="M12 3h.01" />
          <path d="M12 16v.01" />
          <path d="M16 12h1" />
          <path d="M21 12v.01" />
          <path d="M12 21v-1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherQrCode
