"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FullScreenLoaderProps {
  messages?: string[];
  interval?: number;
  isOpen: boolean;
  title?: string;
  icon?: React.ReactNode;
  overlayOpacity?: number;
  primaryColor?: string;
  showSpinner?: boolean;
  className?: string;
  hint?: string;
}

const defaultMessages = [
  "Processing your request...",
  "Please wait a moment...",
  "Almost there...",
];

export default function FullScreenLoader({
  messages = defaultMessages,
  interval = 2500,
  isOpen,
  title,
  icon,
  overlayOpacity = 95,
  primaryColor = "#0063EF",
  showSpinner = true,
  className,
  hint,
}: FullScreenLoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isOpen || messages.length <= 1) return;

    const timer = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsAnimating(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, messages.length, interval]);

  useEffect(() => {
    if (isOpen) {
      const resetLoaderTimeout = window.setTimeout(() => {
        setCurrentIndex(0);
        setIsAnimating(false);
      }, 0);

      return () => window.clearTimeout(resetLoaderTimeout);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        className,
      )}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${overlayOpacity / 100})`,
      }}
    >
      <div className="flex flex-col items-center gap-6 max-w-md px-6 text-center">
        {icon ? (
          <div className="mb-2">{icon}</div>
        ) : showSpinner ? (
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full border-4 border-gray-200"
              style={{ borderTopColor: primaryColor }}
            >
              <div
                className="w-full h-full rounded-full animate-spin"
                style={{
                  border: "4px solid transparent",
                  borderTopColor: primaryColor,
                }}
              />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        ) : null}

        {title && (
          <h2 className="text-xl font-semibold text-[#202020]">{title}</h2>
        )}

        <div className="h-8 flex items-center justify-center overflow-hidden">
          <p
            className={cn(
              "text-base text-[#636363] transition-all duration-300 ease-in-out",
              isAnimating
                ? "opacity-0 transform translate-y-4"
                : "opacity-100 transform translate-y-0",
            )}
          >
            {messages[currentIndex]}
          </p>
        </div>

        {messages.length > 1 && (
          <div className="flex gap-2 mt-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex ? "w-6" : "bg-gray-300",
                )}
                style={{
                  backgroundColor:
                    index === currentIndex ? primaryColor : undefined,
                }}
              />
            ))}
          </div>
        )}

        {hint && <p className="text-sm text-[#9CA3AF] mt-4">{hint}</p>}
      </div>
    </div>
  );
}

