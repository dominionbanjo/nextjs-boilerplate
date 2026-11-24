import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends Omit<React.ComponentProps<"input">, "prefix"> {
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixBorder?: boolean;
  suffixBorder?: boolean;
}

function Input({
  className,
  type,
  icon,
  prefix,
  suffix,
  prefixBorder,
  suffixBorder,
  value,
  onChange,
  ...props
}: InputProps) {
  const prefixElement = icon || prefix;

  const inputValue =
    value !== undefined || onChange !== undefined ? { value: value ?? "" } : {};

  if (!prefixElement && !suffix) {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-gray-300 dark:border-gray-600 h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...inputValue}
        onChange={onChange}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-12 w-full items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 shadow-xs transition-[color,box-shadow]",
        "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-[3px]",
        "has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed",
        "has-[input[aria-invalid='true']]:ring-destructive/20 dark:has-[input[aria-invalid='true']]:ring-destructive/40 has-[input[aria-invalid='true']]:border-destructive",
        "dark:bg-input/30",
        className,
      )}
    >
      {prefixElement && (
        <div
          className={cn(
            "flex items-center justify-center text-muted-foreground shrink-0 self-stretch",
            prefixBorder &&
              "border-r border-gray-300 dark:border-gray-600 pr-2 mr-2",
          )}
        >
          {prefixElement}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 bg-transparent py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed md:text-sm",
          "border-0 focus-visible:ring-0 focus-visible:outline-none",
        )}
        {...inputValue}
        onChange={onChange}
        {...props}
      />
      {suffix && (
        <div
          className={cn(
            "flex items-center justify-center text-muted-foreground shrink-0 self-stretch",
            suffixBorder &&
              "border-l border-gray-300 dark:border-gray-600 pl-2 ml-2",
          )}
        >
          {suffix}
        </div>
      )}
    </div>
  );
}

export { Input };
