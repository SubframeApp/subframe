import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDrum = React.forwardRef(function SvgFeatherDrum(
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
          <path d="m2 2 8 8" />
          <path d="m22 2-8 8" />
          <ellipse cx={12} cy={9} rx={10} ry={5} />
          <path d="M7 13.4v7.9" />
          <path d="M12 14v8" />
          <path d="M17 13.4v7.9" />
          <path d="M2 9v8a10 5 0 0 0 20 0V9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDrum
