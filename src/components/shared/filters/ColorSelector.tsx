import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

const colorData = [
  { hex: "#DB0505", name: "Red" },
  { hex: "#222AEA", name: "Blue" },
  { hex: "#9E22EA", name: "Purple" },
  { hex: "#90A1A2", name: "Gray" },
  { hex: "#AAEA22", name: "Lime" },
  { hex: "#E8A2F4", name: "Pink" },
  { hex: "#FEEAB9", name: "Cream" },
  { hex: "#C4C3FC", name: "Lavender" },
  { hex: "#8A0084", name: "Dark Purple" },
  { hex: "#D8EDB6", name: "Mint" },
  { hex: "#D508C1", name: "Magenta" },
  { hex: "#F33076", name: "Hot Pink" },
  { hex: "#0CA25A", name: "Green" },
  { hex: "#950698", name: "Violet" },
  { hex: "#EA22BE", name: "Fuchsia" },
  { hex: "#EA9A22", name: "Orange" },
  { hex: "#22EA72", name: "Emerald" },
  { hex: "#EABE22", name: "Gold" },
  { hex: "#EAEA22", name: "Yellow" },
  { hex: "#65EA22", name: "Chartreuse" },
  { hex: "#EA4A22", name: "Orange Red" },
  { hex: "#22EAA7", name: "Turquoise" },
  { hex: "#E8BE7F", name: "Peach" },
  { hex: "#050968", name: "Navy" },
  { hex: "#95F2DC", name: "Aqua" },
  { hex: "#9E22EA", name: "Purple" },
  { hex: "#DA22EA", name: "Orchid" },
  { hex: "#BEBFD8", name: "Periwinkle" },
  { hex: "#B17961", name: "Brown" },
  { hex: "#B1F4EC", name: "Cyan" },
];

export default function ColorSelector({
  onChange,
  value,
}: {
  onChange: (hexCode: string) => void;
  value?: string;
}) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(
    value || "#0A60E1",
  );

  useEffect(() => {
    if (value) {
      const syncColorTimeout = window.setTimeout(() => {
        setSelectedColor(value);
      }, 0);

      return () => window.clearTimeout(syncColorTimeout);
    }
  }, [value]);

  const handleColorClick = (hexCode: string) => {
    setSelectedColor(hexCode);
    onChange(hexCode);
  };

  return (
    <div className="space-y-3">
      <Label>Select theme color</Label>

      <div className="flex flex-wrap gap-2">
        {colorData.map((color, i) => {
          const isSelected = selectedColor === color.hex;
          return (
            <div key={i} className="relative group">
              <Button
                type="button"
                size="icon"
                className={`w-6 h-6 aspect-square hover:cursor-pointer transition-all duration-200 hover:scale-125 hover:shadow-md hover:z-10 border-2 ${
                  isSelected
                    ? "border-gray-700 scale-110 ring-2 ring-offset-1 ring-gray-400"
                    : "border-transparent hover:border-gray-300"
                }`}
                style={{
                  backgroundColor: color.hex,
                }}
                onClick={() => handleColorClick(color.hex)}
                onMouseEnter={() => setHoveredColor(color.hex)}
                onMouseLeave={() => setHoveredColor(null)}
              />
              {hoveredColor === color.hex && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-20 pointer-events-none">
                  {color.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

