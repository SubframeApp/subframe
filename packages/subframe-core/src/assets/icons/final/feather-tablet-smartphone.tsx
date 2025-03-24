import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTabletSmartphone = React.forwardRef(function SvgFeatherTabletSmartphone(
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
          <rect width={10} height={14} x={3} y={8} rx={2} />
          <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
          <path d="M8 18h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTabletSmartphone
