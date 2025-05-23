import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPocketKnife = React.forwardRef(function SvgFeatherPocketKnife(
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
          <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" />
          <path d="M18 6h.01" />
          <path d="M6 18h.01" />
          <path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" />
          <path d="M18 11.66V22a4 4 0 0 0 4-4V6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPocketKnife
