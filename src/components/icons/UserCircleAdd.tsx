import { SVGProps } from "react";

interface UserCircleAddProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export default function UserCircleAdd({
  color = "#0A60E1",
  width = 20,
  height = 20,
  ...props
}: UserCircleAddProps) {
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
        d="M9.5526 11.4411C10.8459 11.4411 11.8943 10.3927 11.8943 9.09948C11.8943 7.80621 10.8459 6.75781 9.5526 6.75781C8.25934 6.75781 7.21094 7.80621 7.21094 9.09948C7.21094 10.3927 8.25934 11.4411 9.5526 11.4411Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8766 16.8297C13.8766 14.8881 11.9432 13.3047 9.55156 13.3047C7.15989 13.3047 5.22656 14.8797 5.22656 16.8297"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4974 10.4167C17.4974 14.7917 13.9557 18.3333 9.58073 18.3333C5.20573 18.3333 1.66406 14.7917 1.66406 10.4167C1.66406 6.04167 5.20573 2.5 9.58073 2.5C10.6724 2.5 11.7141 2.71666 12.6641 3.11666C12.5557 3.44999 12.4974 3.8 12.4974 4.16667C12.4974 4.79167 12.6724 5.38333 12.9807 5.88333C13.1474 6.16666 13.3641 6.42498 13.6141 6.64164C14.1974 7.17498 14.9724 7.5 15.8307 7.5C16.1974 7.5 16.5474 7.44165 16.8724 7.32498C17.2724 8.27498 17.4974 9.325 17.4974 10.4167Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1667 4.16927C19.1667 4.43594 19.1333 4.69426 19.0667 4.94426C18.9917 5.2776 18.8583 5.6026 18.6833 5.88594C18.2833 6.56094 17.6417 7.08592 16.875 7.32759C16.55 7.44425 16.2 7.5026 15.8333 7.5026C14.975 7.5026 14.2 7.17758 13.6167 6.64425C13.3667 6.42758 13.15 6.16927 12.9833 5.88594C12.675 5.38594 12.5 4.79427 12.5 4.16927C12.5 3.8026 12.5583 3.4526 12.6667 3.11926C12.825 2.63593 13.0917 2.20262 13.4417 1.84429C14.05 1.21929 14.9 0.835938 15.8333 0.835938C16.8167 0.835938 17.7083 1.26095 18.3083 1.94429C18.8417 2.53595 19.1667 3.31927 19.1667 4.16927Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0771 4.14844H14.5938"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8359 2.92969V5.42135"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
