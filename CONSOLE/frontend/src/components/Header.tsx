import React from 'react';
import { ChefHat, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  totalOrders: number;
  newOrders: number;
}

const Header: React.FC<HeaderProps> = ({ totalOrders, newOrders }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete the authentication cookie
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/10 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white">Sushify Ordini</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <div className="bg-white/5 backdrop-blur-sm p-2 rounded-lg border border-white/10">
              <span className="text-white/80">Ordini totali:</span>{' '}
              <span className="font-medium text-white">{totalOrders}</span>
            </div>
            <div className="bg-red-500/20 border border-red-500/50 p-2 rounded-lg">
              <span className="text-white/80">Nuovi ordini:</span>{' '}
              <span className="font-medium text-white">{newOrders}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 rounded-full p-2 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;