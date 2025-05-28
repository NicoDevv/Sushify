import React from 'react';
import { Order, OrderStatus } from '../types';
import OrderItem from './OrderItem';

interface OrdersContainerProps {
  orders: Order[];
  status: OrderStatus;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const OrdersContainer: React.FC<OrdersContainerProps> = ({ orders, status, onStatusChange }) => {
  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-8 text-white/60 border border-dashed border-white/20 rounded-lg">
          Nessun ordine in questa categoria
        </div>
      ) : (
        orders.map(order => (
          <OrderItem
            key={order.id}
            order={order}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </div>
  );
};

export default OrdersContainer;