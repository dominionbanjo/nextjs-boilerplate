"use client";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

export default function CustomSwitch({ checked, onChange }: CustomSwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative w-8 h-5 flex items-center"
    >
      {/* OUTER TRACK */}
      <span
        className={`
          absolute inset-0 rounded-full border-2 transition-colors
          ${checked ? "border-[#0A60E1]" : "border-[#303030]"}
        `}
      />

      {/* INNER CIRCLE */}
      <span
        className={`
          absolute w-3.5 h-3.5 rounded-full border-2 transition-all duration-200
          ${
            checked
              ? "right-1 border-[#0A60E1] bg-[#0A60E1]"
              : "left-1 border-[#2E2E2E] bg-white"
          }
        `}
      />
    </button>
  );
}
