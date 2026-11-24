import React from "react";

export default function PresentationChart(props: React.SVGProps<SVGSVGElement>) {
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
        d="M4.91719 14.166H15.0755C16.6589 14.166 17.4922 13.3327 17.4922 11.7494V1.66602H2.49219V11.7494C2.50052 13.3327 3.33386 14.166 4.91719 14.166Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66406 1.66602H18.3307"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66406 18.3327L9.9974 16.666V14.166"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 18.3327L10 16.666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 9.16602L8.87499 6.97434C9.08333 6.79934 9.35833 6.84935 9.49999 7.08268L10.5 8.74935C10.6417 8.98268 10.9167 9.02435 11.125 8.85769L13.75 6.66602"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
