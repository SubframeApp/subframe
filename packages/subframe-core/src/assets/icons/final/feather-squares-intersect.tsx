import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquaresIntersect = React.forwardRef(function SvgFeatherSquaresIntersect(
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
          <path d="M10 22a2 2 0 0 1-2-2" />
          <path d="M14 2a2 2 0 0 1 2 2" />
          <path d="M16 22h-2" />
          <path d="M2 10V8" />
          <path d="M2 4a2 2 0 0 1 2-2" />
          <path d="M20 8a2 2 0 0 1 2 2" />
          <path d="M22 14v2" />
          <path d="M22 20a2 2 0 0 1-2 2" />
          <path d="M4 16a2 2 0 0 1-2-2" />
          <path d="M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z" />
          <path d="M8 2h2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquaresIntersect
