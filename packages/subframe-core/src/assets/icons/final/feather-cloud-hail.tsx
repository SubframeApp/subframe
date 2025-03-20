import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCloudHail = React.forwardRef(function SvgFeatherCloudHail(
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
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M16 14v2" />
          <path d="M8 14v2" />
          <path d="M16 20h.01" />
          <path d="M8 20h.01" />
          <path d="M12 16v2" />
          <path d="M12 22h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCloudHail
