// Base API URL
const API_BASE_URL = 'http://localhost:8000';

// Helper function to handle API requests
export async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `API request failed with status ${response.status}`);
  }
  
  return await response.json() as T;
}

// API functions for menus
export async function getMenus() {
  return fetchAPI('/menu');
}

export async function getMenuById(menuId: number) {
  return fetchAPI(`/menu/${menuId}`);
}

// API functions for dishes
export async function getDishById(dishId: number) {
  return fetchAPI(`/piatto/${dishId}`);
}

export async function getModifiableDishComponents(dishId: number) {
  return fetchAPI(`/piatto/${dishId}/modifica`);
}

export async function addModifiedDishToCart(dishId: number, removedComponents: number[]) {
  return fetchAPI(`/piatto/${dishId}/modifica`, {
    method: 'POST',
    body: JSON.stringify({
      componenti_rimossi: removedComponents
    })
  });
}

// New API function for submitting orders
export async function submitOrder(orderData: {
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    componenti_rimossi?: number[];
  }>;
  tavolo: number;
  tipo_menu: string;
  note?: string;
}) {
  return fetchAPI('/ordine', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}