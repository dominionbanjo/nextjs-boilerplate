"use client";
import { useEffect } from "react";
import { Download, X } from "lucide-react";

import Image from "next/image";

interface ImageLightboxProps {
  url: string;
  fileName: string;
  onClose: () => void;
}

export default function ImageLightbox({
  url,
  fileName,
  onClose,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleDownload = async () => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(url, "_blank");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title="Download"
        >
          <Download size={20} color="#fff" />
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title="Close"
        >
          <X size={20} color="#fff" />
        </button>
      </div>
      <div className="relative w-[90vw] h-[90vh]">
        <Image
          src={url}
          alt={fileName}
          fill
          unoptimized
          className="object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
