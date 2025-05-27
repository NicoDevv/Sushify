import React from 'react';

interface CategoryFilterProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ currentCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'nigiri', name: 'Nigiri' },
    { id: 'maki', name: 'Maki' },
    { id: 'sashimi', name: 'Sashimi' },
    { id: 'special', name: 'Special' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentCategory === category.id
              ? 'bg-red-800 text-white'
              : 'bg-white text-red-800 border border-red-800 hover:bg-red-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;