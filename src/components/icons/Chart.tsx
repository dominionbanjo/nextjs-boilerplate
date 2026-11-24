import React from "react";

export default function Chart(props: React.SVGProps<SVGSVGElement>) {
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
        d="M1.66406 18.3359H18.3307"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.125 3.33073V18.3307H11.875V3.33073C11.875 2.41406 11.5 1.66406 10.375 1.66406H9.625C8.5 1.66406 8.125 2.41406 8.125 3.33073Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8.33073V18.3307H5.83333V8.33073C5.83333 7.41406 5.5 6.66406 4.5 6.66406H3.83333C2.83333 6.66406 2.5 7.41406 2.5 8.33073Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1641 12.5026V18.3359H17.4974V12.5026C17.4974 11.5859 17.1641 10.8359 16.1641 10.8359H15.4974C14.4974 10.8359 14.1641 11.5859 14.1641 12.5026Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
