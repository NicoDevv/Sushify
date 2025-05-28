import React, { useState } from 'react';
import { useSushi } from '../context/SushiContext';
import { X, Plus, Minus, ShoppingBag, Trash2, Info } from 'lucide-react';
import OrderConfirmation from './OrderConfirmation';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateItemQuantity, cartTotal, clearCart, isALaCarte } = useSushi();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  if (!isOpen) return null;

  // Controlla se ci sono elementi di menu diversi nel carrello
  const hasAllYouCanEatItems = cartItems.some(item => item.menuType?.includes('allyoucaneat'));
  const hasALaCarteItems = cartItems.some(item => item.menuType?.includes('alacarte'));
  const hasMixedMenuTypes = hasAllYouCanEatItems && hasALaCarteItems;

  const handleCheckout = () => {
    setShowOrderConfirmation(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay sfumato */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>
      
      {/* Pannello del carrello */}
      <div className="relative w-full max-w-md bg-white h-full shadow-xl overflow-y-auto animate-slide-in-right">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-900 flex items-center">
              <ShoppingBag className="mr-2 text-red-700" size={24} />
              Carrello
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-red-800">
              <X size={24} />
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <ShoppingBag size={64} className="w-full h-full" />
            </div>
            <p className="text-gray-600 mb-4">Il tuo carrello è vuoto</p>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
            >
              Continua lo shopping
            </button>
          </div>
        ) : (
          <>
            {hasMixedMenuTypes && (
              <div className="p-4 bg-yellow-50 flex items-start border-b border-yellow-100">
                <Info size={20} className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                <p className="text-sm text-yellow-700">
                  Il tuo carrello contiene piatti da menu diversi. I piatti All You Can Eat hanno prezzo zero perché inclusi nel prezzo fisso del menu.
                </p>
              </div>
            )}
            
            <div className="p-4">
              {cartItems.map((item, index) => (
                <div key={index} className="mb-4 p-4 border-b border-gray-100">
                  <div className="flex justify-between">
                    <div className="flex">
                      {item.image && (
                        <div className="w-16 h-16 mr-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg';
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-red-900">{item.name}</h3>
                        {item.removedIngredients && item.removedIngredients.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            <span className="font-medium">Senza:</span> {item.removedIngredients.join(', ')}
                          </p>
                        )}
                        {item.price > 0 ? (
                          <p className="text-red-700 mt-1">€{item.price.toFixed(2)}</p>
                        ) : (
                          <p className="text-green-600 mt-1 text-sm italic">Incluso nel menu</p>
                        )}
                        
                        {/* Mostra il tipo di menu se ci sono menu misti */}
                        {hasMixedMenuTypes && (
                          <p className="text-xs text-gray-500">
                            {item.menuType?.includes('allyoucaneat') ? 'All You Can Eat' : 'À La Carte'}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-500 hover:text-red-700"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 text-gray-800 w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-500 hover:text-red-700"
                      >
                        <Plus size={16} />
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-3 p-1 text-gray-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Totale</span>
                <span className="text-xl font-bold text-red-900">
                  {cartTotal > 0 ? `€${cartTotal.toFixed(2)}` : (
                    hasAllYouCanEatItems ? 'Incluso nel menu' : '€0.00'
                  )}
                </span>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={handleCheckout}
                  className="w-full py-3 bg-red-800 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Procedi all'ordine
                </button>
                <button 
                  onClick={clearCart}
                  className="w-full py-2 text-red-800 hover:text-red-700 transition-colors text-sm flex items-center justify-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  Svuota carrello
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Show the order confirmation dialog when checkout is clicked */}
      {showOrderConfirmation && (
        <OrderConfirmation 
          onClose={() => {
            setShowOrderConfirmation(false);
            onClose(); // Close the cart after completing the order
          }} 
        />
      )}
    </div>
  );
};

export default Cart;