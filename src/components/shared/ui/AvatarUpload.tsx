"use client";

import { useRef, useState } from "react";
import { User, ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Avatar as BaseAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

const avatarSizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20",
  "3xl": "w-24 h-24",
};

const userIconSizes: Record<string, number> = {
  sm: 26,
  md: 32,
  lg: 40,
  xl: 52,
  "2xl": 64,
  "3xl": 80,
};

const plusIconSizes: Record<string, number> = {
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
  "2xl": 18,
  "3xl": 20,
};

interface AvatarUploadProps {
  size?: keyof typeof avatarSizes;
  onFileSelect?: (file: File) => void;
  previewUrl?: string | null;
  className?: string;
  rootClassName?: string;
}

export default function AvatarUpload({
  size = "3xl",
  onFileSelect,
  previewUrl,
  className,
  rootClassName,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const displayUrl = previewUrl ?? localPreview;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalPreview(url);
      onFileSelect?.(file);
    }
  };

  if (displayUrl) {
    return (
      <div className={cn(rootClassName)}>
        <button type="button" onClick={handleClick} className="relative group">
          <BaseAvatar className={cn(avatarSizes[size], className)}>
            <AvatarImage src={displayUrl} alt="Profile" />
            <AvatarFallback className="bg-gray-100" />
          </BaseAvatar>
          <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ImagePlus size={plusIconSizes[size]} className="text-white" />
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className={cn(rootClassName)}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "relative rounded-full overflow-hidden bg-[#C4C4C4]",
          avatarSizes[size],
          className,
        )}
      >
        {/* User icon - centered in avatar */}
        <div className="absolute inset-0 flex items-end justify-center">
          <User
            size={userIconSizes[size]}
            className="text-[#AEAEAE] translate-y-[12%]"
            fill="#AEAEAE"
            strokeWidth={1.5}
          />
        </div>

        {/* Bottom half blue overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0063EF]/50 flex items-center justify-center">
          <ImagePlus size={plusIconSizes[size]} className="text-white" />
        </div>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

