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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ChevronDown, X, Search } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { Input } from "@/components/ui/input";

interface IProps extends Omit<ComponentProps<"div">, "prefix" | "onChange"> {
  label?: string;
  name: string;
  placeholder?: string;
  description?: string;
  options: { label: string; value: string | number }[];
  wrapperClassName?: string;
  required?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  value?: string[];
  onChange?: (values: string[]) => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

interface MultiSelectCoreProps {
  selectedValues: string[];
  onToggle: (value: string | number) => void;
  onRemove: (value: string | number) => void;
  options: { label: string; value: string | number }[];
  placeholder: string;
  disabled: boolean;
  searchable: boolean;
  searchPlaceholder: string;
  emptyText: string;
  className?: string;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore?: () => void;
}

function MultiSelectCore({
  selectedValues,
  onToggle,
  onRemove,
  options,
  placeholder,
  disabled,
  searchable,
  searchPlaceholder,
  emptyText,
  className,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: MultiSelectCoreProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (open: boolean) => {
    if (open && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
    if (!open) {
      setSearchQuery("");
    }
    setIsOpen(open);
  };

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery, searchable]);

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          disabled={disabled}
          className={cn(
            "w-full h-auto min-h-12 justify-between font-normal hover:bg-transparent",
            className,
          )}
        >
          <div className="flex flex-wrap gap-1.5 flex-1">
            {selectedValues.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              selectedValues.map((value: string) => {
                const option = options.find(
                  (opt) => String(opt.value) === value,
                );
                return (
                  <div
                    key={value}
                    className="bg-[#F0F0F0] text-[#636363] px-2.5 py-1 rounded-lg text-sm flex items-center gap-1.5"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <span>{option?.label || value}</span>
                    {!disabled && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onRemove(value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemove(value);
                          }
                        }}
                        className="text-[#FF5025] hover:text-[#FF5025]/80 cursor-pointer"
                      >
                        <X size={14} />
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <ChevronDown size={16} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: triggerWidth || "auto" }}
      >
        {searchable && (
          <div className="flex items-center border-b px-3">
            <Search className="size-4 shrink-0 opacity-50" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        )}
        <div className="max-h-64 overflow-y-auto p-1">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            <>
              {filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(
                  String(option.value),
                );
                return (
                  <div
                    key={option.value}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#F5F9FF] cursor-pointer rounded-md"
                    onClick={() => onToggle(option.value)}
                  >
                    <Checkbox checked={isSelected} />
                    <span className="text-sm">{option.label}</span>
                  </div>
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
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function FormMultiSelect({
  label,
  placeholder = "Select items",
  options,
  description,
  name,
  className,
  wrapperClassName,
  required,
  disabled = false,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  value: controlledValue,
  onChange: controlledOnChange,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: IProps) {
  const form = useFormContext();
  const isControlled =
    controlledValue !== undefined && controlledOnChange !== undefined;

  const createHandlers = (
    selectedValues: string[],
    onChange: (values: string[]) => void,
  ) => ({
    handleToggle: (optionValue: string | number) => {
      const stringValue = String(optionValue);
      const newValues = selectedValues.includes(stringValue)
        ? selectedValues.filter((v: string) => v !== stringValue)
        : [...selectedValues, stringValue];
      onChange(newValues);
    },
    handleRemove: (optionValue: string | number) => {
      const stringValue = String(optionValue);
      const newValues = selectedValues.filter((v: string) => v !== stringValue);
      onChange(newValues);
    },
  });

  if (isControlled) {
    const { handleToggle, handleRemove } = createHandlers(
      controlledValue,
      controlledOnChange,
    );

    return (
      <div className={cn("space-y-1.5 w-full", wrapperClassName)}>
        {label && (
          <label className="text-base opacity-80 font-medium">
            {label}{" "}
            {required && <span className="text-destructive text-sm">*</span>}
          </label>
        )}
        <MultiSelectCore
          selectedValues={controlledValue}
          onToggle={handleToggle}
          onRemove={handleRemove}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          searchable={searchable}
          searchPlaceholder={searchPlaceholder}
          emptyText={emptyText}
          className={className}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={onLoadMore}
        />
        {description && (
          <p className="font-light text-gray-500 text-[12px]">{description}</p>
        )}
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name={name ?? ""}
      render={({ field }) => {
        const selectedValues = field.value || [];
        const { handleToggle, handleRemove } = createHandlers(
          selectedValues,
          field.onChange,
        );

        return (
          <FormItem className={cn("gap-1.5 w-full", wrapperClassName)}>
            {label && (
              <FormLabel className="text-base opacity-80 font-medium">
                {label}{" "}
                {required && (
                  <span className="text-destructive text-sm">*</span>
                )}
              </FormLabel>
            )}
            <FormControl>
              <MultiSelectCore
                selectedValues={selectedValues}
                onToggle={handleToggle}
                onRemove={handleRemove}
                options={options}
                placeholder={placeholder}
                disabled={disabled}
                searchable={searchable}
                searchPlaceholder={searchPlaceholder}
                emptyText={emptyText}
                className={className}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                onLoadMore={onLoadMore}
              />
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

