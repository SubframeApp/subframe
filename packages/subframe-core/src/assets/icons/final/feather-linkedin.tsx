import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLinkedin = React.forwardRef(function SvgFeatherLinkedin(
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
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width={4} height={12} x={2} y={9} />
          <circle cx={4} cy={4} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLinkedin
