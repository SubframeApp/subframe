import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSiren = React.forwardRef(function SvgFeatherSiren(
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
          <path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v6H7v-6Z" />
          <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2H5v-2Z" />
          <path d="M21 12h1" />
          <path d="M18.5 4.5 18 5" />
          <path d="M2 12h1" />
          <path d="M12 2v1" />
          <path d="m4.929 4.929.707.707" />
          <path d="M12 12v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSiren
