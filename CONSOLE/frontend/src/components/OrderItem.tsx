import React from 'react';
import { Order } from '../types';
import { Clock, Check } from 'lucide-react';

interface OrderItemProps {
  order: Order;
  onStatusChange: (orderId: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onStatusChange }) => {
  const formattedTime = new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(order.createdAt);

  const calculateTimePassed = () => {
    const now = new Date();
    const minutes = Math.floor((now.getTime() - order.createdAt.getTime()) / 60000);
    return `${minutes} min`;
  };
  
  const handleReady = () => {
    onStatusChange(order.id);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">#{order.id}</span>
            <span className="text-sm text-white/70">Tavolo {order.tableNumber}</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-medium text-white">{order.customerName}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/70 text-xs">
          <Clock className="w-4 h-4" />
          <div className="flex flex-col items-end">
            <span>{formattedTime}</span>
            <span>{calculateTimePassed()}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.quantity}x</span>
              <span>{item.name}</span>
              {item.isUrgent && (
                <span className="bg-red-500/20 border border-red-500/50 text-red-300 text-xs px-2 py-0.5 rounded">Urgente</span>
              )}
            </div>
            {item.notes && (
              <span className="text-sm text-white/60 italic">{item.notes}</span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleReady}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors bg-green-500/20 border border-green-500/50 text-green-300 hover:bg-green-500/30"
      >
        Pronto <Check className="w-4 h-4" />
      </button>
    </div>
  );
};

export default OrderItem;