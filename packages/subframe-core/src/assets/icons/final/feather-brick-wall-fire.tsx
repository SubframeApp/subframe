import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBrickWallFire = React.forwardRef(function SvgFeatherBrickWallFire(
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
          <path d="M16 3v2.107" />
          <path d="M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9" />
          <path d="M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938" />
          <path d="M3 15h5.253" />
          <path d="M3 9h8.228" />
          <path d="M8 15v6" />
          <path d="M8 3v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBrickWallFire
