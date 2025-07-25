import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGrid2X2X = React.forwardRef(function SvgFeatherGrid2X2X(
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
          <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
          <path d="m16 16 5 5" />
          <path d="m16 21 5-5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGrid2X2X
