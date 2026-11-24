import { SVGProps } from "react";

export default function Pin({
  width = 24,
  height = 24,
  color = "#1E1E1E",
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
      <path d="M0 24.0003H24V0.000312328H0V24.0003Z" fill={color} />
    </svg>
  );
}
