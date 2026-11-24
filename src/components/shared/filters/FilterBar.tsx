"use client";

import { useState, Fragment } from "react";
import { SearchNormal1, Calendar, ArrowDown2 } from "iconsax-react";
import { Popover, Transition, Listbox } from "@headlessui/react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

interface FilterBarProps {
  placeholder?: string;

  categories?: string[];

  showDate?: boolean;
  showCategory?: boolean;

  onSearch?: (value: string) => void;
  onDateChange?: (date: Date | undefined) => void;
  onCategoryChange?: (category: string) => void;

  className?: string;
}

export default function FilterBar({
  placeholder = "Search",
  categories = [],
  showDate = true,
  showCategory = true,
  onSearch,
  onDateChange,
  onCategoryChange,
  className = "",
}: FilterBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [category, setCategory] = useState("All");

  const categoryOptions = ["All", ...categories];

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 w-full ${className}`}
    >
      {/* SEARCH */}
      <div className="flex items-center h-11 w-full md:w-[40%] md:min-w-[220px] rounded-full border border-gray-300 bg-white px-4">
        <input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onSearch?.(e.target.value);
          }}
          className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
        />
        <SearchNormal1 size={18} variant="Linear" color="#6B7280" />
      </div>

      <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
        {/* DATE */}
        {showDate && (
          <Popover className="relative flex-1 md:flex-none">
            <Popover.Button className="h-11 w-full md:w-auto flex items-center justify-between md:justify-start gap-2 rounded-full border border-gray-300 bg-white px-4 text-sm">
              <span className="text-gray-700">
                {selectedDate ? selectedDate.toLocaleDateString() : "Date"}
              </span>
              <Calendar size={18} variant="Linear" color="#6B7280" />
            </Popover.Button>

            <Transition as={Fragment}>
              <Popover.Panel className="absolute right-0 mt-2 rounded-md border bg-white shadow-md z-50">
                <div className="p-2 w-[280px]">
                  <ShadcnCalendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      onDateChange?.(date);
                    }}
                    initialFocus
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}

        {/* CATEGORY */}
        {showCategory && categoryOptions.length > 1 && (
          <Listbox
            value={category}
            onChange={(value) => {
              setCategory(value);
              onCategoryChange?.(value);
            }}
          >
            <div className="relative flex-1 md:flex-none">
              <Listbox.Button className="h-11 w-full md:w-auto flex items-center justify-between md:justify-start gap-2 rounded-full border border-gray-300 bg-white px-4 text-sm">
                <span className="text-gray-700">{category}</span>
                <ArrowDown2 size={18} variant="Linear" color="#6B7280" />
              </Listbox.Button>

              <Transition as={Fragment}>
                <Listbox.Options className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow text-sm z-50">
                  {categoryOptions.map((opt) => (
                    <Listbox.Option
                      key={opt}
                      value={opt}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                    >
                      {opt}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        )}
      </div>
    </div>
  );
}
