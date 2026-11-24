"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning" | "success";
  isLoading?: boolean;
}

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isLoading) {
      onClose();
    }
  };

  const variantStyles = {
    default: {
      icon: "text-blue-600",
      iconBg: "bg-blue-50",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    danger: {
      icon: "text-red-600",
      iconBg: "bg-red-50",
      button: "bg-red-600 hover:bg-red-700 text-white",
    },
    warning: {
      icon: "text-yellow-600",
      iconBg: "bg-yellow-50",
      button: "bg-yellow-600 hover:bg-yellow-700 text-white",
    },
    success: {
      icon: "text-[#1EC661]",
      iconBg: "bg-green-50",
      button: "bg-[#1EC661] hover:bg-[#19a852] text-white",
    },
  };

  const styles = variantStyles[variant];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className={`rounded-full p-3 ${styles.iconBg}`}>
            <AlertCircle size={32} className={styles.icon} />
          </div>
        </div>

        <DialogHeader className="text-center">
          <DialogTitle className="text-lg md:text-xl font-semibold text-[#202020] text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#636363] text-center">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-xl py-4 md:py-6 text-sm md:text-base border-[#E8E8E8] text-[#636363] hover:text-black! hover:bg-gray-50"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={`flex-1 rounded-xl py-4 md:py-6 text-sm md:text-base ${styles.button} disabled:opacity-50`}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
