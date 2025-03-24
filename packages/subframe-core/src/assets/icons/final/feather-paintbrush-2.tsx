import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPaintbrush2 = React.forwardRef(function SvgFeatherPaintbrush2(
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
          <path d="M14 19.9V16h3a2 2 0 0 0 2-2v-2H5v2c0 1.1.9 2 2 2h3v3.9a2 2 0 1 0 4 0Z" />
          <path d="M6 12V2h12v10" />
          <path d="M14 2v4" />
          <path d="M10 2v2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPaintbrush2
