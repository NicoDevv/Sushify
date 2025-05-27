import React from 'react';
import { Search, Filter, Clock, SortAsc, SortDesc } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
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
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search orders by ID, table, or customer name..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onUrgentFilterChange}
            className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
              showUrgentOnly
                ? 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} className="mr-1" />
            Urgent Only
          </button>
          
          <button
            onClick={onSortOrderChange}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Clock size={16} className="mr-1" />
            {sortOrder === 'asc' ? (
              <><SortAsc size={16} className="mr-1" /> Oldest First</>
            ) : (
              <><SortDesc size={16} className="mr-1" /> Newest First</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;