import React from 'react';
import { ChefHat, Clock, Bell } from 'lucide-react';

interface HeaderProps {
  totalOrders: number;
  newOrders: number;
}

const Header: React.FC<HeaderProps> = ({ totalOrders, newOrders }) => {
  // Get current time
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  return (
    <div className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <ChefHat size={24} className="text-red-400 mr-2" />
          <h1 className="text-xl font-bold">Sakura Sushi Kitchen</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Clock size={18} className="text-gray-400 mr-1" />
            <span className="text-gray-300">{timeString}</span>
          </div>
          
          <div className="relative">
            <Bell size={20} className="text-gray-300 hover:text-white cursor-pointer transition-colors" />
            {newOrders > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {newOrders}
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">
            <span className="text-gray-400">Orders Today:</span>{' '}
            <span className="font-bold">{totalOrders}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;