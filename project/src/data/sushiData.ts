import { SushiItem } from '../types';

export const sushiItems: SushiItem[] = [
  {
    id: 1,
    name: 'Maguro Nigiri',
    description: 'Fresh tuna on a bed of seasoned rice',
    price: 5.99,
    image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'nigiri',
    ingredients: ['Tuna', 'Rice', 'Wasabi', 'Soy Sauce'],
    popular: true
  },
  {
    id: 2,
    name: 'Sake Nigiri',
    description: 'Premium salmon on seasoned rice',
    price: 5.50,
    image: 'https://images.pexels.com/photos/8951099/pexels-photo-8951099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'nigiri',
    ingredients: ['Salmon', 'Rice', 'Wasabi', 'Soy Sauce'],
    popular: true
  },
  {
    id: 3,
    name: 'California Roll',
    description: 'Crab, avocado and cucumber rolled in seaweed and rice',
    price: 8.99,
    image: 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'maki',
    ingredients: ['Crab Meat', 'Avocado', 'Cucumber', 'Rice', 'Seaweed', 'Sesame Seeds'],
    popular: true
  },
  {
    id: 4,
    name: 'Spicy Tuna Roll',
    description: 'Spicy tuna and cucumber wrapped in seaweed and rice',
    price: 9.99,
    image: 'https://images.pexels.com/photos/2098143/pexels-photo-2098143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'maki',
    ingredients: ['Tuna', 'Spicy Mayo', 'Cucumber', 'Rice', 'Seaweed', 'Tempura Flakes'],
    popular: false
  },
  {
    id: 5,
    name: 'Salmon Sashimi',
    description: 'Premium slices of fresh salmon',
    price: 10.99,
    image: 'https://images.pexels.com/photos/3338499/pexels-photo-3338499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'sashimi',
    ingredients: ['Salmon', 'Wasabi', 'Soy Sauce', 'Pickled Ginger'],
    popular: false
  },
  {
    id: 6,
    name: 'Dragon Roll',
    description: 'Eel and cucumber inside, avocado and spicy sauce on top',
    price: 12.99,
    image: 'https://images.pexels.com/photos/7245473/pexels-photo-7245473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'special',
    ingredients: ['Eel', 'Cucumber', 'Avocado', 'Rice', 'Seaweed', 'Spicy Sauce', 'Sesame Seeds'],
    popular: true
  },
  {
    id: 7,
    name: 'Rainbow Roll',
    description: 'California roll topped with various types of sashimi',
    price: 13.99,
    image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'special',
    ingredients: ['Crab Meat', 'Avocado', 'Cucumber', 'Tuna', 'Salmon', 'Yellowtail', 'Rice', 'Seaweed'],
    popular: true
  },
  {
    id: 8,
    name: 'Tamago Nigiri',
    description: 'Sweet Japanese omelette on seasoned rice',
    price: 4.50,
    image: 'https://images.pexels.com/photos/7245474/pexels-photo-7245474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'nigiri',
    ingredients: ['Egg', 'Sugar', 'Soy Sauce', 'Rice', 'Wasabi'],
    popular: false
  }
];