import { Order } from '../types';

// Helper function to create a date object for relative times
const minutesAgo = (minutes: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    tableNumber: 5,
    customerName: 'Tanaka',
    status: 'new',
    createdAt: minutesAgo(2),
    estimatedTime: 15,
    items: [
      {
        id: 'ITEM-001',
        name: 'Salmon Nigiri',
        quantity: 4,
        ingredients: ['Fresh Salmon', 'Sushi Rice', 'Wasabi'],
        modifications: [],
        isUrgent: false,
      },
      {
        id: 'ITEM-002',
        name: 'Dragon Roll',
        quantity: 1,
        ingredients: ['Eel', 'Cucumber', 'Avocado', 'Unagi Sauce', 'Sesame Seeds'],
        modifications: [
          {
            description: 'Extra spicy mayo',
            isAllergy: false,
          }
        ],
        isUrgent: true,
      },
    ],
    notes: 'Celebrating anniversary - please make it special',
  },
  {
    id: 'ORD-002',
    tableNumber: 8,
    customerName: 'Yamamoto',
    status: 'in-progress',
    createdAt: minutesAgo(10),
    estimatedTime: 20,
    items: [
      {
        id: 'ITEM-003',
        name: 'Assorted Sashimi',
        quantity: 1,
        ingredients: ['Tuna', 'Salmon', 'Yellowtail', 'Sea Bream', 'Octopus'],
        modifications: [
          {
            description: 'No octopus',
            isAllergy: true,
          }
        ],
        isUrgent: false,
      },
      {
        id: 'ITEM-004',
        name: 'California Roll',
        quantity: 2,
        ingredients: ['Crab Stick', 'Avocado', 'Cucumber', 'Sesame Seeds'],
        modifications: [],
        isUrgent: false,
      },
    ],
  },
  {
    id: 'ORD-003',
    tableNumber: 12,
    customerName: 'Suzuki',
    status: 'new',
    createdAt: minutesAgo(5),
    estimatedTime: 15,
    items: [
      {
        id: 'ITEM-005',
        name: 'Spicy Tuna Roll',
        quantity: 2,
        ingredients: ['Fresh Tuna', 'Spicy Mayo', 'Green Onion', 'Sushi Rice', 'Nori'],
        modifications: [
          {
            description: 'Extra spicy',
            isAllergy: false,
          }
        ],
        isUrgent: false,
      },
    ],
  },
  {
    id: 'ORD-004',
    tableNumber: 3,
    customerName: 'Watanabe',
    status: 'completed',
    createdAt: minutesAgo(25),
    estimatedTime: 15,
    items: [
      {
        id: 'ITEM-006',
        name: 'Tempura Roll',
        quantity: 1,
        ingredients: ['Shrimp Tempura', 'Avocado', 'Cucumber', 'Spicy Mayo', 'Unagi Sauce'],
        modifications: [],
        isUrgent: false,
      },
      {
        id: 'ITEM-007',
        name: 'Miso Soup',
        quantity: 2,
        ingredients: ['Tofu', 'Wakame', 'Green Onion', 'Dashi'],
        modifications: [],
        isUrgent: false,
      },
    ],
  },
  {
    id: 'ORD-005',
    tableNumber: 7,
    customerName: 'Nakamura',
    status: 'in-progress',
    createdAt: minutesAgo(12),
    estimatedTime: 25,
    items: [
      {
        id: 'ITEM-008',
        name: 'Chef\'s Special Omakase',
        quantity: 1,
        ingredients: ['Chef\'s Selection of Premium Fish', 'Special Rice', 'Seasonal Ingredients'],
        modifications: [
          {
            description: 'No raw shellfish',
            isAllergy: true,
          }
        ],
        isUrgent: true,
      },
    ],
    notes: 'VIP customer - Chef Takashi to prepare',
  },
  {
    id: 'ORD-006',
    tableNumber: 9,
    customerName: 'Kobayashi',
    status: 'new',
    createdAt: minutesAgo(1),
    estimatedTime: 10,
    items: [
      {
        id: 'ITEM-009',
        name: 'Tuna Nigiri',
        quantity: 2,
        ingredients: ['Fresh Tuna', 'Sushi Rice', 'Wasabi'],
        modifications: [],
        isUrgent: false,
      },
      {
        id: 'ITEM-010',
        name: 'Cucumber Roll',
        quantity: 1,
        ingredients: ['Cucumber', 'Sushi Rice', 'Sesame Seeds'],
        modifications: [],
        isUrgent: false,
      },
    ],
  },
];