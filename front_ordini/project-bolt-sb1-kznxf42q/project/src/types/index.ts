export type OrderStatus = 'new' | 'in-progress' | 'completed';

export interface Modification {
  description: string;
  isAllergy: boolean;
}

export interface SushiItem {
  id: string;
  name: string;
  quantity: number;
  ingredients: string[];
  modifications: Modification[];
  isUrgent: boolean;
}

export interface Order {
  id: string;
  tableNumber: number;
  customerName: string;
  items: SushiItem[];
  status: OrderStatus;
  createdAt: Date;
  notes?: string;
  estimatedTime?: number; // in minutes
}