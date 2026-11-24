"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  RowData,
  RowSelectionState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import EmptyData from "@/components/shared/ui/EmptyData";
import Pagination from "@/components/shared/navigation/Pagination";
import TableToolbar from "@/components/shared/filters/Toolbar";
import { Paginator } from "@/types/http";
import { Checkbox } from "@/components/ui/checkbox";

const initTable = useReactTable;

type DataTableProps<T extends RowData> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  initialPageSize?: number;
  compactSelectColumn?: boolean;
  onRowClick?: (row: T) => void;
  clickableRows?: boolean;
  className?: string;
  showPagination?: boolean;
  showBorder?: boolean;
  showCheckbox?: boolean;
  headerRowClassName?: string;
  headerCellClassName?: string;
  onSelectionChange?: (selectedRows: T[]) => void;
  onClearSelection?: (clearFn: () => void) => void;
  isLoading?: boolean;
  paginationData?: Paginator;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  emptyDataProps?: {
    title?: string;
    description?: string;
    btnLabel?: string;
    imagePath?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  toolbarProps?: {
    searchPlaceholder?: string;
    showSearch?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    showDateFilter?: boolean;
    selectedDate?: Date;
    onDateChange?: (date: Date | undefined) => void;
    showTodayButton?: boolean;
    onTodayClick?: (isActive: boolean) => void;
    showLocation?: boolean;
    showRole?: boolean;
    selectedRole?: string;
    onRoleChange?: (value: string | undefined) => void;
    roleOptions?: { label: string; value: string }[];
    showGroup?: boolean;
    showDepartment?: boolean;
    departmentOptions?: { label: string; value: string }[];
    selectedDepartment?: string;
    onDepartmentChange?: (value: string | undefined) => void;
    showStatus?: boolean;
    showStatusFilter?: boolean;
    statuses?:
      | { id: string; name: string }[]
      | { label: string; value: string }[];
    selectedStatus?: string;
    onStatusChange?: (value: string | undefined) => void;
    statusOptions?: { label: string; value: string }[];
    showType?: boolean;
    selectedType?: string;
    onTypeChange?: (value: string | undefined) => void;
    typeOptions?: { label: string; value: string }[];
    showModule?: boolean;
    onModuleChange?: (value: string) => void;
    selectedModule?: string;
    showAddButton?: boolean;
    showExportButton?: boolean;
    onExportClick?: () => void;
    moduleOptions?: { label: string; value: string }[];
    addButtonLabel?: string;
    onAddClick?: () => void;
    showLocationFilter?: boolean;
    locations?: { id: string; name: string }[];
    selectedLocation?: string;
    onLocationChange?: (value: string | undefined) => void;
    children?: React.ReactNode;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    statusFilterLabel?: string;
    className?: string;
  };
};

export default function DataTable<T extends RowData>({
  data,
  columns,
  initialPageSize = 10,
  onRowClick,
  clickableRows = false,
  className,
  showPagination = true,
  showBorder = true,
  showCheckbox = false,
  onSelectionChange,
  onClearSelection,
  isLoading = false,
  paginationData,
  onPageChange: onServerPageChange,
  onPageSizeChange: onServerPageSizeChange,
  emptyDataProps,
  toolbarProps,
  headerRowClassName,
  headerCellClassName,
}: DataTableProps<T>) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState(
    toolbarProps?.searchValue ?? "",
  );
  const [prevSearchValue, setPrevSearchValue] = React.useState(toolbarProps?.searchValue);
  const [prevFilters, setPrevFilters] = React.useState({
    status: toolbarProps?.selectedStatus,
    type: toolbarProps?.selectedType,
    role: toolbarProps?.selectedRole,
    dept: toolbarProps?.selectedDepartment,
    loc: toolbarProps?.selectedLocation,
  });

  const isServerPagination = !!paginationData;

  const tableColumns = React.useMemo(() => {
    if (!showCheckbox) return columns;
    const checkboxCol: ColumnDef<T, unknown> = {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 40,
    };
    return [checkboxCol, ...columns];
  }, [showCheckbox, columns]);

  const table = initTable({
    data,
    columns: tableColumns,
    state: {
      pagination,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: (val) => {
      setGlobalFilter(val);
      toolbarProps?.onSearchChange?.(val);
    },
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: isServerPagination
      ? undefined
      : getPaginationRowModel(),
    manualPagination: isServerPagination,
    manualFiltering: false,
    pageCount: isServerPagination ? paginationData.total_pages : undefined,
    enableRowSelection: showCheckbox,
  });

  if (toolbarProps?.searchValue !== undefined && toolbarProps.searchValue !== prevSearchValue) {
    setPrevSearchValue(toolbarProps.searchValue);
    setGlobalFilter(toolbarProps.searchValue);
  }

  const filtersChanged =
    toolbarProps?.selectedStatus !== prevFilters.status ||
    toolbarProps?.selectedType !== prevFilters.type ||
    toolbarProps?.selectedRole !== prevFilters.role ||
    toolbarProps?.selectedDepartment !== prevFilters.dept ||
    toolbarProps?.selectedLocation !== prevFilters.loc;

  if (filtersChanged) {
    setPrevFilters({
      status: toolbarProps?.selectedStatus,
      type: toolbarProps?.selectedType,
      role: toolbarProps?.selectedRole,
      dept: toolbarProps?.selectedDepartment,
      loc: toolbarProps?.selectedLocation,
    });
    
    const filters: ColumnFiltersState = [];
    if (toolbarProps?.selectedStatus && toolbarProps.selectedStatus !== "all") {
      filters.push({ id: "status", value: toolbarProps.selectedStatus });
    }
    if (toolbarProps?.selectedType && toolbarProps.selectedType !== "all") {
      filters.push({ id: "transaction_type", value: toolbarProps.selectedType });
    }
    if (toolbarProps?.selectedRole && toolbarProps.selectedRole !== "all") {
      filters.push({ id: "role", value: toolbarProps.selectedRole });
    }
    if (toolbarProps?.selectedDepartment && toolbarProps.selectedDepartment !== "all") {
      filters.push({ id: "department", value: toolbarProps.selectedDepartment });
    }
    if (toolbarProps?.selectedLocation && toolbarProps.selectedLocation !== "all") {
      filters.push({ id: "location", value: toolbarProps.selectedLocation });
    }
    setColumnFilters(filters);
  }

  React.useEffect(() => {
    if (onSelectionChange && showCheckbox) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange, showCheckbox, table]);

  const clearSelection = React.useCallback(() => setRowSelection({}), []);

  React.useEffect(() => {
    if (onClearSelection && showCheckbox) {
      onClearSelection(clearSelection);
    }
  }, [onClearSelection, showCheckbox, clearSelection]);

  const pageCount = isServerPagination
    ? paginationData.total_pages
    : table.getPageCount();
  const current = isServerPagination
    ? paginationData.page - 1
    : pagination.pageIndex;
  const currentPageSize = isServerPagination
    ? paginationData.page_size
    : pagination.pageSize;
  const isEmpty = table.getRowModel().rows.length === 0 && !isLoading;

  return (
    <div
      className={`${showBorder ? "border" : ""} bg-card rounded-xl ${className ?? ""}`}
      style={showBorder ? { borderColor: "var(--border)" } : undefined}
    >
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-5">
        {toolbarProps && (
          <TableToolbar
            {...toolbarProps}
            searchValue={globalFilter}
            onSearchChange={(val) => table.setGlobalFilter(val)}
          />
        )}

        <div className="overflow-x-auto -mx-3 sm:mx-0">
          {isEmpty ? (
            <EmptyData
              title="No Data"
              description="There are no records to display."
              {...emptyDataProps}
            />
          ) : (
            <table className="text-[11px] sm:text-[12px] w-full min-w-[640px] md:min-w-0">
              <thead className="text-left text-[10px] sm:text-xs text-muted-foreground">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className={headerRowClassName}>
                    {hg.headers.map((h) => (
                      <th
                        key={h.id}
                        className={`font-medium py-2 sm:py-3 px-2 ${headerCellClassName ?? "text-[#202020]"}`}
                        style={
                          h.column.columnDef.size
                            ? { width: `${h.column.columnDef.size}px` }
                            : undefined
                        }
                      >
                        {h.isPlaceholder
                          ? null
                          : flexRender(
                              h.column.columnDef.header,
                              h.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y">
                {isLoading
                  ? Array.from({ length: currentPageSize }).map((_, i) => (
                      <tr key={`skeleton-${i}`}>
                        {tableColumns.map((_, colIndex) => (
                          <td key={colIndex} className="py-3 sm:py-4 px-2">
                            <div className="h-3 sm:h-4 w-full bg-gray-100 rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() =>
                          clickableRows && onRowClick?.(row.original)
                        }
                        className={`odd:bg-transparent even:bg-white/50 ${clickableRows ? "cursor-pointer hover:bg-slate-50" : ""}`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="py-3 sm:py-4 px-2"
                            style={
                              cell.column.columnDef.size
                                ? { width: `${cell.column.columnDef.size}px` }
                                : undefined
                            }
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showPagination && !isEmpty && (
        <div className="p-3 sm:p-4 border-t overflow-x-auto">
          <Pagination
            isLoading={isLoading}
            pageSize={currentPageSize}
            pageCount={pageCount}
            currentPage={current}
            onPageSizeChange={(size) =>
              isServerPagination
                ? onServerPageSizeChange?.(size)
                : table.setPageSize(size)
            }
            onPageChange={(page) =>
              isServerPagination
                ? onServerPageChange?.(page + 1)
                : table.setPageIndex(page)
            }
            canPrev={
              isServerPagination
                ? !!paginationData.previous
                : table.getCanPreviousPage()
            }
            canNext={
              isServerPagination
                ? !!paginationData.next
                : table.getCanNextPage()
            }
            onPrev={() =>
              isServerPagination
                ? onServerPageChange?.(paginationData.previous_page_number!)
                : table.previousPage()
            }
            onNext={() =>
              isServerPagination
                ? onServerPageChange?.(paginationData.next_page_number!)
                : table.nextPage()
            }
          />
        </div>
      )}
    </div>
  );
}
