import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDiscAlbum = React.forwardRef(function SvgFeatherDiscAlbum(
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
          <rect width={18} height={18} x={3} y={3} rx={2} />
          <circle cx={12} cy={12} r={5} />
          <path d="M12 12h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDiscAlbum
