import { SVGProps } from "react";

export default function Export({
  width = 20,
  height = 20,
  stroke = "#0A60E1",
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
        d="M13.7036 7.41406C16.7036 7.6724 17.9286 9.21406 17.9286 12.5891V12.6974C17.9286 16.4224 16.437 17.9141 12.712 17.9141H7.28698C3.56198 17.9141 2.07031 16.4224 2.07031 12.6974V12.5891C2.07031 9.23906 3.27865 7.6974 6.22865 7.4224"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.499V3.01562"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7943 4.8776L10.0026 2.08594L7.21094 4.8776"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
