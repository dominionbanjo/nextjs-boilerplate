import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const iconWrapperVariants = cva(
  "rounded-xl flex items-center justify-center",
  {
    variants: {
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-14 h-14",
        "2xl": "w-16 h-16",
        custom: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface IconWrapperProps
  extends VariantProps<typeof iconWrapperVariants> {
  icon: ReactNode;
  backgroundColor?: string;
  rootClassName?: string;
  customSize?: number | string;
}

export default function IconWrapper({
  icon,
  rootClassName,
  backgroundColor,
  size,
  customSize,
}: IconWrapperProps) {
  const sizeStyle = customSize
    ? {
        width: typeof customSize === "number" ? `${customSize}px` : customSize,
        height:
          typeof customSize === "number" ? `${customSize}px` : customSize,
      }
    : undefined;

  return (
    <div
      className={cn(iconWrapperVariants({ size }), rootClassName)}
      style={{ backgroundColor, ...sizeStyle }}
    >
      {icon}
    </div>
  );
}
