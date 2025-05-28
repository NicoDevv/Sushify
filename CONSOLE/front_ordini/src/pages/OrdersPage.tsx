import React, { useState, useEffect, useMemo } from 'react';
import { mockOrders } from '../data/mockOrders';
import { Order, OrderStatus } from '../types';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import OrderContainer from '../components/OrdersContainer';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);

  // Handle order status change
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        order =>
          order.id.toLowerCase().includes(lowercasedSearch) ||
          order.customerName.toLowerCase().includes(lowercasedSearch) ||
          `table ${order.tableNumber}`.includes(lowercasedSearch)
      );
    }
    
    // Apply urgent filter
    if (showUrgentOnly) {
      result = result.filter(order =>
        order.items.some(item => item.isUrgent)
      );
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });
    
    return result;
  }, [orders, searchTerm, sortOrder, showUrgentOnly]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  // Toggle urgent filter
  const toggleUrgentFilter = () => {
    setShowUrgentOnly(prev => !prev);
  };

  // Calculate stats
  const totalOrders = orders.length;
  const newOrdersCount = orders.filter(order => order.status === 'new').length;

  return (
    <div className="flex flex-col min-h-screen bg-[url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=3540')] bg-cover bg-center">
      <div className="flex-1 relative z-10 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/60 before:to-black/40 before:-z-10">
        <Header totalOrders={totalOrders} newOrders={newOrdersCount} />
        
        <main className="container mx-auto px-4 py-6">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOrder={sortOrder}
            onSortOrderChange={toggleSortOrder}
            showUrgentOnly={showUrgentOnly}
            onUrgentFilterChange={toggleUrgentFilter}
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* New Orders Column */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Nuovi Ordini
              </h2>
              <div className="space-y-4">
                <OrderContainer 
                  orders={filteredOrders.filter(order => order.status === 'new')}
                  status="new"
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>
            
            {/* In Progress Column */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                In Preparazione
              </h2>
              <div className="space-y-4">
                <OrderContainer 
                  orders={filteredOrders.filter(order => order.status === 'in-progress')}
                  status="in-progress"
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>
            
            {/* Completed Column */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Completati
              </h2>
              <div className="space-y-4">
                <OrderContainer 
                  orders={filteredOrders.filter(order => order.status === 'completed')}
                  status="completed"
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;