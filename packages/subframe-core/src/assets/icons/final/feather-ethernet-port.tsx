import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherEthernetPort = React.forwardRef(function SvgFeatherEthernetPort(
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
          <path d="m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z" />
          <path d="M6 8v1" />
          <path d="M10 8v1" />
          <path d="M14 8v1" />
          <path d="M18 8v1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherEthernetPort
