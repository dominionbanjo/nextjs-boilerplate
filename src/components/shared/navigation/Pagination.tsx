import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface PaginationProps {
  pageSize: number;
  pageCount: number;
  currentPage: number;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  isLoading?: boolean;
}

export default function Pagination({
  pageSize,
  pageCount,
  currentPage,
  onPageSizeChange,
  onPageChange,
  canPrev,
  canNext,
  onPrev,
  onNext,
  isLoading = false,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="mt-6 pb-5 flex flex-col md:flex-row items-center justify-between px-4 md:px-5 gap-4">
      {/* PAGE SIZE SELECTOR */}
      <Select
        value={pageSize.toString()}
        onValueChange={(value) => onPageSizeChange(Number(value))}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[120px] md:w-[150px] rounded-full h-9 md:h-10">
          <span className="flex items-center gap-1 md:gap-2">
            <span className="text-gray-500 hidden md:inline">Show</span>
            <span className="font-medium text-xs md:text-sm">
              {pageSize}/page
            </span>
          </span>
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 20, 50].map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}/page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* PAGE NUMBERS */}
      <div className="flex items-center gap-2 md:gap-3 text-sm">
        <button
          onClick={onPrev}
          disabled={!canPrev || isLoading}
          className="text-gray-600 disabled:text-gray-300 px-2 py-1 transition-opacity duration-200"
          style={{ opacity: isLoading ? 0.5 : 1 }}
        >
          Prev
        </button>

        <div className="flex items-center gap-1 md:gap-2">
          {pageNumbers.map((num, idx) => {
            // Logic to determine which page numbers to show
            // More limited on mobile (show current + 1 on each side)
            const isMobile =
              typeof window !== "undefined" && window.innerWidth < 640;
            const threshold = isMobile ? 1 : 2;

            const isEdge = idx === 0 || idx === pageCount - 1;
            const isNearCurrent = Math.abs(idx - currentPage) <= threshold;
            const show = isNearCurrent || isEdge;

            // Handle ellipses
            if (pageCount > 5) {
              if (idx > 0 && idx < currentPage - threshold && idx === 1) {
                return (
                  <span key="ellipsis-start" className="text-gray-400">
                    …
                  </span>
                );
              }
              if (
                idx < pageCount - 1 &&
                idx > currentPage + threshold &&
                idx === pageCount - 2
              ) {
                return (
                  <span key="ellipsis-end" className="text-gray-400">
                    …
                  </span>
                );
              }
            }

            if (!show) return null;

            const active = num === currentPage;

            return (
              <button
                key={num}
                onClick={() => onPageChange(num)}
                disabled={isLoading}
                className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border transition text-xs md:text-sm ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-blue-600 border-blue-300 hover:bg-blue-50"
                } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {String(num + 1).padStart(2, "0")}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          disabled={!canNext || isLoading}
          className="text-gray-600 disabled:text-gray-300 px-2 py-1 transition-opacity duration-200"
          style={{ opacity: isLoading ? 0.5 : 1 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
