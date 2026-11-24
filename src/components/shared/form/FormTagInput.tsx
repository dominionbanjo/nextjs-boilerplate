"use client";
import { useFormContext } from "react-hook-form";
import type { ComponentProps } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState, KeyboardEvent } from "react";

interface IProps extends Omit<ComponentProps<"input">, "prefix"> {
  label?: string;
  name: string;
  placeholder?: string;
  description?: string;
  wrapperClassName?: string;
  required?: boolean;
}

export default function FormTagInput({
  label,
  placeholder = "Type and press Enter",
  description,
  name,
  className,
  wrapperClassName,
  required,
}: IProps) {
  const form = useFormContext();
  const [inputValue, setInputValue] = useState("");

  return (
    <FormField
      control={form.control}
      name={name ?? ""}
      render={({ field }) => {
        const tags = field.value || [];

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const trimmedValue = inputValue.trim();
            if (trimmedValue && !tags.includes(trimmedValue)) {
              field.onChange([...tags, trimmedValue]);
              setInputValue("");
            }
          } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
            field.onChange(tags.slice(0, -1));
          }
        };

        const handleRemove = (tagToRemove: string) => {
          field.onChange(tags.filter((tag: string) => tag !== tagToRemove));
        };

        return (
          <FormItem className={cn("gap-1.5 w-full", wrapperClassName)}>
            {label && (
              <FormLabel className="text-base opacity-80 font-medium">
                {label}{" "}
                {required && <span className="text-destructive text-sm">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div
                className={cn(
                  "flex flex-wrap gap-1.5 min-h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                  className
                )}
              >
                {tags.map((tag: string) => (
                  <div
                    key={tag}
                    className="bg-[#F0F0F0] text-[#636363] px-2.5 py-1 rounded-lg text-sm flex items-center gap-1.5 h-fit"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(tag)}
                      className="text-[#FF5025] hover:text-[#FF5025]/80"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={tags.length === 0 ? placeholder : ""}
                  className="flex-1 min-w-[120px] outline-none bg-transparent placeholder:text-muted-foreground"
                />
              </div>
            </FormControl>
            <FormDescription className="font-light text-gray-500 text-[12px]">
              {description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

