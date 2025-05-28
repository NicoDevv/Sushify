import React, { useState, useEffect, useMemo } from 'react';
import { Order, OrderStatus } from '../types';
import Header from '../components/Header';
import OrderContainer from '../components/OrdersContainer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders');
        
        // Convert string dates to Date objects and ensure all data is properly processed
        const ordersWithDates = response.data.map((order: any) => {
          // Process the items to ensure all ingredients and modifications are properly displayed
          const processedItems = order.items.map((item: any) => {
            console.log('Ingredienti ricevuti per', item.name, ':', item.ingredients);
            
            return {
              ...item,
              ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
              modifications: Array.isArray(item.modifications) 
                ? item.modifications.map((mod: any) => ({
                    description: mod.description || '',
                    isAllergy: Boolean(mod.isAllergy)
                  }))
                : []
            };
          });
          
          // Log dell'ordine completo per debugging
          console.log('Ordine elaborato:', {
            id: order.id,
            table: order.tableNumber,
            realTableId: order.tableId || 'Non disponibile',
            items: processedItems.map(i => ({
              name: i.name, 
              ingredients: i.ingredients,
              modifications: i.modifications
            }))
          });
          
          return {
            ...order,
            items: processedItems,
            tableNumber: order.tableNumber || 'N/A', // Usa il numero visualizzato nel ristorante
            originalTableId: order.tableId, // Mantieni anche l'ID originale se disponibile
            customerName: `Tavolo ${order.tableNumber || 'N/A'}`,
            createdAt: new Date(order.createdAt)
          };
        });
        
        // Filtra solo gli ordini nuovi
        const newOrders = ordersWithDates.filter((order: Order) => order.status === 'new');
        
        setOrders(newOrders);
        setError(null);
        
        // Log the processed orders for debugging
        console.log('Processed orders:', newOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            // If unauthorized, redirect to login
            console.log('Authentication failed, redirecting to login');
            setError('Sessione scaduta. Effettua nuovamente il login.');
            setTimeout(() => navigate('/'), 2000);
          } else if (err.code === 'ECONNABORTED' || !err.response) {
            // Timeout o errore di connessione
            setError('Impossibile connettersi al server. Riprova più tardi.');
          } else {
            // Handle other API errors
            const errorMsg = err.response?.data?.detail || 'Errore nel caricamento degli ordini. Riprova più tardi.';
            setError(errorMsg);
          }
        } else {
          // Handle network errors or other issues
          setError('Errore di connessione al server. Verifica la tua connessione.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    
    // Set up polling for regular updates
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 10000); // Changed from 30000 to 10000 (10 seconds)
    
    return () => clearInterval(intervalId);
  }, [navigate]);

  // Handle order status change - passa direttamente a completed
  const handleStatusChange = async (orderId: string) => {
    try {
      // Update UI optimistically - rimuoviamo l'ordine immediatamente
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      
      // Send update to server - impostiamo lo stato direttamente a completed
      await api.put(
        `/api/orders/${orderId}/status`,
        { status: 'completed' }
      );
      
    } catch (err) {
      console.error('Error updating order status:', err);
      
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Sessione scaduta. Effettua nuovamente il login.');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError('Impossibile aggiornare lo stato dell\'ordine. Riprova più tardi.');
        setTimeout(() => setError(null), 3000);
        
        // In caso di errore, ricarichiamo gli ordini per ripristinare lo stato corretto
        try {
          const response = await api.get('/api/orders');
          
          const ordersWithDates = response.data
            .map((order: any) => {
              // Process items again when refreshing
              const processedItems = order.items.map((item: any) => ({
                ...item,
                ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
                modifications: Array.isArray(item.modifications) 
                  ? item.modifications.map((mod: any) => ({
                      description: mod.description || '',
                      isAllergy: Boolean(mod.isAllergy)
                    }))
                  : []
              }));
              
              return {
                ...order,
                items: processedItems,
                tableNumber: order.tableNumber || 'N/A',
                customerName: `Tavolo ${order.tableNumber || 'N/A'}`,
                createdAt: new Date(order.createdAt)
              };
            })
            .filter((order: Order) => order.status === 'new');
            
          setOrders(ordersWithDates);
        } catch (refreshError) {
          console.error('Error refreshing orders:', refreshError);
        }
      }
    }
  };

  // Sort orders by creation time (newest first)
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [orders]);

  // Calculate stats
  const totalOrders = orders.length;
  const newOrdersCount = orders.length;

  return (
    <div className="flex flex-col min-h-screen bg-[url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=3540')] bg-cover bg-center">
      <div className="flex-1 relative z-10 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/60 before:to-black/40 before:-z-10">
        <Header totalOrders={totalOrders} newOrders={newOrdersCount} />
        
        <main className="container mx-auto px-4 py-6">
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-center">
              {error}
            </div>
          )}
          
          {loading && orders.length === 0 ? (
            <div className="mt-8 flex justify-center">
              <div className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-white text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
                <p>Caricamento ordini...</p>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              {/* Only New Orders Column */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Nuovi Ordini
                </h2>
                <div className="space-y-4">
                  <OrderContainer 
                    orders={sortedOrders}
                    status="new"
                    onStatusChange={handleStatusChange}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;