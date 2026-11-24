"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

interface BatchActionsBarProps {
  selectedCount: number;
  onClear: () => void;
  actions: Action[];
  className?: string;
}

export default function BatchActionsBar({
  selectedCount,
  onClear,
  actions,
  className,
}: BatchActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl px-5 py-3 gap-4 transition-all animate-in fade-in slide-in-from-top-2 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-semibold text-[#202020]">
          {selectedCount} Selected
        </span>
        <div className="hidden sm:block h-4 w-px bg-[#E8E8E8]" />
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="text-[#0A60E1] text-xs font-medium hover:bg-transparent p-0 h-auto"
        >
          Clear Selection
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {actions.map((action, index) => {
          const isDanger = action.variant === "danger";
          const isSecondary = action.variant === "secondary";

          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              disabled={action.disabled}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-2 transition-colors",
                isDanger
                  ? "text-[#FF4444] hover:bg-[#FFF5F2]"
                  : isSecondary
                    ? "text-[#636363] hover:bg-[#F0F0F0]"
                    : "text-[#0A60E1] hover:bg-[#E7F0FF]",
              )}
            >
              {action.icon}
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
