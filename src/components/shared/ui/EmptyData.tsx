import { Add, FolderOpen } from "iconsax-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function EmptyData({
  title,
  description,
  onClick,
  btnLabel,
  imagePath,
  icon,
  showIcon = true,
  btnVariant = "primary",
  btnClassName,
}: {
  title: string;
  description?: string;
  onClick?: () => void;
  btnLabel?: string;
  imagePath?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  btnVariant?: "primary" | "secondary" | "outline";
  btnClassName?: string;
}) {
  const buttonStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      {showIcon && (
        <>
          {imagePath ? (
            <Image
              src={imagePath}
              alt=""
              width={500}
              height={500}
              className="w-auto h-auto mb-2"
            />
          ) : (
            <div className="w-[140px] h-[140px] rounded-full bg-gray-100 flex items-center justify-center mb-6">
              {icon ? (
                icon
              ) : (
                <FolderOpen
                  size={64}
                  color="#9CA3AF"
                  variant="Outline"
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </>
      )}

      <h3 className="text-xl font-medium text-[#202020] mb-1">{title}</h3>
      {description && (
        <p className="text-[#636363] mb-6 text-sm font-normal whitespace-pre-line">
          {description}
        </p>
      )}

      {onClick && btnLabel && (
        <button
          onClick={onClick}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg",
            buttonStyles[btnVariant],
            btnClassName
          )}
        >
          <Add size={20} variant="Linear" color="#fff" />
          {btnLabel}
        </button>
      )}
    </div>
  );
}
