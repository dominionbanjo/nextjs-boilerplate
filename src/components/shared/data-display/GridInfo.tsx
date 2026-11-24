interface InfoItem {
  label: string;
  value: string | React.ReactNode;
  colSpan?: 1 | 2 | 3;
}

interface GridInfoProps {
  info: InfoItem[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export default function GridInfo({
  info,
  columns = 3,
  className,
}: GridInfoProps) {
  const gridColsClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-6 ${className ?? ""}`}>
      {info.map((item, index) => {
        const colSpanClass =
          item.colSpan === 2
            ? "col-span-2"
            : item.colSpan === 3
            ? "col-span-3"
            : "";

        return (
          <div key={index} className={`space-y-2 ${colSpanClass}`}>
            <p className="text-sm text-[#636363] text-[12px]">{item.label}</p>
            <div className="text-base text-[#202020] font-medium">
              {item.value || "—"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
