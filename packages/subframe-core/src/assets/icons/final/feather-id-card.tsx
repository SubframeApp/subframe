import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherIdCard = React.forwardRef(function SvgFeatherIdCard(
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
          <path d="M16 10h2" />
          <path d="M16 14h2" />
          <path d="M6.17 15a3 3 0 0 1 5.66 0" />
          <circle cx={9} cy={11} r={2} />
          <rect x={2} y={5} width={20} height={14} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherIdCard
