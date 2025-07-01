import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBanknoteArrowUp = React.forwardRef(function SvgFeatherBanknoteArrowUp(
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
          <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
          <path d="M18 12h.01" />
          <path d="M19 22v-6" />
          <path d="m22 19-3-3-3 3" />
          <path d="M6 12h.01" />
          <circle cx={12} cy={12} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBanknoteArrowUp
