import React from 'react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: () => void;
  showUrgentOnly: boolean;
  onUrgentFilterChange: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortOrderChange,
  showUrgentOnly,
  onUrgentFilterChange
}) => {
  return (
    <div className="bg-white shadow-sm p-3">
      <div className="container mx-auto flex flex-col md:flex-row gap-3 justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cerca per id, cliente o tavolo..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 rounded-md border ${
              sortOrder === 'desc' ? 'bg-red-500 text-white border-red-500' : 'bg-white border-gray-300'
            }`}
            onClick={onSortOrderChange}
          >
            Più recenti prima
          </button>
          <button
            className={`px-4 py-2 rounded-md border ${
              sortOrder === 'asc' ? 'bg-red-500 text-white border-red-500' : 'bg-white border-gray-300'
            }`}
            onClick={onSortOrderChange}
          >
            Più vecchi prima
          </button>
          <button
            className={`px-4 py-2 rounded-md border ${
              showUrgentOnly ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border-gray-300'
            }`}
            onClick={onUrgentFilterChange}
          >
            {showUrgentOnly ? 'Tutti gli ordini' : 'Solo urgenti'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;