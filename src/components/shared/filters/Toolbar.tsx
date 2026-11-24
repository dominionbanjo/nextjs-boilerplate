"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Search from "@/components/icons/Search";
import { Add, Calendar as CalendarIcon } from "iconsax-react";
import { useState, useMemo } from "react";
import FormSelect from "@/components/shared/form/FormSelect";
import { cn } from "@/lib/utils";
import Export from "@/components/icons/Export";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface FilterOption {
  id: string;
  name: string;
}

interface SelectOption {
  label: string;
  value: string;
}

type DynamicOptions = FilterOption[] | SelectOption[];

interface ToolbarProps {
  searchPlaceholder?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showDateFilter?: boolean;
  selectedDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
  showAssignee?: boolean;
  assignees?: DynamicOptions;
  selectedAssignee?: string;
  onAssigneeChange?: (value: string | undefined) => void;
  showCategoryFilter?: boolean;
  categories?: DynamicOptions;
  selectedCategory?: string;
  onCategoryChange?: (value: string | undefined) => void;
  showStatusFilter?: boolean;
  statuses?: DynamicOptions;
  selectedStatus?: string;
  onStatusChange?: (value: string | undefined) => void;
  showTodayButton?: boolean;
  onTodayClick?: (isActive: boolean) => void;
  showLocation?: boolean;
  showRole?: boolean;
  selectedRole?: string;
  onRoleChange?: (value: string) => void;
  roleOptions?: SelectOption[];
  showGroup?: boolean;
  selectedGroup?: string;
  onGroupChange?: (value: string) => void;
  groupOptions?: SelectOption[];
  showDepartment?: boolean;
  selectedDepartment?: string;
  onDepartmentChange?: (value: string) => void;
  departmentOptions?: SelectOption[];
  showStatus?: boolean;
  statusOptions?: SelectOption[];
  showType?: boolean;
  selectedType?: string;
  onTypeChange?: (value: string | undefined) => void;
  typeOptions?: SelectOption[];
  showModule?: boolean;
  onModuleChange?: (value: string) => void;
  selectedModule?: string;
  showAddButton?: boolean;
  addButtonLabel?: string;
  showExportButton?: boolean;
  onExportClick?: () => void;
  onAddClick?: () => void;
  isAddButtonLoading?: boolean;
  showLocationFilter?: boolean;
  locations?: { id: string; name: string }[];
  selectedLocation?: string;
  onLocationChange?: (value: string | undefined) => void;
  moduleOptions?: SelectOption[];
  children?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  statusFilterLabel?: string;
  className?: string;
}

export default function Toolbar({
  searchPlaceholder = "Search",
  showSearch = true,
  searchValue,
  onSearchChange,
  showDateFilter = true,
  selectedDate,
  onDateChange,
  showAssignee = false,
  assignees = [],
  selectedAssignee,
  onAssigneeChange,
  showCategoryFilter = false,
  categories = [],
  selectedCategory,
  onCategoryChange,
  showStatusFilter = false,
  statuses = [],
  selectedStatus,
  onStatusChange,
  showTodayButton = false,
  onTodayClick,
  showLocationFilter = false,
  locations = [],
  selectedLocation,
  onLocationChange,
  showRole,
  selectedRole,
  onRoleChange,
  roleOptions = [],
  showGroup,
  selectedGroup,
  onGroupChange,
  groupOptions = [],
  showDepartment,
  selectedDepartment,
  onDepartmentChange,
  departmentOptions = [],
  showStatus,
  statusOptions = [],
  showType,
  selectedType,
  onTypeChange,
  typeOptions = [],
  showModule,
  onModuleChange,
  selectedModule,
  showAddButton = false,
  showExportButton,
  onExportClick,
  addButtonLabel = "Add",
  onAddClick,
  isAddButtonLoading,
  moduleOptions = [],
  children,
  leftContent,
  rightContent,
  statusFilterLabel,
  className,
}: ToolbarProps) {
  const [isTodayActive, setIsTodayActive] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const normalizeOptions = (options: DynamicOptions): SelectOption[] => {
    return options.map((opt) => {
      if ("id" in opt && "name" in opt) {
        return { label: opt.name, value: opt.id };
      }
      return { label: opt.label, value: opt.value };
    });
  };

  const normalizedStatuses = useMemo(
    () => normalizeOptions(statuses),
    [statuses],
  );
  const normalizedCategories = useMemo(
    () => normalizeOptions(categories),
    [categories],
  );
  const normalizedAssignees = useMemo(
    () => normalizeOptions(assignees),
    [assignees],
  );

  const handleDateSelect = (date: Date | undefined) => {
    onDateChange?.(date);
    setIsCalendarOpen(false);
  };

  const handleTodayClick = () => {
    const newState = !isTodayActive;
    setIsTodayActive(newState);
    onTodayClick?.(newState);
  };

  return (
    <div className={cn("w-full overflow-x-auto pb-2", className)}>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between w-full gap-4">
        {leftContent ? (
          <div className="w-full md:w-auto shrink-0">{leftContent}</div>
        ) : showSearch ? (
          <Input
            placeholder={searchPlaceholder}
            className="w-full md:max-w-[300px] min-w-[200px] rounded-4xl py-5! px-5!"
            suffix={<Search color="#636363" />}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        ) : (
          <div className="hidden sm:block"></div>
        )}

        <div className="flex items-center flex-row flex-wrap sm:flex-nowrap gap-3 shrink-0">
          {showTodayButton && (
            <Button
              variant="outline"
              onClick={handleTodayClick}
              className={`rounded-4xl px-6 h-11 transition-colors ${
                isTodayActive
                  ? "bg-[#0063EF] text-white border-[#0063EF] hover:bg-[#0063EF]/90"
                  : "border-[#F0F0F0] text-[#636363]"
              }`}
            >
              Today
            </Button>
          )}

          {children}

          {showDateFilter && (
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-4xl h-10! px-5! border-[#F0F0F0] text-sm flex items-center gap-2 font-normal hover:bg-[#0A60E1]/10 hover:text-inherit [&>svg]:transition-colors"
                >
                  {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Date"}
                  <CalendarIcon color="currentColor" size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          )}

          {showAssignee && (
            <FormSelect
              placeholder="Assignee"
              value={selectedAssignee ?? "all"}
              onValueChange={(value) =>
                onAssigneeChange?.(value === "all" ? undefined : value)
              }
              options={[
                { label: "All Assignees", value: "all" },
                ...normalizedAssignees,
              ]}
              className="w-[150px] rounded-4xl border-[#F0F0F0] h-10! px-5!"
            />
          )}

          {showCategoryFilter && (
            <FormSelect
              placeholder="Category"
              value={selectedCategory ?? "all"}
              onValueChange={(value) =>
                onCategoryChange?.(value === "all" ? undefined : value)
              }
              options={[
                { label: "All Categories", value: "all" },
                ...normalizedCategories,
              ]}
              className="w-[150px] rounded-4xl border-[#F0F0F0] h-10! px-5!"
            />
          )}

          {showLocationFilter && (
            <FormSelect
              placeholder="Location"
              value={selectedLocation ?? "all"}
              onValueChange={(value) =>
                onLocationChange?.(value === "all" ? undefined : value)
              }
              options={[
                { label: "All Locations", value: "all" },
                ...locations.map((loc) => ({
                  label: loc.name,
                  value: loc.id,
                })),
              ]}
              searchable
              className="w-[150px] rounded-4xl border-[#F0F0F0] h-10! px-5!"
            />
          )}

          {showRole && (
            <FormSelect
              placeholder="Role"
              value={selectedRole || "all"}
              onValueChange={onRoleChange}
              options={roleOptions}
              className="w-[130px] rounded-4xl h-10! px-5!"
            />
          )}

          {showGroup && (
            <FormSelect
              placeholder="Group"
              value={selectedGroup || "all"}
              onValueChange={onGroupChange}
              options={groupOptions}
              className="w-[130px] rounded-4xl h-10! px-5!"
            />
          )}

          {showDepartment && (
            <FormSelect
              placeholder="Department"
              value={selectedDepartment || "all"}
              onValueChange={onDepartmentChange}
              options={departmentOptions}
              className="w-[150px] rounded-4xl h-10! px-5!"
            />
          )}

          {showStatusFilter && (
            <div className="flex items-center gap-2">
              {statusFilterLabel && (
                <span className="text-sm font-medium text-[#636363] whitespace-nowrap">
                  {statusFilterLabel}
                </span>
              )}
              <FormSelect
                placeholder="Status"
                value={selectedStatus ?? "all"}
                onValueChange={(value) =>
                  onStatusChange?.(value === "all" ? undefined : value)
                }
                options={[
                  { label: "All Statuses", value: "all" },
                  ...normalizedStatuses,
                ]}
                className="w-[150px] rounded-4xl border-[#F0F0F0] h-10! px-5!"
              />
            </div>
          )}

          {showStatus && (
            <div className="flex items-center gap-2">
              {statusFilterLabel && (
                <span className="text-sm font-medium text-[#636363] whitespace-nowrap">
                  {statusFilterLabel}
                </span>
              )}
              <FormSelect
                placeholder="Status"
                value={selectedStatus || "all"}
                onValueChange={onStatusChange}
                options={statusOptions}
                className="w-[120px] rounded-4xl h-10! px-5!"
              />
            </div>
          )}

          {showType && (
            <FormSelect
              placeholder="Type"
              value={selectedType || "all"}
              onValueChange={(val) =>
                onTypeChange?.(val === "all" ? undefined : val)
              }
              options={[{ label: "All Types", value: "all" }, ...typeOptions]}
              className="w-[150px] rounded-4xl h-10! px-5!"
            />
          )}

          {showModule && (
            <FormSelect
              placeholder="Module"
              value={selectedModule || "all"}
              onValueChange={onModuleChange}
              options={[{ label: "All Modules", value: "all" }, ...moduleOptions]}
              className="w-[150px] rounded-4xl h-10! px-5!"
            />
          )}

          {showAddButton && (
            <Button
              variant="outline"
              onClick={onAddClick}
              disabled={isAddButtonLoading}
              className="rounded-4xl text-base text-[#0063EF] border border-[#0063EF] w-[150px] gap-2"
            >
              {isAddButtonLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Add size={20} color="#0063EF" />
              )}
              {addButtonLabel}
            </Button>
          )}

          {showExportButton && (
            <Button
              variant="ghost"
              className="text-[#0A60E1] flex items-center gap-2"
              onClick={onExportClick}
            >
              Export <Export width={20} height={20} color="#0A60E1" />
            </Button>
          )}

          {rightContent}
        </div>
      </div>
    </div>
  );
}
