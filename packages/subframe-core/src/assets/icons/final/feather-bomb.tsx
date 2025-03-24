import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBomb = React.forwardRef(function SvgFeatherBomb(
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
          <circle cx={11} cy={13} r={9} />
          <path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95" />
          <path d="m22 2-1.5 1.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBomb
