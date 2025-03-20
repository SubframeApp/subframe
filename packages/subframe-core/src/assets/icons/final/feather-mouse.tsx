import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMouse = React.forwardRef(function SvgFeatherMouse(
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
          <rect x={5} y={2} width={14} height={20} rx={7} />
          <path d="M12 6v4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMouse
