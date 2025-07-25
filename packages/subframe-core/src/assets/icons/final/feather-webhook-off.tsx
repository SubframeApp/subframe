import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherWebhookOff = React.forwardRef(function SvgFeatherWebhookOff(
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
          <path d="M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15" />
          <path d="M9 3.4a4 4 0 0 1 6.52.66" />
          <path d="m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05" />
          <path d="M20.3 20.3a4 4 0 0 1-2.3.7" />
          <path d="M18.6 13a4 4 0 0 1 3.357 3.414" />
          <path d="m12 6 .6 1" />
          <path d="m2 2 20 20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherWebhookOff
