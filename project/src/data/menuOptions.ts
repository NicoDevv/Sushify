import { MenuOption } from '../types';

// Define a function to fetch menus from the backend
export async function fetchMenuOptions(): Promise<MenuOption[]> {
  try {
    // Get all available menus from the backend API
    const response = await fetch('http://localhost:8000/menu');
    const data = await response.json();
    
    // Map backend menu data to frontend MenuOption format
    return data.available_menus.map((menu: any) => {
      // Map menu IDs to frontend menu types
      const menuType = mapMenuTypeFromId(menu.id);
      
      return {
        id: menuType,
        backendId: menu.id, // Store the original backend ID for API calls
        name: menu.nome,
        description: getMenuDescription(menuType),
        price: getMenuPrice(menu.id),
        image: getMenuImage(menuType),
        features: getMenuFeatures(menuType)
      };
    });
  } catch (error) {
    console.error('Error fetching menu options:', error);
    // Return default menu options if API call fails
    return defaultMenuOptions;
  }
}

// Helper functions to map backend IDs to frontend data
function mapMenuTypeFromId(id: number): string {
  switch(id) {
    case 10: return 'allyoucaneat-regular';
    case 20: return 'allyoucaneat-festive';
    case 30: return 'allyoucaneat-regular';
    case 40: return 'allyoucaneat-festive';
    case 50: return 'alacarte-regular';
    case 60: return 'alacarte-festive';
    default: return 'alacarte-regular';
  }
}

function getMenuDescription(type: string): string {
  switch(type) {
    case 'allyoucaneat-regular': 
      return 'Esperienza sushi illimitata con la nostra selezione premium';
    case 'allyoucaneat-festive': 
      return 'Selezione festiva speciale con ingredienti premium';
    case 'alacarte-regular': 
      return 'Scegli dal nostro menu accuratamente curato';
    case 'alacarte-festive': 
      return 'Selezione premium per occasioni speciali';
    default:
      return 'Seleziona i tuoi piatti di sushi preferiti';
  }
}

function getMenuPrice(id: number): number {
  // Prices from the database according to your SQL file
  switch(id) {
    case 10: return 15.90;
    case 20: return 17.90;
    case 30: return 25.90;
    case 40: return 27.90;
    case 50: return 0;
    case 60: return 0;
    default: return 0;
  }
}

function getMenuImage(type: string): string {
  switch(type) {
    case 'allyoucaneat-regular':
      return 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg';
    case 'allyoucaneat-festive':
      return 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg';
    case 'alacarte-regular':
      return 'https://images.pexels.com/photos/2098143/pexels-photo-2098143.jpeg';
    case 'alacarte-festive':
      return 'https://images.pexels.com/photos/3338499/pexels-photo-3338499.jpeg';
    default:
      return 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg';
  }
}

function getMenuFeatures(type: string): string[] {
  switch(type) {
    case 'allyoucaneat-regular':
      return [
        'Ordini illimitati senza limiti di tempo',
        'Accesso completo al menu regolare',
        'Ingredienti freschi ogni giorno',
        'Include zuppa di miso'
      ];
    case 'allyoucaneat-festive':
      return [
        'Ordini illimitati senza limiti di tempo',
        'Accesso a piatti festivi speciali',
        'Sake premium incluso',
        'Selezione speciale di dessert'
      ];
    case 'alacarte-regular':
      return [
        'Paghi per piatto',
        'Nessun limite di tempo',
        'Porzioni personalizzabili',
        'Disponibile da asporto'
      ];
    case 'alacarte-festive':
      return [
        'Piatti festivi speciali',
        'Ingredienti premium',
        'Specialità esclusive dello chef',
        'Selezioni stagionali'
      ];
    default:
      return ['Opzioni menu personalizzabili'];
  }
}

// Default options to use as fallback if API fails
export const defaultMenuOptions: MenuOption[] = [
  {
    id: 'allyoucaneat-regular',
    name: 'All You Can Eat',
    description: 'Esperienza sushi illimitata con la nostra selezione premium',
    price: 29.99,
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    features: [
      'Ordini illimitati senza limiti di tempo',
      'Accesso completo al menu regolare',
      'Ingredienti freschi ogni giorno',
      'Include zuppa di miso'
    ]
  },
  {
    id: 'allyoucaneat-festive',
    name: 'All You Can Eat Festivo',
    description: 'Selezione festiva speciale con ingredienti premium',
    price: 39.99,
    image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg',
    features: [
      'Ordini illimitati senza limiti di tempo',
      'Accesso a piatti festivi speciali',
      'Sake premium incluso',
      'Selezione speciale di dessert'
    ]
  },
  {
    id: 'alacarte-regular',
    name: 'À La Carte',
    description: 'Scegli dal nostro menu accuratamente curato',
    price: 0,
    image: 'https://images.pexels.com/photos/2098143/pexels-photo-2098143.jpeg',
    features: [
      'Paghi per piatto',
      'Nessun limite di tempo',
      'Porzioni personalizzabili',
      'Disponibile da asporto'
    ]
  },
  {
    id: 'alacarte-festive',
    name: 'À La Carte Festivo',
    description: 'Selezione premium per occasioni speciali',
    price: 0,
    image: 'https://images.pexels.com/photos/3338499/pexels-photo-3338499.jpeg',
    features: [
      'Piatti festivi speciali',
      'Ingredienti premium',
      'Specialità esclusive dello chef',
      'Selezioni stagionali'
    ]
  }
];