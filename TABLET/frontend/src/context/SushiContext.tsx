import React, { createContext, useContext, useState, useEffect } from 'react';
import { SushiItem, MenuType } from '../types';
import { fetchAllSushiItems } from '../services/sushiService';

interface SushiContextType {
  items: SushiItem[];
  loading: boolean;
  error: string | null;
  removedIngredients: Record<number, string[]>;
  customizeDish: (id: number, ingredients: string[]) => void;
  getItemById: (id: number) => SushiItem | undefined;
  selectedMenuType: MenuType | null;
  setSelectedMenuType: (type: MenuType | null) => void;
  isALaCarte: boolean;
}

const SushiContext = createContext<SushiContextType | undefined>(undefined);

export const SushiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<SushiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [removedIngredients, setRemovedIngredients] = useState<Record<number, string[]>>({});
  const [selectedMenuType, setSelectedMenuType] = useState<MenuType | null>(null);
  
  // Derive if the selected menu is à la carte
  const isALaCarte = selectedMenuType ? selectedMenuType.startsWith('alacarte') : false;

  // Fetch sushi items when the component mounts
  useEffect(() => {
    const loadSushiItems = async () => {
      try {
        setLoading(true);
        const data = await fetchAllSushiItems();
        setItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to load menu items. Please try again later.');
        console.error('Error loading sushi items:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSushiItems();
  }, []);

  const getItemById = (id: number) => {
    return items.find(item => item.id === id);
  };

  const customizeDish = (id: number, ingredients: string[]) => {
    setRemovedIngredients(prev => ({
      ...prev,
      [id]: ingredients
    }));
  };

  return (
    <SushiContext.Provider value={{ 
      items, 
      loading, 
      error,
      removedIngredients,
      customizeDish,
      getItemById,
      selectedMenuType,
      setSelectedMenuType,
      isALaCarte
    }}>
      {children}
    </SushiContext.Provider>
  );
};

export const useSushi = () => {
  const context = useContext(SushiContext);
  if (context === undefined) {
    throw new Error('useSushi must be used within a SushiProvider');
  }
  return context;
};