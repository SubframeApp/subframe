import * as React from "react"
import type { SVGProps } from "react"
const SvgFeatherWaypoints = (props: SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <circle cx={12} cy={4.5} r={2.5} />
    <path d="m10.2 6.3-3.9 3.9" />
    <circle cx={4.5} cy={12} r={2.5} />
    <path d="M7 12h10" />
    <circle cx={19.5} cy={12} r={2.5} />
    <path d="m13.8 17.7 3.9-3.9" />
    <circle cx={12} cy={19.5} r={2.5} />
  </svg>
)
export default SvgFeatherWaypoints
