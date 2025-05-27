import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSushi } from '../context/SushiContext';
import { ArrowLeft, Edit } from 'lucide-react';
import JapanesePattern from '../components/JapanesePattern';

const DishPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getItemById, removedIngredients } = useSushi();
  
  const item = getItemById(Number(id));
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-800 mb-4">Piatto non trovato</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
          >
            Torna al Menù
          </button>
        </div>
      </div>
    );
  }

  // Get removed ingredients for this dish
  const dishRemovedIngredients = removedIngredients[item.id] || [];
  // Filter ingredients to show only those not removed
  const currentIngredients = item.ingredients.filter(ing => !dishRemovedIngredients.includes(ing));

  return (
    <div className="pt-20 pb-8 min-h-screen relative">
      <JapanesePattern className="top-24 left-0" />
      
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-red-800 hover:text-red-600 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          Torna al Menù
        </button>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mb-2">
                    {item.category.toUpperCase()}
                  </span>
                  <h1 className="text-2xl font-bold text-red-900 mb-2">{item.name}</h1>
                </div>
                <span className="text-2xl font-bold text-yellow-600">€{item.price.toFixed(2)}</span>
              </div>
              
              <p className="text-gray-700 mb-6">{item.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Ingredienti</h3>
                <div className="flex flex-wrap gap-2">
                  {currentIngredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
                
                {dishRemovedIngredients.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Ingredienti Rimossi:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dishRemovedIngredients.map((ingredient, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full line-through"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate(`/edit/${item.id}`)}
                  className="flex items-center justify-center px-4 py-2 bg-white border-2 border-red-800 text-red-800 rounded hover:bg-red-50 transition-colors"
                >
                  <Edit size={18} className="mr-2" />
                  Personalizza Piatto
                </button>
                <button className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors">
                  Aggiungi all'Ordine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishPage;