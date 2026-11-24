"use client";
import {
  useRef,
  useState,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
}

export default function OTPInput({
  length = 6,
  value = "",
  onChange,
  className,
  error,
}: OTPInputProps) {
  const [prevValue, setPrevValue] = useState(value);
  const [prevLength, setPrevLength] = useState(length);
  const [otp, setOtp] = useState<string[]>(
    value.split("").concat(Array(length).fill("")).slice(0, length),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (value !== prevValue || length !== prevLength) {
    setPrevValue(value);
    setPrevLength(length);
    setOtp(value.split("").concat(Array(length).fill("")).slice(0, length));
  }

  const handleChange = (index: number, inputValue: string) => {
    const newValue = inputValue.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < length && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="space-y-2">
      <div className={cn("flex gap-3", className)}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            autoComplete="new-password"
            className={cn(
              "size-14 text-center text-[#202020] text-xl font-semibold",
              "border border-solid rounded-lg",
              "bg-[#FDFDFD] text-[#202020]",
              "focus:outline-none focus:ring-2",
              "transition-colors ",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-[#202020] focus:border-[#0A60E1] focus:ring-[#0A60E1]/20",
            )}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
