import React from 'react';

interface ColorSelectorProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const colors = [
  { name: 'Soft Blue', value: 'bg-blue-100' },
  { name: 'Soft Green', value: 'bg-green-100' },
  { name: 'Soft Yellow', value: 'bg-yellow-100' },
  { name: 'Soft Pink', value: 'bg-pink-100' },
  { name: 'Soft Purple', value: 'bg-purple-100' },
  { name: 'Soft Indigo', value: 'bg-indigo-100' },
  { name: 'Soft Teal', value: 'bg-teal-100' },
  { name: 'Soft Orange', value: 'bg-orange-100' },
];

const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedColor, onSelectColor }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Background Color
      </label>
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelectColor(color.value)}
            className={`h-10 rounded-md ${color.value} ${
              selectedColor === color.value ? 'ring-2 ring-blue-500' : ''
            }`}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;