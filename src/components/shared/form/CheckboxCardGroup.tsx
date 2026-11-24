import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import React, { ReactNode, useState, type ElementType, type SVGProps } from "react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type IconComponentProps = {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>;

interface CheckboxCardProps {
  value: string;
  id: string;
  label: string | ReactNode;
  description?: string;
  icon?: ElementType<IconComponentProps> | ReactNode;
  isSelected?: boolean;
  className?: string;
  centered?: boolean;
  orientation?: "vertical" | "horizontal";
  showCheckbox?: boolean;
  onToggle: (value: string, checked: boolean) => void;
}

function CheckboxCard({
  value,
  id,
  label,
  description,
  icon,
  isSelected,
  className,
  centered,
  orientation = "vertical",
  showCheckbox = true,
  onToggle,
}: CheckboxCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderIcon = () => {
    if (!icon) return null;

    if (React.isValidElement(icon)) {
      const existingProps =
        (icon as React.ReactElement<IconComponentProps>).props || {};
      const defaultColor = existingProps.color || "#636363";
      const iconColor = isSelected || isHovered ? "#0063EF" : defaultColor;

      return React.cloneElement(icon as React.ReactElement<IconComponentProps>, {
        size: existingProps.size || 32,
        color: iconColor,
      });
    }

    if (typeof icon === "function") {
      const IconComponent = icon as ElementType<IconComponentProps>;
      const iconColor = isSelected || isHovered ? "#0063EF" : "#636363";
      return <IconComponent size={32} color={iconColor} />;
    }

    return icon;
  };

  const handleClick = () => {
    onToggle(value, !isSelected);
  };

  return (
    <div
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "border border-solid border-[#D9D9D9] bg-[#FDFDFD] rounded-lg p-5 cursor-pointer hover:border-[#0063EF] transition-colors group",
        orientation === "vertical" ? "space-y-5" : "flex items-center gap-3",
        isSelected && "border-[#0063EF] bg-[#F5F9FF]",
        centered &&
          orientation === "vertical" &&
          "flex flex-col items-center text-center",
        className,
      )}
    >
      <Checkbox
        id={id}
        checked={isSelected}
        className={!showCheckbox ? "sr-only" : ""}
        onCheckedChange={(checked) => onToggle(value, !!checked)}
        onClick={(e) => e.stopPropagation()}
      />
      {icon && (
        <div className={centered && orientation === "vertical" ? "mb-3" : ""}>
          {renderIcon()}
        </div>
      )}
      <div>
        {typeof label === "string" ? (
          <p
            className={cn(
              "text-base font-medium transition-colors",
              isSelected
                ? "text-[#0063EF]"
                : "text-[#202020] group-hover:text-[#0063EF]",
            )}
          >
            {label}
          </p>
        ) : (
          label
        )}
        {description && (
          <p className="text-[#6C6C6C] text-xs mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

interface CheckboxOption {
  id?: string;
  value: string;
  label: string | ReactNode;
  description?: string;
  icon?: ElementType<IconComponentProps> | ReactNode;
  className?: string;
}

interface CheckboxCardGroupProps {
  name: string;
  options: CheckboxOption[];
  className?: string;
  gridClassName?: string;
  centered?: boolean;
  orientation?: "vertical" | "horizontal";
  showCheckbox?: boolean;
}

export default function CheckboxCardGroup({
  name,
  options,
  className,
  gridClassName = "grid grid-cols-2 gap-5",
  centered = false,
  orientation = "vertical",
  showCheckbox = true,
}: CheckboxCardGroupProps) {
  const form = useFormContext();

  if (!name) {
    throw new Error("name is required");
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selectedValues: string[] = field.value || [];

        const handleToggle = (value: string, checked: boolean) => {
          if (checked) {
            field.onChange([...selectedValues, value]);
          } else {
            field.onChange(selectedValues.filter((v) => v !== value));
          }
        };

        return (
          <FormItem className={className}>
            <FormControl>
              <div className={gridClassName}>
                {options.map((option) => {
                  const id = option.id || `${name}-${option.value}`;
                  return (
                    <CheckboxCard
                      key={option.value}
                      value={option.value}
                      id={id}
                      label={option.label}
                      description={option.description}
                      icon={option.icon}
                      isSelected={selectedValues.includes(option.value)}
                      centered={centered}
                      orientation={orientation}
                      showCheckbox={showCheckbox}
                      onToggle={handleToggle}
                      className={option.className}
                    />
                  );
                })}
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
