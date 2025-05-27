import React from 'react';
import { useSushi } from '../context/SushiContext';
import MenuCard from '../components/MenuCard';
import JapanesePattern from '../components/JapanesePattern';
import { Loader2 } from 'lucide-react';

const MenuPage: React.FC = () => {
  const { items, loading, error } = useSushi();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-10 w-10 text-red-800 mx-auto mb-4" />
          <p className="text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-800 mb-4">Failed to load menu</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 min-h-screen relative">
      <JapanesePattern className="top-24 right-0" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-900 mb-2">Our Sushi Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of authentic Japanese sushi, prepared with fresh ingredients and traditional techniques
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;