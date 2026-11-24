import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface IProps {
  name?: string;
  label?: ReactNode;
  description?: string;
  id?: string;
  disabled?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  sectionLabel?: ReactNode;
  sectionLabelClassName?: string;
}

export default function FormCheckbox({
  label,
  id,
  name,
  description,
  disabled,
  checked,
  onCheckedChange,
  sectionLabel,
  sectionLabelClassName
}: IProps) {
  const renderCheckbox = (
    checkboxValue?: boolean,
    checkboxOnChange?: (checked: boolean) => void
  ) => (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id || name}
        checked={checkboxValue}
        onCheckedChange={checkboxOnChange}
        disabled={disabled}
      />
      {label && (
        <Label
          htmlFor={id || name}
          className="my-0 cursor-pointer text-[#636363]"
        >
          {label}
        </Label>
      )}
    </div>
  );

  const renderWithSectionLabel = (content: ReactNode) => {
    if (!sectionLabel) return content;

    return (
      <div className="flex items-center justify-between">
        <FormLabel className={sectionLabelClassName}>
          {sectionLabel}
        </FormLabel>
        {content}
      </div>
    );
  };

  const renderDescription = (isFormDescription: boolean = false) => {
    if (!description) return null;

    return isFormDescription ? (
      <FormDescription>{description}</FormDescription>
    ) : (
      <p className="text-sm text-gray-500">{description}</p>
    );
  };

  if (!name) {
    return (
      <div className="space-y-1">
        {renderWithSectionLabel(renderCheckbox(checked, onCheckedChange))}
        {renderDescription(false)}
      </div>
    );
  }

  return (
    <ControlledFormCheckbox
      name={name}
      renderCheckbox={renderCheckbox}
      renderWithSectionLabel={renderWithSectionLabel}
      renderDescription={renderDescription}
    />
  );
}

function ControlledFormCheckbox({
  name,
  renderCheckbox,
  renderWithSectionLabel,
  renderDescription,
}: {
  name: string;
  renderCheckbox: (
    checkboxValue?: boolean,
    checkboxOnChange?: (checked: boolean) => void,
  ) => ReactNode;
  renderWithSectionLabel: (content: ReactNode) => ReactNode;
  renderDescription: (isFormDescription?: boolean) => ReactNode;
}) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {renderWithSectionLabel(renderCheckbox(field.value, field.onChange))}
          </FormControl>
          {renderDescription(true)}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

