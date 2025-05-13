import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import OrderItem from './OrderItem';

interface OrdersContainerProps {
  orders: Order[];
  status: OrderStatus;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const OrdersContainer: React.FC<OrdersContainerProps> = ({ 
  orders, 
  status, 
  onStatusChange 
}) => {
  const filteredOrders = orders.filter(order => order.status === status);
  
  const statusLabels: Record<OrderStatus, string> = {
    'new': 'New Orders',
    'in-progress': 'In Preparation',
    'completed': 'Completed'
  };

  const statusColors: Record<OrderStatus, string> = {
    'new': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    'completed': 'bg-green-100 text-green-800'
  };

  return (
    <div className="flex-1 min-w-[320px]">
      <div className={`rounded-t-lg px-4 py-3 ${statusColors[status]}`}>
        <h2 className="font-bold text-lg flex justify-between items-center">
          <span>{statusLabels[status]}</span>
          <span className="text-sm bg-white bg-opacity-80 rounded-full px-2 py-1">
            {filteredOrders.length}
          </span>
        </h2>
      </div>
      <div className="p-4 bg-gray-50 rounded-b-lg h-[calc(100%-56px)] overflow-y-auto">
        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No orders in this category
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <OrderItem 
                key={order.id} 
                order={order} 
                onStatusChange={onStatusChange} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersContainer;