import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLectern = React.forwardRef(function SvgFeatherLectern(
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
          <path d="M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3" />
          <path d="M18 6V3a1 1 0 0 0-1-1h-3" />
          <rect width={8} height={12} x={8} y={10} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLectern
