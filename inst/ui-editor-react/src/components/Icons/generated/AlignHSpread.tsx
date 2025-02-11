import * as React from "react";
import type { SVGProps } from "react";

const SvgAlignHSpread = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 22"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M2 2h1v17H2zm16 0h1v17h-1zM5.333 5h4v11h-4V5Zm6.333 0h4v11h-4z" />
  </svg>
);

export default SvgAlignHSpread;
