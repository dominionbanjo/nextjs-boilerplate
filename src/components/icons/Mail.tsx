import React from "react";

interface MailProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export default function Mail({
  width = 31,
  height = 31,
  color,
  ...props
}: MailProps) {
  const strokeColor = color || "currentColor";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.58594 7.75L11.5153 12.8094C14.8072 14.6746 16.198 14.6746 19.49 12.8094L28.4193 7.75"
        stroke={strokeColor}
        strokeWidth="1.9375"
        strokeLinejoin="round"
      />
      <path
        d="M2.60631 17.4086C2.69074 21.3683 2.73297 23.3481 4.19401 24.8147C5.65504 26.2813 7.68845 26.3323 11.7553 26.4345C14.2617 26.4975 16.7435 26.4975 19.25 26.4345C23.3168 26.3323 25.3501 26.2813 26.8113 24.8147C28.2723 23.3481 28.3145 21.3683 28.3989 17.4086C28.4261 16.1354 28.4261 14.8698 28.3989 13.5966C28.3145 9.63697 28.2723 7.65714 26.8113 6.19054C25.3501 4.72394 23.3168 4.67286 19.25 4.57068C16.7435 4.50769 14.2617 4.50769 11.7552 4.57066C7.68845 4.67283 5.65504 4.72392 4.194 6.19053C2.73296 7.65713 2.69074 9.63695 2.60629 13.5966C2.57914 14.8698 2.57916 16.1354 2.60631 17.4086Z"
        stroke={strokeColor}
        strokeWidth="1.9375"
        strokeLinejoin="round"
      />
    </svg>
  );
}
