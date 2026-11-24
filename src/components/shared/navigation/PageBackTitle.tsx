"use client";

import { ArrowLeft2 } from "iconsax-react";

export default function PageBackTitle({
  title,
  onBack,
  showBack = true,
}: {
  title: string;
  onBack: () => void;
  showBack?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {showBack && (
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition border"
        >
          <ArrowLeft2 size={20} variant="Linear" color="#555" />
        </button>
      )}

      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}
