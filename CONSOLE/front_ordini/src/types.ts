export type OrderStatus = 'new' | 'in-progress' | 'completed';

export interface OrderItem {
  name: string;
  quantity: number;
  notes?: string;
  isUrgent: boolean;
}

export interface Order {
  id: string;
  tableNumber: number;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
}