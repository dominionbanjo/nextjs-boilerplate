"use client";

import { useFormContext } from "react-hook-form";
import { type ComponentProps, ReactNode, useState, useRef } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../..//ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IProps extends Omit<ComponentProps<"select">, "prefix"> {
  label?: string;
  name?: string;
  placeholder?: string;
  description?: string;
  options: { label: React.ReactNode; value: string | number; searchValue?: string }[];
  prefix?: ReactNode;
  suffix?: ReactNode;
  wrapperClassName?: string;
  required?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  clearable?: boolean;
  clearLabel?: string;
}

export default function FormSelect({
  label,
  placeholder,
  options,
  description,
  name,
  disabled,
  className,
  prefix,
  suffix,
  wrapperClassName,
  required,
  value,
  onValueChange,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  clearable = false,
  clearLabel = "None",
}: IProps) {
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
    setOpen(isOpen);
  };

  const renderSelect = (
    selectValue?: string,
    selectOnChange?: (value: string) => void,
  ) => (
    <Select
      disabled={disabled}
      onValueChange={(val) => {
        if (val === "none") {
          selectOnChange?.("");
        } else {
          selectOnChange?.(val);
        }
      }}
      value={selectValue}
      defaultValue={selectValue}
    >
      <SelectTrigger
        className={cn("w-full h-12!", className)}
      >
        {prefix}
        <SelectValue placeholder={placeholder} />
        {suffix}
      </SelectTrigger>

      <SelectContent>
        {clearable && (
          <SelectItem value="none" className="text-muted-foreground italic">
            {clearLabel}
          </SelectItem>
        )}
        {options?.map(({ label, value }) => (
          <SelectItem key={value} value={String(value)}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const renderSearchableSelect = (
    selectValue?: string,
    selectOnChange?: (value: string) => void,
  ) => {
    const selectedOption = options?.find(
      (opt) => String(opt.value) === selectValue,
    );

    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full h-12 justify-between font-normal",
              !selectValue && "text-muted-foreground",
              className,
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          align="start"
          style={{ width: triggerWidth || "auto" }}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
                {clearable && (
                  <CommandItem
                    value="none"
                    onSelect={() => {
                      selectOnChange?.("");
                      setOpen(false);
                    }}
                    className="text-muted-foreground italic"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        !selectValue ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {clearLabel}
                  </CommandItem>
                )}
                {options?.map((option) => {
                  const searchVal = option.searchValue ?? (typeof option.label === "string" ? option.label : String(option.value));
                  return (
                    <CommandItem
                      key={option.value}
                      value={searchVal}
                      onSelect={() => {
                        selectOnChange?.(String(option.value));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectValue === String(option.value)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  );
                })}
                {hasMore && onLoadMore && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full mt-1 text-[#0A60E1] hover:text-[#0A60E1]/80 hover:bg-[#F5F9FF]"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onLoadMore();
                    }}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? "Loading..." : "Show more"}
                  </Button>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  const renderLabel = (isFormLabel: boolean = false) => {
    if (!label) return null;

    const labelContent = (
      <>
        {label}{" "}
        {required && <span className="text-destructive text-sm">*</span>}
      </>
    );

    return isFormLabel ? (
      <FormLabel className="text-base opacity-80 font-medium">
        {labelContent}
      </FormLabel>
    ) : (
      <Label className="text-base opacity-80 font-medium">{labelContent}</Label>
    );
  };

  const renderDescription = (isFormDescription: boolean = false) => {
    if (!description) return null;

    return isFormDescription ? (
      <FormDescription className="font-light text-gray-500 text-[12px]">
        {description}
      </FormDescription>
    ) : (
      <p className="font-light text-gray-500 text-[12px]">{description}</p>
    );
  };

  const renderComponent = searchable ? renderSearchableSelect : renderSelect;

  if (!name) {
    const hasLabelOrDescription = !!label || !!description;
    return (
      <div className={cn("w-full", hasLabelOrDescription && "gap-1.5 space-y-1.5", wrapperClassName)}>
        {renderLabel(false)}
        {renderComponent(value, onValueChange)}
        {renderDescription(false)}
      </div>
    );
  }

  return (
    <ControlledFormSelect
      name={name}
      wrapperClassName={wrapperClassName}
      renderLabel={renderLabel}
      renderComponent={renderComponent}
      renderDescription={renderDescription}
    />
  );
}

function ControlledFormSelect({
  name,
  wrapperClassName,
  renderLabel,
  renderComponent,
  renderDescription,
}: {
  name: string;
  wrapperClassName?: string;
  renderLabel: (isFormLabel?: boolean) => ReactNode;
  renderComponent: (
    selectValue?: string,
    selectOnChange?: (value: string) => void,
  ) => ReactNode;
  renderDescription: (isFormDescription?: boolean) => ReactNode;
}) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("gap-1.5 w-full", wrapperClassName)}>
          {renderLabel(true)}
          <FormControl>
            {renderComponent(field.value, field.onChange)}
          </FormControl>
          {renderDescription(true)}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

