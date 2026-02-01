import type { SVGProps } from "react";

export function GlobalPulseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.54 15.25c.33-1.4.33-2.81 0-4.21" />
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M2.46 9.5c-.33 1.4-.33 2.81 0 4.21" />
      <path d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
      <path d="M4.5 4.5c1.32-1.32 3.1-2.22 5-2.45" />
      <path d="M19.5 19.5c-1.32 1.32-3.1 2.22-5-2.45" />
      <path d="M4.5 19.5c-1.32-1.32-2.22-3.1-2.45-5" />
      <path d="M19.5 4.5c1.32 1.32 2.22 3.1 2.45 5" />
    </svg>
  );
}
