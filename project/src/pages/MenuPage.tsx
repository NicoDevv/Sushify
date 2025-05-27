import React from 'react';
import { useSushi } from '../context/SushiContext';
import MenuCard from '../components/MenuCard';
import JapanesePattern from '../components/JapanesePattern';

const MenuPage: React.FC = () => {
  const { items } = useSushi();

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