import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSushi } from '../context/SushiContext';
import { ArrowLeft, Check, X } from 'lucide-react';
import JapanesePattern from '../components/JapanesePattern';

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getItemById, customizeDish, removedIngredients } = useSushi();
  
  const item = getItemById(Number(id));
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  // Initialize with already removed ingredients
  useEffect(() => {
    if (item) {
      const removed = removedIngredients[item.id] || [];
      setSelectedIngredients(removed);
    }
  }, [item, removedIngredients]);
  
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

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSave = () => {
    customizeDish(item.id, selectedIngredients);
    navigate(`/dish/${item.id}`);
  };

  return (
    <div className="pt-20 pb-8 min-h-screen relative">
      <JapanesePattern className="top-24 right-0" />
      
      <div className="container mx-auto px-4 max-w-3xl">
        <button 
          onClick={() => navigate(`/dish/${item.id}`)}
          className="flex items-center text-red-800 hover:text-red-600 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          Torna al Piatto
        </button>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-red-900 mb-2">Personalizza: {item.name}</h1>
            <p className="text-gray-600 mb-6">Rimuovi gli ingredienti che non desideri nel tuo piatto.</p>
            
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4">Ingredienti</h3>
              <div className="space-y-2">
                {item.ingredients.map((ingredient, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-red-400 shadow-sm"
                  >
                    <span className={selectedIngredients.includes(ingredient) ? 'line-through text-gray-400' : ''}>
                      {ingredient}
                    </span>
                    <button 
                      onClick={() => toggleIngredient(ingredient)}
                      className={`p-1 rounded-full ${
                        selectedIngredients.includes(ingredient)
                          ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {selectedIngredients.includes(ingredient) ? <Check size={18} /> : <X size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/dish/${item.id}`)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Annulla
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors"
              >
                Salva Modifiche
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;