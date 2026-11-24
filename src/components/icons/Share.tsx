import { SVGProps } from "react";

export default function Share({
  width = 20,
  height = 20,
  stroke = "#636363",
  ...props
}: SVGProps<SVGSVGElement>) {
  const strokeColor = stroke;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 5.41406C17.5 6.79477 16.3807 7.91406 15 7.91406C13.6192 7.91406 12.5 6.79477 12.5 5.41406C12.5 4.03335 13.6192 2.91406 15 2.91406C16.3807 2.91406 17.5 4.03335 17.5 5.41406Z"
        stroke={strokeColor}
        strokeWidth="1.25"
      />
      <path
        d="M7.5 10C7.5 11.3807 6.38071 12.5 5 12.5C3.61929 12.5 2.5 11.3807 2.5 10C2.5 8.61925 3.61929 7.5 5 7.5C6.38071 7.5 7.5 8.61925 7.5 10Z"
        stroke={strokeColor}
        strokeWidth="1.25"
      />
      <path
        d="M17.5 14.5859C17.5 15.9667 16.3807 17.0859 15 17.0859C13.6192 17.0859 12.5 15.9667 12.5 14.5859C12.5 13.2052 13.6192 12.0859 15 12.0859C16.3807 12.0859 17.5 13.2052 17.5 14.5859Z"
        stroke={strokeColor}
        strokeWidth="1.25"
      />
      <path
        d="M7.27344 8.96052L12.6901 6.46094M7.27344 11.0443L12.6901 13.5439"
        stroke={strokeColor}
        strokeWidth="1.25"
      />
    </svg>
  );
}
