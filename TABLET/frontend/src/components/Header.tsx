import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, ChefHat } from 'lucide-react';
import { useSushi } from '../context/SushiContext';
import Cart from './Cart';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Sushify" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useSushi();
  
  // Calcola il numero totale di articoli nel carrello
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  if (isLandingPage) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo e titolo statico */}
          <div className="flex items-center">
            <ChefHat className="text-red-800 mr-2" size={28} />
            <h1 className="text-xl font-bold text-red-900">{title}</h1>
          </div>
          
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:text-red-800 transition-colors"
            aria-label="Apri carrello"
          >
            <ShoppingBag size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;