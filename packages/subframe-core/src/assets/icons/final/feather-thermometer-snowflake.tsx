import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherThermometerSnowflake = React.forwardRef(function SvgFeatherThermometerSnowflake(
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
          <path d="M2 12h10" />
          <path d="M9 4v16" />
          <path d="m3 9 3 3-3 3" />
          <path d="M12 6 9 9 6 6" />
          <path d="m6 18 3-3 1.5 1.5" />
          <path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherThermometerSnowflake
