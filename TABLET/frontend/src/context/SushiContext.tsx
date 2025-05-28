import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { SushiItem, MenuType } from '../types';
import { fetchAllSushiItems } from '../services/sushiService';

// Extending the interface to include component IDs
interface IngredientInfo {
  id: number;
  name: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  removedIngredients?: string[];
  removedIngredientIds?: number[]; // New field to store component IDs
  image?: string;
  menuType?: MenuType;
}

interface SushiContextType {
  items: SushiItem[];
  loading: boolean;
  error: string | null;
  removedIngredients: Record<number, string[]>;
  removedIngredientIds: Record<number, number[]>; // New field for component IDs
  customizeDish: (id: number, ingredients: string[], ingredientIds: number[]) => void;
  getItemById: (id: number) => SushiItem | undefined;
  selectedMenuType: MenuType | null;
  setSelectedMenuType: (type: MenuType | null) => void;
  tableNumber: number | null; // Nuovo campo per il numero del tavolo
  setTableNumber: (number: number | null) => void; // Nuovo metodo per impostare il numero del tavolo
  isALaCarte: boolean;
  cartItems: CartItem[];
  addToCart: (itemId: number, removedIngredients?: string[], removedIngredientIds?: number[]) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  cartTotal: number;
  orderNotes: string; // Nuovo campo per le note dell'ordine
  setOrderNotes: (notes: string) => void; // Nuovo metodo per impostare le note
}

const SushiContext = createContext<SushiContextType | undefined>(undefined);

export const SushiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<SushiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [removedIngredients, setRemovedIngredients] = useState<Record<number, string[]>>({});
  const [removedIngredientIds, setRemovedIngredientIds] = useState<Record<number, number[]>>({});
  const [selectedMenuType, setSelectedMenuType] = useState<MenuType | null>(null);
  const [tableNumber, setTableNumber] = useState<number | null>(null); // Nuovo stato per il numero del tavolo
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderNotes, setOrderNotes] = useState<string>(''); // Nuovo stato per le note dell'ordine
  
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

  const customizeDish = (id: number, ingredients: string[], ingredientIds: number[]) => {
    setRemovedIngredients(prev => ({
      ...prev,
      [id]: ingredients
    }));
    
    // Also store the ingredient IDs
    setRemovedIngredientIds(prev => ({
      ...prev,
      [id]: ingredientIds
    }));
  };

  // Aggiungi un elemento al carrello
  const addToCart = (itemId: number, removedIngredients: string[] = [], removedIngredientIds: number[] = []) => {
    const item = getItemById(itemId);
    
    if (!item) return;
    
    // Controlla se il menu è All You Can Eat
    const isAllYouCanEat = selectedMenuType ? selectedMenuType.includes('allyoucaneat') : false;
    
    // Se è All You Can Eat, il prezzo è 0, altrimenti usa il prezzo del piatto
    const priceToUse = isAllYouCanEat ? 0 : item.price;
    
    setCartItems(prevItems => {
      // Controlla se l'elemento esiste già nel carrello con gli stessi ingredienti rimossi
      const existingItemIndex = prevItems.findIndex(
        cartItem => cartItem.id === itemId && 
        JSON.stringify(cartItem.removedIngredients || []) === JSON.stringify(removedIngredients)
      );
      
      if (existingItemIndex >= 0) {
        // Se esiste, aumenta la quantità
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Altrimenti aggiungi un nuovo elemento
        return [...prevItems, {
          id: item.id,
          name: item.name,
          price: priceToUse, // Usa il prezzo calcolato in base al tipo di menu
          quantity: 1,
          removedIngredients: removedIngredients.length > 0 ? removedIngredients : undefined,
          removedIngredientIds: removedIngredientIds.length > 0 ? removedIngredientIds : undefined,
          image: item.image,
          menuType: selectedMenuType // Memorizza anche il tipo di menu per riferimento futuro
        }];
      }
    });
  };

  // Rimuovi un elemento dal carrello
  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Svuota il carrello
  const clearCart = () => {
    setCartItems([]);
  };

  // Aggiorna la quantità di un elemento nel carrello
  const updateItemQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Calcola il totale del carrello considerando i tipi di menu
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <SushiContext.Provider value={{ 
      items, 
      loading, 
      error,
      removedIngredients,
      removedIngredientIds,
      customizeDish,
      getItemById,
      selectedMenuType,
      setSelectedMenuType,
      tableNumber,
      setTableNumber,
      isALaCarte,
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateItemQuantity,
      cartTotal,
      orderNotes,
      setOrderNotes
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