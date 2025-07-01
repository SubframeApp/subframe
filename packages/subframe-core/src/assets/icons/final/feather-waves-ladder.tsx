import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherWavesLadder = React.forwardRef(function SvgFeatherWavesLadder(
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
          <path d="M19 5a2 2 0 0 0-2 2v11" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M7 13h10" />
          <path d="M7 9h10" />
          <path d="M9 5a2 2 0 0 0-2 2v11" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherWavesLadder
