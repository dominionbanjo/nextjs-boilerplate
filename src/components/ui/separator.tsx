"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.ComponentProps<
  typeof SeparatorPrimitive.Root
> {
  text?: string;
  rootClassName?: string;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  text,
  rootClassName,
  ...props
}: SeparatorProps) {
  if (text && orientation === "horizontal") {
    return (
      <div className={cn("flex items-center gap-3 w-full", rootClassName)}>
        <SeparatorPrimitive.Root
          data-slot="separator"
          decorative={decorative}
          orientation={orientation}
          className={cn("bg-border shrink-0 h-px flex-1", className)}
          {...props}
        />
        <span className="text-sm text-muted-foreground">{text}</span>
        <SeparatorPrimitive.Root
          data-slot="separator"
          decorative={decorative}
          orientation={orientation}
          className={cn("bg-border shrink-0 h-px flex-1", className)}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={cn("", rootClassName)}>
      <SeparatorPrimitive.Root
        data-slot="separator"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Separator };
