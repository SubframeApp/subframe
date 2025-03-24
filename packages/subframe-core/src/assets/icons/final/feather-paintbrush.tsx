import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPaintbrush = React.forwardRef(function SvgFeatherPaintbrush(
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
          <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
          <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
          <path d="M14.5 17.5 4.5 15" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPaintbrush
