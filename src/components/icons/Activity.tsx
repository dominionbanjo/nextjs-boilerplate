import { SVGProps } from "react";

interface ActivityIconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
  stroke?: string;
}

export default function Activity({
  width = 16,
  height = 16,
  color,
  stroke,
  ...props
}: ActivityIconProps) {
  const strokeColor = color || stroke || "#8C8C8C";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.0026 14.6673H10.0026C13.3359 14.6673 14.6693 13.334 14.6693 10.0007V6.00065C14.6693 2.66732 13.3359 1.33398 10.0026 1.33398H6.0026C2.66927 1.33398 1.33594 2.66732 1.33594 6.00065V10.0007C1.33594 13.334 2.66927 14.6673 6.0026 14.6673Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.88281 9.65984L6.46948 7.59984C6.69615 7.30651 7.11615 7.25318 7.40948 7.47984L8.62948 8.43984C8.92281 8.66651 9.34281 8.61318 9.56948 8.32651L11.1095 6.33984"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
