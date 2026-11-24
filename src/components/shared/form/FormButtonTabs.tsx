"use client";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface FormButtonTabsProps {
  name: string;
  label?: string;
  description?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
}

export default function FormButtonTabs({
  name,
  label,
  description,
  options,
  disabled = false,
}: FormButtonTabsProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-2.5">
          {(label || description) && (
            <div>
              {label && (
                <h3 className="text-[#202020] text-sm font-medium">{label}</h3>
              )}
              {description && (
                <p className="text-[#636363] text-[12px]">{description}</p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-3 md:gap-5">
            {options.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant="outline"
                className={`px-6 md:px-8 ${
                  field.value === option.value
                    ? "bg-[#F5F9FF] border-[#B3D3FF] text-[#0A60E1] font-medium"
                    : ""
                }`}
                onClick={() => field.onChange(option.value)}
                disabled={disabled}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    />
  );
}
