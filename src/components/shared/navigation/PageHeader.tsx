"use client";

import { ReactNode } from "react";
import BackButton from "@/components/shared/navigation/BackButton";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonIcon?: ReactNode;
  showBackButton?: boolean;
  onButtonClick?: () => void;
  onBackClick?: () => void;
  rightContent?: ReactNode;
  titleSuffix?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  showBackButton = false,
  onButtonClick,
  onBackClick,
  rightContent,
  titleSuffix,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        {showBackButton && <BackButton onBackClick={onBackClick} />}

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
            {titleSuffix}
          </div>
          {title && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      {rightContent
        ? rightContent
        : buttonText && (
            <button
              onClick={onButtonClick}
              className="bg-(--primary-6) text-white px-4 py-2 rounded-md shadow flex items-center justify-center sm:justify-start whitespace-nowrap"
            >
              {buttonIcon && <span className="mr-3">{buttonIcon}</span>}
              {buttonText}
            </button>
          )}
    </div>
  );
}
