import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMenuOptions, defaultMenuOptions } from '../data/menuOptions';
import { MenuOption } from '../types';
import { ChefHat } from 'lucide-react';
import JapanesePattern from '../components/JapanesePattern';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>(defaultMenuOptions);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMenuOptions = async () => {
      try {
        setLoading(true);
        const options = await fetchMenuOptions();
        setMenuOptions(options);
        setError(null);
      } catch (err) {
        console.error('Error loading menu options:', err);
        setError('Impossibile caricare le opzioni del menu. Utilizzo delle opzioni predefinite.');
      } finally {
        setLoading(false);
      }
    };

    getMenuOptions();
  }, []);

  return (
    <div className="min-h-screen bg-red-50 relative overflow-hidden">
      <JapanesePattern className="top-0 left-0 opacity-10" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="text-red-800 mr-2" size={40} />
            <h1 className="text-4xl md:text-5xl font-bold text-red-900">
              Sushify
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Scopri l'autentica cucina giapponese con le nostre opzioni di menu accuratamente selezionate
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse-slow flex space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="text-center mb-4 text-yellow-600">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {menuOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-red-900 mb-2">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {option.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-red-800">
                        {option.price > 0 ? `€${option.price.toFixed(2)}` : 'Paga per piatto'}
                      </span>
                      <button
                        onClick={() => navigate(`/menu?type=${option.id}`)}
                        className="px-6 py-2 bg-red-800 text-white rounded-full hover:bg-red-700 transition-colors"
                      >
                        Visualizza Menu
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;