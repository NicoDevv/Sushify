import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search sushi..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 pl-10 pr-4 rounded-full border-2 border-red-300 focus:border-red-500 focus:outline-none"
      />
      <Search className="absolute left-3 top-2.5 text-red-400" size={18} />
    </div>
  );
};

export default SearchBar;