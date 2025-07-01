import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGlobeLock = React.forwardRef(function SvgFeatherGlobeLock(
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
          <path d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13" />
          <path d="M2 12h8.5" />
          <path d="M20 6V4a2 2 0 1 0-4 0v2" />
          <rect width={8} height={5} x={14} y={6} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGlobeLock
