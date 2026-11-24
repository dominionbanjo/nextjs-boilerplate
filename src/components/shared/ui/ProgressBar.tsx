import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label?: string;
  value: number;
  color: string;
  showPercentage?: boolean;
  wrapperClassName?: string;
  textPosition?: "left" | "right" | "bottom-left" | "bottom-right";
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  topLeftColor?: string;
  topRightColor?: string;
  bottomLeftColor?: string;
  bottomRightColor?: string;
}

export default function ProgressBar({
  label,
  value,
  color,
  showPercentage = true,
  wrapperClassName,
  textPosition = "right",
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  topLeftColor = "#666666",
  topRightColor = "#666666",
  bottomLeftColor = "#666666",
  bottomRightColor = "#666666",
}: ProgressBarProps) {
  const finalTopLeft = topLeft ?? label;
  const finalTopRight = topRight ?? (showPercentage ? `${value}%` : undefined);
  const finalBottomLeft = bottomLeft;
  const finalBottomRight = bottomRight;

  const isBottom =
    textPosition === "bottom-left" || textPosition === "bottom-right";
  const useOldAPI = !topLeft && !topRight && !bottomLeft && !bottomRight;

  if (useOldAPI && isBottom) {
    const justify = label
      ? "justify-between"
      : textPosition === "bottom-left"
      ? "justify-start"
      : "justify-end";

    const textElement = (label || showPercentage) && (
      <div className={`flex text-sm ${justify}`}>
        {label && <span style={{ color: "#666666" }}>{label}</span>}
        {showPercentage && (
          <span className="font-medium" style={{ color: "#666666" }}>
            {value}%
          </span>
        )}
      </div>
    );

    return (
      <div className={cn("space-y-2", wrapperClassName)}>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full"
            style={{ width: `${value}%`, backgroundColor: color }}
          />
        </div>
        {textElement}
      </div>
    );
  }

  const hasTopText = finalTopLeft || finalTopRight;
  const hasBottomText = finalBottomLeft || finalBottomRight;

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      {hasTopText && (
        <div className="flex justify-between text-xs">
          <span style={{ color: topLeftColor }}>{finalTopLeft || ""}</span>
          <span className="font-medium" style={{ color: topRightColor }}>
            {finalTopRight || ""}
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      {hasBottomText && (
        <div className="flex justify-between text-xs">
          <span style={{ color: bottomLeftColor }}>
            {finalBottomLeft || ""}
          </span>
          <span className="font-medium" style={{ color: bottomRightColor }}>
            {finalBottomRight || ""}
          </span>
        </div>
      )}
    </div>
  );
}
