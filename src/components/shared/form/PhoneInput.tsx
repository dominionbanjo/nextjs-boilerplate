"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ArrowDown2, TickCircle } from "iconsax-react";
import { countryCodes } from "@/data/countryCodes";
import Image from "next/image";

interface PhoneInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  wrapperClassName?: string;
  onCountryCodeChange?: (code: string) => void;
}

function detectCountry(value: string) {
  if (!value?.startsWith("+")) return null;
  const sorted = [...countryCodes].sort(
    (a, b) => b.code.length - a.code.length,
  );
  return sorted.find((c) => value.startsWith(c.code)) ?? null;
}

export default function PhoneInput({
  name,
  label,
  placeholder = "Enter phone number",
  required,
  wrapperClassName,
  onCountryCodeChange,
}: PhoneInputProps) {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [localNumber, setLocalNumber] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (!name) {
    throw new Error("name is required");
  }

  const fieldValue = form.watch(name);

  useEffect(() => {
    if (initialized || !fieldValue) return;
    const detected = detectCountry(fieldValue);
    const syncPhoneTimeout = window.setTimeout(() => {
      if (detected) {
        setSelectedCountry(detected);
        setLocalNumber(fieldValue.slice(detected.code.length));
      } else {
        setLocalNumber(fieldValue);
      }
      setInitialized(true);
    }, 0);

    return () => window.clearTimeout(syncPhoneTimeout);
  }, [fieldValue, initialized]);

  const handleLocalNumberChange = (value: string) => {
    setLocalNumber(value);
    form.setValue(name, `${selectedCountry.code}${value}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCountryChange = (country: (typeof countryCodes)[0]) => {
    setSelectedCountry(country);
    onCountryCodeChange?.(country.code);
    form.setValue(name, `${country.code}${localNumber}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setOpen(false);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className={cn("gap-1 w-full", wrapperClassName)}>
          {label && (
            <FormLabel className="text-base opacity-80 font-medium">
              {label}{" "}
              {required && <span className="text-destructive text-sm">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <div className="flex">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-12 w-[90px] justify-between text-sm font-normal rounded-r-none border-r-0 group"
                  >
                    <span className="flex items-center gap-1.5">
                      <Image
                        src={`https://flagcdn.com/w20/${selectedCountry.country.toLowerCase()}.png`}
                        width={20}
                        height={15}
                        unoptimized
                        alt={selectedCountry.country}
                        className="shrink-0"
                      />
                      {selectedCountry.code}
                    </span>
                    <ArrowDown2
                      size={16}
                      className="text-[#777] group-hover:text-white"
                    />
                  </Button>
                </PopoverTrigger>
                  <PopoverContent
                  className="w-[280px] p-0"
                  align="start"
                  sideOffset={5}
                >
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput
                      placeholder="Search country..."
                      className="h-12"
                    />
                    <CommandList className="max-h-[300px] overflow-auto">
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countryCodes.map((country: { code: string; country: string; flag: string }, idx: number) => (
                          <CommandItem
                            key={`${country.code}-${country.country}-${idx}`}
                            value={`${country.country} ${country.code}`}
                            onSelect={() => handleCountryChange(country)}
                          >
                            <TickCircle
                              size={16}
                              className={cn(
                                "mr-2",
                                selectedCountry.code === country.code &&
                                  selectedCountry.country === country.country
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <Image
                              src={`https://flagcdn.com/w20/${country.country.toLowerCase()}.png`}
                              width={20}
                              height={15}
                              unoptimized
                              alt={country.country}
                              className="shrink-0 mr-2"
                            />
                            {country.country} {country.code}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Input
                type="tel"
                placeholder={placeholder}
                value={localNumber}
                onChange={(e) => handleLocalNumberChange(e.target.value)}
                className="flex-1 rounded-l-none"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
