import { SVGProps } from "react";

export default function Paragraph({
  width = 24,
  height = 24,
  stroke = "#636363",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 3V21M15 3H10M15 3H21M10 3H7.5C5.01472 3 3 5.01472 3 7.5C3 9.98528 5.01472 12 7.5 12H10M10 3V12M10 12V21"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
