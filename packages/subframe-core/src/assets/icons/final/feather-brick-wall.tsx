import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBrickWall = React.forwardRef(function SvgFeatherBrickWall(
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
          <rect width={18} height={18} x={3} y={3} rx={2} />
          <path d="M12 9v6" />
          <path d="M16 15v6" />
          <path d="M16 3v6" />
          <path d="M3 15h18" />
          <path d="M3 9h18" />
          <path d="M8 15v6" />
          <path d="M8 3v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBrickWall
