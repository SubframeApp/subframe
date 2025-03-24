import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCigaretteOff = React.forwardRef(function SvgFeatherCigaretteOff(
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
          <line x1={2} x2={22} y1={2} y2={22} />
          <path d="M12 12H2v4h14" />
          <path d="M22 12v4" />
          <path d="M18 12h-.5" />
          <path d="M7 12v4" />
          <path d="M18 8c0-2.5-2-2.5-2-5" />
          <path d="M22 8c0-2.5-2-2.5-2-5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCigaretteOff
