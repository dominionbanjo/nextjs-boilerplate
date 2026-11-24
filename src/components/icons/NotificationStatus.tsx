import { SVGProps } from "react";

interface NotificationStatusIconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
  stroke?: string;
}

export default function NotificationStatus({
  width = 16,
  height = 16,
  color,
  stroke,
  ...props
}: NotificationStatusIconProps) {
  const strokeColor = color || stroke || "#0A60E1";

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
        d="M12.6641 5.33398C13.7686 5.33398 14.6641 4.43855 14.6641 3.33398C14.6641 2.22941 13.7686 1.33398 12.6641 1.33398C11.5595 1.33398 10.6641 2.22941 10.6641 3.33398C10.6641 4.43855 11.5595 5.33398 12.6641 5.33398Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66406 8.66602H7.9974"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66406 11.334H10.6641"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33594 1.33398H6.0026C2.66927 1.33398 1.33594 2.66732 1.33594 6.00065V10.0007C1.33594 13.334 2.66927 14.6673 6.0026 14.6673H10.0026C13.3359 14.6673 14.6693 13.334 14.6693 10.0007V6.66732"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
