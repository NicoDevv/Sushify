import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import JapanesePattern from '../components/JapanesePattern';
import Header from '../components/Header';
import { useSushi } from '../context/SushiContext';

const MenuPage: React.FC = () => {
  const { items, loading, error, selectedMenuType, tableNumber } = useSushi();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const menuType = selectedMenuType || searchParams.get('type') || 'alacarte-regular';
  
  // Reindirizza alla pagina di selezione del tavolo se non c'è un numero di tavolo
  useEffect(() => {
    if (!tableNumber) {
      navigate('/table-select');
    }
    // Se c'è un tavolo ma non c'è un tipo di menu selezionato, vai alla pagina di selezione del menu
    else if (!selectedMenuType) {
      navigate('/menu-select');
    }
  }, [tableNumber, selectedMenuType, navigate]);

  // Get menu information based on type
  const getMenuInfo = () => {
    const isAllYouCanEat = menuType.startsWith('allyoucaneat');
    
    if (isAllYouCanEat) {
      const isFestive = menuType.includes('festive');
      const price = isFestive ? 
        (menuType.includes('cena') ? '€27.90' : '€17.90') : 
        (menuType.includes('cena') ? '€25.90' : '€15.90');
      
      return {
        title: `Menu All You Can Eat ${isFestive ? 'Festivo' : 'Feriale'}`,
        description: `Tutti i piatti che desideri ad un prezzo fisso di ${price}`,
        price
      };
    }
    
    return {
      title: 'Menu À La Carte',
      description: 'Scegli i tuoi piatti preferiti e paga per porzione',
      price: null
    };
  };

  const menuInfo = getMenuInfo();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-10 w-10 text-red-800 mx-auto mb-4" />
          <p className="text-gray-600">Caricamento del menù in corso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-800 mb-4">Impossibile caricare il menù</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }
  
  // Se non c'è un numero di tavolo o un tipo di menu, mostra un messaggio di caricamento mentre viene reindirizzato
  if (!tableNumber || !selectedMenuType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-10 w-10 text-red-800 mx-auto mb-4" />
          <p className="text-gray-600">Reindirizzamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 relative">
      <Header title={menuInfo.title} />
      <div className="pt-20 pb-8 min-h-screen relative">
        <JapanesePattern className="top-24 right-0" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-2">{menuInfo.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {menuInfo.description}
            </p>
            {menuInfo.price && (
              <div className="mt-4 inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full font-bold">
                Prezzo fisso: {menuInfo.price}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;