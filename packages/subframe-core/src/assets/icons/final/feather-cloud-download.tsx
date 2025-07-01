import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCloudDownload = React.forwardRef(function SvgFeatherCloudDownload(
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
          <path d="M12 13v8l-4-4" />
          <path d="m12 21 4-4" />
          <path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCloudDownload
