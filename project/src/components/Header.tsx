import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChefHat, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return null;
  }

  return (
    <header className="bg-gradient-to-r from-red-800 to-red-900 text-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/menu')}
        >
          <ChefHat className="text-yellow-300" size={28} />
          <h1 className="text-xl md:text-2xl font-bold tracking-wider">
            Sushify
          </h1>
        </div>
        <button className="p-2 hover:bg-red-700 rounded-full transition-colors">
          <ShoppingCart className="text-white" size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;