import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLandPlot = React.forwardRef(function SvgFeatherLandPlot(
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
          <path d="m12 8 6-3-6-3v10" />
          <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
          <path d="m6.49 12.85 11.02 6.3" />
          <path d="M17.51 12.85 6.5 19.15" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLandPlot
