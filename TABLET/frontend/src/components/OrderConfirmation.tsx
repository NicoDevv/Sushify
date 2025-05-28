import React, { useState } from 'react';
import { useSushi } from '../context/SushiContext';
import { submitOrder } from '../utils/api';
import { Check, AlertCircle, Loader2 } from 'lucide-react';

interface OrderConfirmationProps {
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onClose }) => {
  const { cartItems, clearCart, selectedMenuType, tableNumber, orderNotes } = useSushi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!tableNumber) {
      setError('Nessun numero di tavolo impostato. Torna alla schermata iniziale e seleziona nuovamente il menu.');
      return;
    }

    if (!cartItems.length) {
      setError('Il carrello è vuoto');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          componenti_rimossi: item.removedIngredientIds || []
        })),
        tavolo: tableNumber,
        tipo_menu: selectedMenuType || 'alacarte-regular',
        note: orderNotes || undefined
      };
      
      // Submit the order
      const response = await submitOrder(orderData);
      
      // Handle success
      setSubmitted(true);
      setOrderId(response.id_ordine);
      
      // Clear the cart
      clearCart();
      
    } catch (err: any) {
      setError(err.message || 'Si è verificato un errore durante l\'invio dell\'ordine');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={30} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ordine Confermato!</h2>
            <p className="text-gray-600 mb-6">
              Il tuo ordine #{orderId} è stato ricevuto e verrà preparato a breve.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors"
            >
              Torna al Menu
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-red-900 mb-4">Conferma Ordine</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 flex items-center">
                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="mb-6">
              <p className="text-gray-700">Stai per inviare un ordine per il tavolo <strong>{tableNumber}</strong>.</p>
              
              {orderNotes && (
                <div className="mt-2">
                  <h3 className="text-sm font-semibold text-gray-600">Note:</h3>
                  <p className="text-gray-600 text-sm italic">{orderNotes}</p>
                </div>
              )}
              
              <div className="mt-4 p-3 bg-yellow-50 rounded">
                <p className="text-sm text-yellow-800">
                  Verifica che il tuo ordine sia completo prima di confermare.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                Annulla
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Invio in corso...
                  </>
                ) : (
                  'Conferma Ordine'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;