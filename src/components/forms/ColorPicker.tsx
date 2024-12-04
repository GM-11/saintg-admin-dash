import React from "react";
import { Plus } from "lucide-react";

interface ColorPickerProps {
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
}

const ColorPicker = ({ selectedColors, onColorChange }: ColorPickerProps) => {
  const availableColors = [
    "#000000",
    "#FFFFFF",
    "#808080",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
  ];

  const handleColorClick = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onColorChange(newColors);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Colors</label>
      <div className="flex flex-wrap gap-3">
        {availableColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleColorClick(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColors.includes(color)
                ? "border-purple-600 scale-110"
                : "border-transparent hover:scale-105"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        <button
          type="button"
          className="w-8 h-8 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center hover:border-purple-600"
        >
          <Plus size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
