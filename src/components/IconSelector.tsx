import React from 'react';
import { Briefcase, Code, PenTool, BarChart, Megaphone, Coffee, Zap, Star } from 'lucide-react';

interface IconSelectorProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
}

const icons = [
  { name: 'Briefcase', component: Briefcase },
  { name: 'Code', component: Code },
  { name: 'PenTool', component: PenTool },
  { name: 'BarChart', component: BarChart },
  { name: 'Megaphone', component: Megaphone },
  { name: 'Coffee', component: Coffee },
  { name: 'Zap', component: Zap },
  { name: 'Star', component: Star },
];

const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelectIcon }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Icon
      </label>
      <div className="grid grid-cols-4 gap-2">
        {icons.map((icon) => (
          <button
            key={icon.name}
            type="button"
            onClick={() => onSelectIcon(icon.name)}
            className={`p-2 rounded-md ${
              selectedIcon === icon.name ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100'
            }`}
          >
            <icon.component className="h-6 w-6 mx-auto" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconSelector;