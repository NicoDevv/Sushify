import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { SushiItem } from '../types';

interface SushiItemCardProps {
  item: SushiItem;
}

const SushiItemCard: React.FC<SushiItemCardProps> = ({ item }) => {
  const { name, quantity, ingredients, modifications, isUrgent } = item;

  const hasAllergyModifications = modifications.some(mod => mod.isAllergy);

  return (
    <div className={`
      rounded-lg border ${isUrgent ? 'border-red-300 bg-red-50' : 'border-gray-200'}
      p-3 relative transition-all duration-200 hover:shadow-sm
    `}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium text-gray-700 mr-2">
            {quantity}
          </div>
          <div>
            <h4 className="font-medium text-gray-900 flex items-center">
              {name}
              {isUrgent && (
                <span className="ml-2 text-xs text-red-600 flex items-center">
                  <AlertTriangle size={12} className="mr-1" /> Urgent
                </span>
              )}
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              {ingredients.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {modifications.length > 0 && (
        <div className="mt-2 border-t border-dashed border-gray-200 pt-2">
          <h5 className="text-xs uppercase tracking-wide text-gray-500 mb-1">Modifications:</h5>
          <ul className="space-y-1">
            {modifications.map((mod, index) => (
              <li 
                key={index} 
                className={`
                  text-sm pl-2 border-l-2 
                  ${mod.isAllergy ? 
                    'border-red-400 text-red-700 font-medium' : 
                    'border-gray-300 text-gray-600'}
                `}
              >
                {mod.isAllergy && <AlertTriangle size={12} className="inline mr-1 text-red-500" />}
                {mod.description}
                {mod.isAllergy && <span className="text-xs font-bold ml-1">(ALLERGY)</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SushiItemCard;