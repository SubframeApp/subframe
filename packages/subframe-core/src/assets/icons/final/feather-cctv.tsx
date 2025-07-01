import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCctv = React.forwardRef(function SvgFeatherCctv(
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
          <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
          <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
          <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
          <path d="M2 21v-4" />
          <path d="M7 9h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCctv
