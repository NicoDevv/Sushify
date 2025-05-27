export interface SushiItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'nigiri' | 'maki' | 'sashimi' | 'special';
  ingredients: string[];
  popular: boolean;
}

export type MenuType = 'allyoucaneat-regular' | 'allyoucaneat-festive' | 'alacarte-regular' | 'alacarte-festive';

export interface MenuOption {
  id: MenuType;
  backendId?: number; // Added to store the original backend ID
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
}