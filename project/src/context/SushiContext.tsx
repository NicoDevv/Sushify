import React, { createContext, useContext, useState } from 'react';
import { sushiItems } from '../data/sushiData';
import { SushiItem } from '../types';

interface SushiContextType {
  items: SushiItem[];
  getItemById: (id: number) => SushiItem | undefined;
  customizeDish: (id: number, removedIngredients: string[]) => void;
  removedIngredients: Record<number, string[]>;
}

const SushiContext = createContext<SushiContextType | undefined>(undefined);

export const SushiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items] = useState<SushiItem[]>(sushiItems);
  const [removedIngredients, setRemovedIngredients] = useState<Record<number, string[]>>({});

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
    <SushiContext.Provider value={{ items, getItemById, customizeDish, removedIngredients }}>
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