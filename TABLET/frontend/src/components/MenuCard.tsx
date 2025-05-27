import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSushi } from '../context/SushiContext';
import { SushiItem } from '../types';

interface MenuCardProps {
  item: SushiItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const { isALaCarte } = useSushi();

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => navigate(`/dish/${item.id}`)}
    >
      <img 
        src={item.image || 'https://via.placeholder.com/300x200?text=Sushi'}
        alt={item.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loops
          target.src = 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg'; // Fallback image
        }}
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-red-900">{item.name}</h3>
          {isALaCarte && (
            <span className="text-yellow-600 font-bold">€{item.price.toFixed(2)}</span>
          )}
        </div>
        <p className="text-gray-700 text-sm mb-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
            {item.category.toUpperCase()}
          </span>
          <button 
            className="text-xs text-red-800 font-semibold hover:text-red-600 flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${item.id}`);
            }}
          >
            PERSONALIZZA
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;