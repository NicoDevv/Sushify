import { Order } from '../types';

// Helper function to create a date object with an offset in minutes
const getDateWithOffset = (minutesAgo: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date;
};

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    tableNumber: 5,
    customerName: 'Marco Rossi',
    items: [
      { name: 'Nigiri Salmone', quantity: 4, isUrgent: true },
      { name: 'Uramaki California', quantity: 2, notes: 'Senza sesamo', isUrgent: false },
    ],
    status: 'new',
    createdAt: getDateWithOffset(5)
  },
  {
    id: 'ORD002',
    tableNumber: 3,
    customerName: 'Giulia Bianchi',
    items: [
      { name: 'Sashimi Mix', quantity: 1, isUrgent: false },
      { name: 'Miso Soup', quantity: 2, isUrgent: false },
    ],
    status: 'in-progress',
    createdAt: getDateWithOffset(15)
  },
  {
    id: 'ORD003',
    tableNumber: 8,
    customerName: 'Luca Verdi',
    items: [
      { name: 'Dragon Roll', quantity: 1, isUrgent: true },
      { name: 'Temaki Spicy Tuna', quantity: 3, isUrgent: false },
    ],
    status: 'new',
    createdAt: getDateWithOffset(2)
  },
  {
    id: 'ORD004',
    tableNumber: 2,
    customerName: 'Sofia Romano',
    items: [
      { name: 'Chirashi', quantity: 1, notes: 'Extra wasabi', isUrgent: false },
    ],
    status: 'completed',
    createdAt: getDateWithOffset(30)
  },
  {
    id: 'ORD005',
    tableNumber: 6,
    customerName: 'Alessandro Marino',
    items: [
      { name: 'Hosomaki Mix', quantity: 2, isUrgent: false },
      { name: 'Edamame', quantity: 1, isUrgent: false },
      { name: 'Sake Nigiri', quantity: 4, isUrgent: true },
    ],
    status: 'in-progress',
    createdAt: getDateWithOffset(10)
  }
];