"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "px-3 py-1 rounded-full text-sm font-medium capitalize",
  {
    variants: {
      variant: {
        active: "bg-green-100 text-green-600",
        inactive: "bg-red-100 text-red-600",
        expired: "bg-red-100 text-red-600",
        used: "bg-yellow-100 text-yellow-600",
        primary: "text-[#0A60E1]",
        default: "bg-gray-100 text-gray-600",
        open: "bg-blue-100 text-blue-600",
        closed: "bg-gray-100 text-gray-600",
        resolved: "bg-green-100 text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  status?: string;
  children?: React.ReactNode;
  customBg?: string;
  customBorder?: string;
  customTextColor?: string;
  className?: string;
}

export default function StatusBadge({
  status,
  variant,
  children,
  customBg,
  customBorder,
  customTextColor,
  className,
}: StatusBadgeProps) {
  if (customBg || customBorder || customTextColor) {
    return (
      <span
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium capitalize",
          className,
        )}
        style={{
          backgroundColor: customBg,
          border: customBorder ? `1px solid ${customBorder}` : undefined,
          color: customTextColor || "#202020",
        }}
      >
        {children || status}
      </span>
    );
  }

  const computedVariant =
    variant || (status?.toLowerCase() as keyof typeof badgeVariants);

  return (
    <span
      className={cn(badgeVariants({ variant: computedVariant }), className)}
      style={
        computedVariant === "primary"
          ? { backgroundColor: "#E8F0FE" }
          : undefined
      }
    >
      {children || status}
    </span>
  );
}
