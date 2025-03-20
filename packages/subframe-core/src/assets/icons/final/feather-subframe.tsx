import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSubframe = React.forwardRef(function SvgFeatherSubframe(
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
          <path d="M21 14C21 15.6569 19.6569 17 18 17C16.3431 17 15 15.6569 15 14C15 12.3431 16.3431 11 18 11C19.6569 11 21 12.3431 21 14Z" />
          <path d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V6C22 7.10457 21.1046 8 20 8H4C2.89543 8 2 7.10457 2 6V4Z" />
          <path d="M14.2886 19.0084L4.61255 12.3001C3.51209 11.5372 2 12.3169 2 13.6473L2 20.3556C2 21.2638 2.74338 22 3.66038 22H13.3365C14.9599 22 15.6186 19.9304 14.2886 19.0084Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSubframe
