import { SushiItem } from '../types';

const API_BASE_URL = 'http://localhost:8000';

/**
 * Fetches all sushi items from the backend API
 */
export const fetchAllSushiItems = async (): Promise<SushiItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/piatto`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Map the backend data structure to our frontend SushiItem type
    return data.map((item: any) => ({
      id: item.id_piatto,
      name: item.nome_piatto,
      description: item.descrizione || '',
      price: item.prezzo,
      image: item.immagine_url || getDefaultImageForCategory(item.categoria),
      category: mapCategoryToFrontend(item.categoria),
      ingredients: item.componenti.map((comp: any) => comp.nome_componente),
      popular: isPopularDish(item.id_piatto)
    }));
  } catch (error) {
    console.error('Failed to fetch sushi items:', error);
    return []; // Return empty array on error
  }
};

/**
 * Fetches a single sushi item by its ID
 */
export const fetchSushiItemById = async (id: number): Promise<SushiItem | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/piatto/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const item = await response.json();
    
    return {
      id: item.id_piatto,
      name: item.nome_piatto,
      description: item.descrizione || '',
      price: item.prezzo,
      image: item.immagine_url || getDefaultImageForCategory(item.categoria),
      category: mapCategoryToFrontend(item.categoria),
      ingredients: item.componenti.map((comp: any) => comp.nome_componente),
      popular: isPopularDish(item.id_piatto)
    };
  } catch (error) {
    console.error(`Failed to fetch sushi item with id ${id}:`, error);
    return null;
  }
};

// Helper functions
const mapCategoryToFrontend = (backendCategory: string): 'nigiri' | 'maki' | 'sashimi' | 'special' => {
  const mapping: Record<string, 'nigiri' | 'maki' | 'sashimi' | 'special'> = {
    'Nigiri': 'nigiri',
    'Maki': 'maki',
    'Futomaki': 'maki',
    'Uramaki': 'maki',
    'Sashimi': 'sashimi',
    'Gunkan': 'special',
    'Set Menu': 'special',
    'Antipasto': 'special',
    'Ciotola': 'special',
    'Zuppa': 'special',
    'Altro': 'special'
  };
  
  return mapping[backendCategory] || 'special';
};

const getDefaultImageForCategory = (category: string): string => {
  switch (mapCategoryToFrontend(category)) {
    case 'nigiri':
      return 'https://images.pexels.com/photos/8951099/pexels-photo-8951099.jpeg';
    case 'maki':
      return 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg';
    case 'sashimi':
      return 'https://images.pexels.com/photos/3338499/pexels-photo-3338499.jpeg';
    case 'special':
      return 'https://images.pexels.com/photos/7245473/pexels-photo-7245473.jpeg';
    default:
      return 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg';
  }
};

// Popular dishes based on IDs from the database
const isPopularDish = (id: number): boolean => {
  // Common dishes from your database that are likely to be popular
  const popularDishIds = [100, 101, 109, 110, 111, 112, 124, 133];
  return popularDishIds.includes(id);
};