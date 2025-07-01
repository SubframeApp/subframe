import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBatteryPlus = React.forwardRef(function SvgFeatherBatteryPlus(
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
          <path d="M10 9v6" />
          <path d="M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605" />
          <path d="M22 14v-4" />
          <path d="M7 12h6" />
          <path d="M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBatteryPlus
