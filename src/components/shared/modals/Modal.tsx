"use client";

import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  actionText?: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  actionVariant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "5xl" | "6xl";
  footer?: ReactNode;
  hideDefaultFooter?: boolean;
  disabled?: boolean;
  actionDisabled?: boolean;
  rootClassName?: string;
  panelClassName?: string;
  contentClassName?: string;
  hideCloseButton?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  actionText,
  onSubmit,
  children,
  actionVariant = "primary",
  size = "lg",
  footer,
  hideDefaultFooter = false,
  disabled = false,
  actionDisabled = false,
  rootClassName,
  panelClassName,
  contentClassName,
  hideCloseButton = false,
}: ModalProps) {
  const handleClose = () => {
    if (!disabled) {
      onClose();
    }
  };
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={cn("relative z-[2000]", rootClassName)}
        onClose={handleClose}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[2000]" />
        </Transition.Child>

        {/* Modal Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[2000]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-2 scale-95"
          >
            <Dialog.Panel
              className={cn(
                `relative w-full ${sizeClasses[size]} rounded-xl md:rounded-2xl bg-white flex flex-col shadow-xl max-h-[90vh]`,
                panelClassName,
              )}
            >
              {title ? (
                <div className="flex items-start justify-between p-4 md:p-6 pb-0 mb-4 md:mb-6 shrink-0">
                  <div>
                    <Dialog.Title className="text-lg md:text-xl font-semibold">
                      {title}
                    </Dialog.Title>

                    {subtitle && (
                      <Dialog.Description className="text-xs md:text-sm text-gray-500">
                        {subtitle}
                      </Dialog.Description>
                    )}
                  </div>

                  {!hideCloseButton && (
                    <button
                      onClick={handleClose}
                      disabled={disabled}
                      className="rounded-full p-1 hover:bg-gray-100 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X size={20} className="text-gray-500" />
                    </button>
                  )}
                </div>
              ) : !hideCloseButton ? (
                <button
                  onClick={handleClose}
                  disabled={disabled}
                  className="absolute top-4 right-4 z-10 rounded-full p-1 hover:bg-gray-100 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              ) : null}

              <div
                className={cn(
                  "flex-1 overflow-y-auto px-4 md:px-6 pb-4 md:pb-6",
                  !title && "pt-4 md:pt-6",
                  contentClassName,
                )}
              >
                {children}
              </div>

              {(footer || (!hideDefaultFooter && actionText && onSubmit)) && (
                <div className="p-4 md:p-6 pt-0 shrink-0 mt-auto">
                  {footer ? (
                    footer
                  ) : !hideDefaultFooter && actionText && onSubmit ? (
                    <Button
                      onClick={onSubmit}
                      size="lg"
                      disabled={disabled || actionDisabled}
                      className={`w-full rounded-xl py-4 md:py-6 text-sm md:text-base ${
                        actionVariant === "primary"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : actionVariant === "danger"
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {actionText}
                    </Button>
                  ) : null}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
