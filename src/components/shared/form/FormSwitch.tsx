"use client";
import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface FormSwitchProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export default function FormSwitch({
  name,
  label,
  description,
  disabled = false,
}: FormSwitchProps) {
  const { control } = useFormContext();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-[#202020] text-sm font-medium">{label}</h3>
        {description && (
          <p className="text-[#636363] text-[12px]">{description}</p>
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}
