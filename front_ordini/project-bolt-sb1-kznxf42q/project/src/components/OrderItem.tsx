import React from 'react';
import { Clock, AlertTriangle, CheckCircle, ChefHat } from 'lucide-react';
import { Order, OrderStatus, SushiItem } from '../types';
import { getRelativeTime, formatTime } from '../utils/timeUtils';
import SushiItemCard from './SushiItemCard';

interface OrderItemProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onStatusChange }) => {
  const { id, tableNumber, customerName, items, status, createdAt, notes, estimatedTime } = order;
  
  const statusColors = {
    new: 'bg-blue-500',
    'in-progress': 'bg-amber-500',
    completed: 'bg-green-500',
  };

  const statusText = {
    new: 'New',
    'in-progress': 'In Progress',
    completed: 'Completed',
  };

  const nextStatus: Record<OrderStatus, OrderStatus | null> = {
    new: 'in-progress',
    'in-progress': 'completed',
    completed: null,
  };

  const handleStatusChange = () => {
    const next = nextStatus[status];
    if (next) {
      onStatusChange(id, next);
    }
  };

  const hasUrgentItems = items.some(item => item.isUrgent);
  const hasAllergies = items.some(item => 
    item.modifications.some(mod => mod.isAllergy)
  );

  // Count total number of items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`
      bg-white rounded-lg shadow-md overflow-hidden border-l-4 
      ${status === 'new' ? 'border-blue-500' : 
        status === 'in-progress' ? 'border-amber-500' : 'border-green-500'}
      transition-all duration-300 hover:shadow-lg
    `}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-800">#{id}</span>
              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full text-white ${statusColors[status]}`}>
                {statusText[status]}
              </span>
              {hasUrgentItems && (
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-500 text-white flex items-center">
                  <AlertTriangle size={12} className="mr-1" /> Urgent
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Table {tableNumber} • {customerName}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={14} className="mr-1" />
              {getRelativeTime(createdAt)}
            </div>
            <div className="text-sm font-medium mt-1">
              Est. time: {formatTime(estimatedTime)}
            </div>
          </div>
        </div>

        {notes && (
          <div className="mb-3 p-2 bg-yellow-50 border-l-2 border-yellow-300 text-sm italic text-gray-700">
            {notes}
          </div>
        )}

        {hasAllergies && (
          <div className="mb-3 p-2 bg-red-50 border-l-2 border-red-300 text-sm font-medium text-red-700 flex items-center">
            <AlertTriangle size={16} className="mr-1 text-red-500" />
            Contains allergy modifications! Check details below.
          </div>
        )}

        <div className="mb-3">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Order Items ({totalItems})</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <SushiItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-100">
          {nextStatus[status] && (
            <button
              onClick={handleStatusChange}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors
                ${status === 'new' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 
                  'bg-green-100 text-green-800 hover:bg-green-200'}
              `}
            >
              {status === 'new' ? (
                <>
                  <ChefHat size={16} className="mr-1" />
                  Start Preparation
                </>
              ) : (
                <>
                  <CheckCircle size={16} className="mr-1" />
                  Mark as Complete
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;