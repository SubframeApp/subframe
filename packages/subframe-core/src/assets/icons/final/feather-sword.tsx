import * as React from "react"
import type { SVGProps } from "react"
const SvgFeatherSword = (props: SVGProps<SVGSVGElement>) => (
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
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
    <line x1={13} x2={19} y1={19} y2={13} />
    <line x1={16} x2={20} y1={16} y2={20} />
    <line x1={19} x2={21} y1={21} y2={19} />
  </svg>
)
export default SvgFeatherSword
