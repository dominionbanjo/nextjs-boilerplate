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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "iconsax-react";

interface FormDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function FormDatePicker({
  name,
  label,
  placeholder = "Pick a date",
  description,
  required,
  disabled,
}: FormDatePickerProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1 w-full">
          {label && (
            <FormLabel className="text-base opacity-80 font-medium flex items-center gap-2">
              {label}
              {required && <span className="text-destructive text-sm">*</span>}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-12 w-full pl-3 text-left font-normal border-gray-300 dark:border-gray-600 rounded-md",
                    !field.value && "text-muted-foreground",
                    "focus:border-ring focus:ring-ring/50 focus:ring-[3px]"
                  )}
                  disabled={disabled}
                >
                  {field.value ? (
                    format(new Date(field.value), "dd/MM/yyyy")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon size={20} variant="Outline" color="#202020" className="ml-auto opacity-70" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  if (date) {
                    field.onChange(format(date, "yyyy-MM-dd"));
                  } else {
                    field.onChange("");
                  }
                }}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription className="text-[12px] text-gray">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
