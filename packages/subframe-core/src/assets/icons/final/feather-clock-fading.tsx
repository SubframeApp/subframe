import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherClockFading = React.forwardRef(function SvgFeatherClockFading(
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
          <path d="M12 2a10 10 0 0 1 7.38 16.75" />
          <path d="M12 6v6l4 2" />
          <path d="M2.5 8.875a10 10 0 0 0-.5 3" />
          <path d="M2.83 16a10 10 0 0 0 2.43 3.4" />
          <path d="M4.636 5.235a10 10 0 0 1 .891-.857" />
          <path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherClockFading
