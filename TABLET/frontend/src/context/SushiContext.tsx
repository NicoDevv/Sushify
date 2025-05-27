import React, { createContext, useContext, useState, useEffect } from 'react';
import { SushiItem } from '../types';
import { fetchAllSushiItems } from '../services/sushiService';

interface SushiContextType {
  items: SushiItem[];
  loading: boolean;
  error: string | null;
  getItemById: (id: number) => SushiItem | undefined;
  customizeDish: (id: number, removedIngredients: string[]) => void;
  removedIngredients: Record<number, string[]>;
}

const SushiContext = createContext<SushiContextType | undefined>(undefined);

export const SushiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<SushiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [removedIngredients, setRemovedIngredients] = useState<Record<number, string[]>>({});

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

  const customizeDish = (id: number, removed: string[]) => {
    setRemovedIngredients(prev => ({
      ...prev,
      [id]: removed
    }));
  };

  return (
    <SushiContext.Provider value={{ 
      items, 
      loading, 
      error,
      getItemById, 
      customizeDish, 
      removedIngredients 
    }}>
      {children}
    </SushiContext.Provider>
  );
};

export const useSushi = (): SushiContextType => {
  const context = useContext(SushiContext);
  if (!context) {
    throw new Error('useSushi must be used within a SushiProvider');
  }
  return context;
};