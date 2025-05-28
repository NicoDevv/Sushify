import { SushiItem } from '../types';

const API_BASE_URL = 'http://localhost:8080'; // Modificato da 8000 a 8080

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
    return data.map((item: any) => {
      // Assicurati che ci sia sempre un'immagine
      const imageUrl = item.immagine_url && item.immagine_url.trim() !== '' 
        ? item.immagine_url 
        : getDefaultImageForCategory(item.categoria, item.id_piatto);
        
      return {
        id: item.id_piatto,
        name: item.nome_piatto,
        description: item.descrizione || '',
        price: item.prezzo,
        image: imageUrl,
        category: mapCategoryToFrontend(item.categoria),
        ingredients: item.componenti.map((comp: any) => comp.nome_componente),
        popular: isPopularDish(item.id_piatto)
      };
    });
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
    
    // Assicurati che ci sia sempre un'immagine
    const imageUrl = item.immagine_url && item.immagine_url.trim() !== '' 
      ? item.immagine_url 
      : getDefaultImageForCategory(item.categoria, item.id_piatto);
      
    return {
      id: item.id_piatto,
      name: item.nome_piatto,
      description: item.descrizione || '',
      price: item.prezzo,
      image: imageUrl,
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

// Modifica la funzione getDefaultImageForCategory per garantire che ogni piatto abbia un'immagine

const getDefaultImageForCategory = (category: string, id: number): string => {
  // Base image collections for each category
  const nigiriImages = [
    'https://images.pexels.com/photos/8951099/pexels-photo-8951099.jpeg',
    'https://images.pexels.com/photos/359993/pexels-photo-359993.jpeg',
    'https://images.pexels.com/photos/8448323/pexels-photo-8448323.jpeg',
    'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800'
  ];
  
  const makiImages = [
    'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg',
    'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg',
    'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=800', // Nuova immagine sostituita
    'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800'
  ];
  
  const sashimiImages = [
    'https://images.pexels.com/photos/3338499/pexels-photo-3338499.jpeg',
    'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg',
    'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg',
    'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800'
  ];
  
  const specialImages = [
    'https://images.pexels.com/photos/7245473/pexels-photo-7245473.jpeg',
    'https://images.pexels.com/photos/6407641/pexels-photo-6407641.jpeg',
    'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&w=800'
  ];

  const antipastoImages = [
    'https://images.unsplash.com/photo-1608500218890-c4f9479c7fc8?auto=format&fit=crop&w=800',
    'https://images.pexels.com/photos/884596/pexels-photo-884596.jpeg',
    'https://images.unsplash.com/photo-1602030638412-bb8dfa9b9525?auto=format&fit=crop&w=800',
    'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg'
  ];

  const ciolaImages = [
    'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=800',
    'https://images.pexels.com/photos/1199985/pexels-photo-1199985.jpeg',
    'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800',
    'https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg'
  ];

  // Map the category name to the corresponding image array
  let imageCollection;
  const normalizedCategory = mapCategoryToFrontend(category).toLowerCase();
  
  switch (normalizedCategory) {
    case 'nigiri':
      imageCollection = nigiriImages;
      break;
    case 'maki':
    case 'uramaki':
    case 'futomaki':
      imageCollection = makiImages;
      break;
    case 'sashimi':
      imageCollection = sashimiImages;
      break;
    case 'antipasto':
    case 'zuppa':
      imageCollection = antipastoImages;
      break;
    case 'ciotola':
    case 'set menu':
      imageCollection = ciolaImages;
      break;
    default:
      imageCollection = specialImages;
  }
  
  // Use dish ID to select a consistent image for each dish
  const index = Math.abs(id) % imageCollection.length;
  return imageCollection[index];
};

// Popular dishes based on IDs from the database
const isPopularDish = (id: number): boolean => {
  // Common dishes from your database that are likely to be popular
  const popularDishIds = [100, 101, 109, 110, 111, 112, 124, 133];
  return popularDishIds.includes(id);
};