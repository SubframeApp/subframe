import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileAxis3D = React.forwardRef(function SvgFeatherFileAxis3D(
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
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M8 10v8h8" />
          <path d="m8 18 4-4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileAxis3D
