import {
  Avatar as BaseAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const avatarSizes = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20",
  "3xl": "w-24 h-24 text-3xl",
};

interface IProps extends React.ComponentProps<"img"> {
  fallbackText: string;
  size?: keyof typeof avatarSizes;
  rootClassName?: string;
}

export default function Avatar({
  src,
  alt,
  fallbackText,
  size = "md",
  width,
  height,
  className,
  rootClassName,
}: IProps) {
  const fallback = (fallbackText || "?")
    .split(" ")
    .map((word) => (word ? word[0] : ""))
    .join("")
    .toUpperCase();

  const customSize =
    width && height
      ? { width: `${width}px`, height: `${height}px` }
      : undefined;
  const sizeClass = width && height ? "" : avatarSizes[size];

  return (
    <div className={cn(rootClassName)}>
      <BaseAvatar className={cn(sizeClass, className)} style={customSize}>
        <AvatarImage src={src} alt={alt} width={width} height={height} />
        <AvatarFallback
          className={cn(
            "font-bold bg-transparent border-2 border-primary text-primary antialiased",
            className,
          )}
          style={customSize}
        >
          {fallback}
        </AvatarFallback>
      </BaseAvatar>
    </div>
  );
}

