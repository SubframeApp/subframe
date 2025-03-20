import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherThermometerSun = React.forwardRef(function SvgFeatherThermometerSun(
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
          <path d="M12 9a4 4 0 0 0-2 7.5" />
          <path d="M12 3v2" />
          <path d="m6.6 18.4-1.4 1.4" />
          <path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
          <path d="M4 13H2" />
          <path d="M6.34 7.34 4.93 5.93" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherThermometerSun
