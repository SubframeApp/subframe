import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherXTwitter = React.forwardRef(function SvgFeatherXTwitter(
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
          <path d="M10.9455 12.9335L4.77958 20.0189M12.713 10.5025L18.617 3.93292M4.05969 4.0077L7.78324 4.00769L19.9219 20H16.397L4.05969 4.0077Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherXTwitter
