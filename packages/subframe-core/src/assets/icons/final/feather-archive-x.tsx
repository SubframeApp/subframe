import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArchiveX = React.forwardRef(function SvgFeatherArchiveX(
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
          <rect width={20} height={5} x={2} y={3} rx={1} />
          <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
          <path d="m9.5 17 5-5" />
          <path d="m9.5 12 5 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArchiveX
