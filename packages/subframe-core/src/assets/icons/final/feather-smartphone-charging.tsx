import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSmartphoneCharging = React.forwardRef(function SvgFeatherSmartphoneCharging(
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
          <rect width={14} height={20} x={5} y={2} rx={2} ry={2} />
          <path d="M12.667 8 10 12h4l-2.667 4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSmartphoneCharging
