import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMapPlus = React.forwardRef(function SvgFeatherMapPlus(
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
          <path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12" />
          <path d="M15 5.764V12" />
          <path d="M18 15v6" />
          <path d="M21 18h-6" />
          <path d="M9 3.236v15" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMapPlus
