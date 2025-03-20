import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUmbrellaOff = React.forwardRef(function SvgFeatherUmbrellaOff(
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
          <path d="M12 2v1" />
          <path d="M15.5 21a1.85 1.85 0 0 1-3.5-1v-8H2a10 10 0 0 1 3.428-6.575" />
          <path d="M17.5 12H22A10 10 0 0 0 9.004 3.455" />
          <path d="m2 2 20 20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUmbrellaOff
