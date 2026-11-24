import { SVGProps } from "react";

interface UploadIconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
  stroke?: string;
}

export default function Upload({
  width = 24,
  height = 24,
  color,
  stroke,
  ...props
}: UploadIconProps) {
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
        d="M3 17C3 17.93 3 18.395 3.10222 18.7765C3.37962 19.8117 4.18826 20.6204 5.22354 20.8978C5.60504 21 6.07002 21 7 21H17C17.93 21 18.3949 21 18.7764 20.8978C19.8117 20.6204 20.6203 19.8117 20.8977 18.7765C20.9999 18.395 21 17.93 21 17"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.50002 11.5C7.50002 11.5 10.8142 16 12 16C13.1858 16 16.5 11.5 16.5 11.5M12 15L12 7"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
