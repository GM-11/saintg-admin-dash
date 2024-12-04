import React from "react";

interface SizeSelectorProps {
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
}

const SizeSelector = ({ selectedSizes, onSizeChange }: SizeSelectorProps) => {
  const availableSizes = [
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
    "48",
    "50",
    "52",
    "54",
    "56",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "Free",
    "N/A",
  ];

  const handleSizeClick = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    onSizeChange(newSizes);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Size</label>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => handleSizeClick(size)}
            className={`px-3 py-1.5 text-sm rounded ${
              selectedSizes.includes(size)
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
