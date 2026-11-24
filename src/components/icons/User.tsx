import React from "react";

export default function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.0026 9.99935C12.3038 9.99935 14.1693 8.13387 14.1693 5.83268C14.1693 3.5315 12.3038 1.66602 10.0026 1.66602C7.70142 1.66602 5.83594 3.5315 5.83594 5.83268C5.83594 8.13387 7.70142 9.99935 10.0026 9.99935Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1604 18.3333C17.1604 15.1083 13.9521 12.5 10.0021 12.5C6.05208 12.5 2.84375 15.1083 2.84375 18.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
