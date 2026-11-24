import { SVGProps } from "react";

interface ImageIconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
  stroke?: string;
}

export default function Image({
  width = 24,
  height = 24,
  color,
  stroke,
  ...props
}: ImageIconProps) {
  const strokeColor = color || stroke || "#636363";

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
        d="M21.6848 16.9596L18.5548 9.64964C17.4948 7.16964 15.5448 7.06964 14.2348 9.42964L12.3448 12.8396C11.3848 14.5696 9.59481 14.7196 8.35481 13.1696L8.13481 12.8896C6.84481 11.2696 5.02481 11.4696 4.09481 13.3196L2.37481 16.7696C1.16481 19.1696 2.91481 21.9996 5.59481 21.9996H18.3548C20.9548 21.9996 22.7048 19.3496 21.6848 16.9596Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.96875 8C8.6256 8 9.96875 6.65685 9.96875 5C9.96875 3.34315 8.6256 2 6.96875 2C5.3119 2 3.96875 3.34315 3.96875 5C3.96875 6.65685 5.3119 8 6.96875 8Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
