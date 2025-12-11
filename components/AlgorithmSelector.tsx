import React from 'react';
import { AlgorithmType } from '../types';
import { ALGORITHM_OPTIONS } from '../constants';
import { Settings2 } from 'lucide-react';

interface AlgorithmSelectorProps {
  selected: AlgorithmType[];
  onChange: (selected: AlgorithmType[]) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ selected, onChange }) => {
  const toggleAlgorithm = (algo: AlgorithmType) => {
    if (selected.includes(algo)) {
      // Prevent unselecting all
      if (selected.length > 1) {
        onChange(selected.filter((a) => a !== algo));
      }
    } else {
      onChange([...selected, algo]);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Settings2 className="w-4 h-4" />
        <span>Aktif Algoritmalar</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {ALGORITHM_OPTIONS.map((option) => {
          const isActive = selected.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleAlgorithm(option.id)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                ${
                  isActive
                    ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800 ring-1 ring-brand-500/20'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmSelector;