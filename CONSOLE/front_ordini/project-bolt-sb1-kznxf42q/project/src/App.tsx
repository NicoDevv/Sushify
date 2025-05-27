import React, { useState, useEffect, useMemo } from 'react';
import { mockOrders } from './data/mockOrders';
import { Order, OrderStatus } from './types';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import OrdersContainer from './components/OrdersContainer';

function App() {
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header totalOrders={totalOrders} newOrders={newOrdersCount} />
      
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortOrderChange={toggleSortOrder}
        showUrgentOnly={showUrgentOnly}
        onUrgentFilterChange={toggleUrgentFilter}
      />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-230px)]">
          <OrdersContainer
            orders={filteredOrders}
            status="new"
            onStatusChange={handleStatusChange}
          />
          <OrdersContainer
            orders={filteredOrders}
            status="in-progress"
            onStatusChange={handleStatusChange}
          />
          <OrdersContainer
            orders={filteredOrders}
            status="completed"
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;