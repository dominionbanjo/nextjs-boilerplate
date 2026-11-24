"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { FC } from "react";

interface PasswordValidatorProps {
  passwordName: string;
  confirmPasswordName?: string;
  className?: string;
}

const PasswordValidator: FC<PasswordValidatorProps> = ({
  passwordName,
  confirmPasswordName,
  className,
}) => {
  const { control } = useFormContext();

  const password = useWatch({
    control,
    name: passwordName,
    defaultValue: "",
  }) as string;
  const confirmPassword = useWatch({
    control,
    name: confirmPasswordName ?? "__unused_confirm_password__",
    defaultValue: "",
  }) as string;

  const rules = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const passwordsMatch =
    typeof confirmPasswordName !== "undefined" &&
    confirmPassword === password &&
    password.length > 0;

  return (
    <ul
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 list-disc pl-5 text-[12px] gap-y-1",
        className
      )}
    >
      <li className={cn("text-[#636363]", rules.minLength && "text-[#008500]")}>
        minimum 8 characters
      </li>

      <li
        className={cn("text-[#636363]", rules.hasUppercase && "text-[#008500]")}
      >
        one uppercase character
      </li>

      <li className={cn("text-[#636363]", rules.hasNumber && "text-[#008500]")}>
        one number
      </li>

      <li
        className={cn("text-[#636363]", rules.hasLowercase && "text-[#008500]")}
      >
        one lowercase character
      </li>

      {confirmPasswordName && (
        <li
          className={cn(
            "text-[#636363] col-span-1 sm:col-span-2",
            passwordsMatch && "text-[#008500]"
          )}
        >
          passwords must match
        </li>
      )}
    </ul>
  );
};

export default PasswordValidator;
