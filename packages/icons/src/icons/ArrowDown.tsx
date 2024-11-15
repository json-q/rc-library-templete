import * as React from 'react';
import type { SVGProps } from 'react';
import { convertIcon } from '../components/Icon';
function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={4}
      width="1em"
      height="1em"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <path d="M11.2695 27.7279L23.9975 40.4558L36.7254 27.7279M23.9995 5V39.2955" strokeLinecap="butt" />
    </svg>
  );
}
const IconComponent = convertIcon(ArrowDown, 'arrow-down');
export default IconComponent;
