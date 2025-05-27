import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SushiItem } from '../types';

interface MenuCardProps {
  item: SushiItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer relative"
      onClick={() => navigate(`/dish/${item.id}`)}
    >
      {item.popular && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-bl">
          POPULAR
        </div>
      )}
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 border-t-2 border-red-800">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-red-900">{item.name}</h3>
          <span className="text-yellow-600 font-bold">${item.price.toFixed(2)}</span>
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
            CUSTOMIZE
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;