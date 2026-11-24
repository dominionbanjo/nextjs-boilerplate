import React from "react";

export default function Ticket(props: React.SVGProps<SVGSVGElement>) {
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
        d="M16.2474 10.4173C16.2474 9.26732 17.1807 8.33398 18.3307 8.33398V7.50065C18.3307 4.16732 17.4974 3.33398 14.1641 3.33398H5.83073C2.4974 3.33398 1.66406 4.16732 1.66406 7.50065V7.91732C2.81406 7.91732 3.7474 8.85065 3.7474 10.0007C3.7474 11.1507 2.81406 12.084 1.66406 12.084V12.5007C1.66406 15.834 2.4974 16.6673 5.83073 16.6673H14.1641C17.4974 16.6673 18.3307 15.834 18.3307 12.5007C17.1807 12.5007 16.2474 11.5673 16.2474 10.4173Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33594 3.33398L8.33594 16.6673"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5 5"
      />
    </svg>
  );
}
