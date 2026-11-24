"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DrawerModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;

  primaryButtonText?: string;
  onPrimaryClick?: () => void;
  primaryDisabled?: boolean;
  primaryLoading?: boolean;

  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
  secondaryLoading?: boolean;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export default function DrawerModal({
  open,
  onClose,
  title,
  children,
  width = "sm:w-1/2",

  primaryButtonText,
  onPrimaryClick,
  primaryDisabled = false,
  primaryLoading = false,

  secondaryButtonText,
  onSecondaryClick,
  secondaryLoading = false,
  showCloseButton = true,
  closeOnOverlayClick = true,
}: DrawerModalProps) {
  const showFooter = primaryButtonText || secondaryButtonText;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 z-[1000] w-screen h-screen",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-full bg-white shadow-xl rounded-l-xl border-l border-gray-200",
          "transition-transform duration-300 z-[1001]",
          "w-full flex flex-col",
          width,
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b h-16 rounded-tl-xl">
          <h2 className="text-xl font-semibold">{title}</h2>
          {showCloseButton && (
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div
          className={cn("flex-1 overflow-y-auto p-4", showFooter && "pb-24")}
        >
          {children}
        </div>
        {showFooter && (
          <div className="absolute bottom-0 right-0 bg-white border-t p-4 w-full flex items-center justify-end gap-3 z-10 rounded-bl-xl">
            {secondaryButtonText && (
              <Button
                variant="outline"
                onClick={onSecondaryClick}
                loading={secondaryLoading}
                className="h-11 px-5 border rounded-md bg-white text-blue-600 border-blue-300"
              >
                {secondaryButtonText}
              </Button>
            )}

            {primaryButtonText && (
              <Button
                onClick={onPrimaryClick}
                disabled={primaryDisabled}
                loading={primaryLoading}
                className={cn(
                  "h-11 px-5 rounded-md text-white w-[250px]",
                  !primaryDisabled &&
                    !primaryLoading &&
                    "bg-[#0063EF] hover:bg-[#0063EF]/90",
                )}
              >
                {primaryButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
