"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "../../../lib/utils";
import type { ReactNode } from "react";
import { useState } from "react";
import { RegisterOptions } from "react-hook-form";

interface IProps extends Omit<React.ComponentProps<"input">, "prefix"> {
  label?: string;
  labelIcon?: React.ReactNode;
  description?: string;
  wrapperClassName?: string;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: ReactNode;
  prefixBorder?: boolean;
  suffixBorder?: boolean;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: RegisterOptions;
}

export default function FormInput({
  description,
  label,
  labelIcon,
  name,
  type,
  wrapperClassName,
  required,
  icon,
  prefix,
  suffix,
  prefixBorder,
  suffixBorder,
  value: controlledValue,
  onChange: controlledOnChange,
  onBlur: customOnBlur,
  onFocus: customOnFocus,
  className,
  ...rest
}: IProps) {
  const form = useFormContext();
  const isControlled =
    controlledValue !== undefined && controlledOnChange !== undefined;
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const passwordToggle = isPasswordField ? (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-sm font-medium text-[#202020] underline cursor-pointer pr-1"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  ) : null;

  const finalSuffix = isPasswordField && !suffix ? passwordToggle : suffix;

  const baseInputStyles =
    "border-2 border-gray-200 focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600/20 transition-all duration-200 bg-white shadow-sm";

  if (isControlled) {
    return (
      <div className={cn("space-y-1.5 w-full", wrapperClassName)}>
        {label && (
          <label className="text-sm text-slate-700 font-semibold flex items-center gap-2">
            {label}
            {labelIcon && <span className="inline-flex">{labelIcon}</span>}
            {required && <span className="text-destructive text-sm">*</span>}
          </label>
        )}
        <Input
          type={inputType}
          value={controlledValue}
          onChange={controlledOnChange}
          onBlur={customOnBlur}
          onFocus={customOnFocus}
          icon={icon || prefix}
          suffix={finalSuffix}
          prefixBorder={prefixBorder}
          suffixBorder={suffixBorder}
          className={cn(baseInputStyles, className)}
          {...rest}
        />
        {description && (
          <p className="text-[12px] text-slate-400">{description}</p>
        )}
      </div>
    );
  }

  if (!name) {
    throw new Error("name is required");
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("space-y-1.5 w-full", wrapperClassName)}>
          {label && (
            <FormLabel className="text-sm text-slate-700 font-semibold flex items-center gap-2">
              {label}
              {labelIcon && <span className="inline-flex">{labelIcon}</span>}
              {required && <span className="text-destructive text-sm">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <Input
              type={inputType}
              icon={icon || prefix}
              suffix={finalSuffix}
              prefixBorder={prefixBorder}
              suffixBorder={suffixBorder}
              className={cn(
                baseInputStyles,
                fieldState.error &&
                  "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                className,
              )}
              {...rest}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                controlledOnChange?.(e);
              }}
              onBlur={(e) => {
                field.onBlur();
                customOnBlur?.(e);
              }}
              onFocus={(e) => {
                customOnFocus?.(e);
              }}
            />
          </FormControl>

          {description && (
            <FormDescription className="text-[12px] text-slate-400">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-xs font-medium text-red-500" />
        </FormItem>
      )}
    />
  );
}
