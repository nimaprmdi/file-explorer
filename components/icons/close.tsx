import React from "react";
import type { SVGProps } from "react";

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} color="white" viewBox="0 0 48 48" {...props}>
      <defs>
        <mask id="ipSCloseOne0">
          <g fill="none" strokeLinejoin="round" strokeWidth={4}>
            <path
              fill="#fff"
              stroke="#fff"
              d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
            ></path>
            <path stroke="#000" strokeLinecap="round" d="M29.657 18.343L18.343 29.657m0-11.314l11.314 11.314"></path>
          </g>
        </mask>
      </defs>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCloseOne0)"></path>
    </svg>
  );
}
