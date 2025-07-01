import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserRoundCog = React.forwardRef(function SvgFeatherUserRoundCog(
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
          <path d="m14.305 19.53.923-.382" />
          <path d="m15.228 16.852-.923-.383" />
          <path d="m16.852 15.228-.383-.923" />
          <path d="m16.852 20.772-.383.924" />
          <path d="m19.148 15.228.383-.923" />
          <path d="m19.53 21.696-.382-.924" />
          <path d="M2 21a8 8 0 0 1 10.434-7.62" />
          <path d="m20.772 16.852.924-.383" />
          <path d="m20.772 19.148.924.383" />
          <circle cx={10} cy={8} r={5} />
          <circle cx={18} cy={18} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserRoundCog
