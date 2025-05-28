import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, AlertCircle, ArrowRight } from 'lucide-react';
import JapanesePattern from '../components/JapanesePattern';
import { useSushi } from '../context/SushiContext';

const TableSelectPage: React.FC = () => {
  const { setTableNumber, tableNumber } = useSushi();
  const navigate = useNavigate();
  const [inputTableNumber, setInputTableNumber] = useState<string>(tableNumber?.toString() || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Se c'è già un numero di tavolo impostato, vai direttamente alla landing page
  useEffect(() => {
    if (tableNumber) {
      navigate('/menu-select');
    }
  }, [tableNumber, navigate]);

  const handleContinue = () => {
    if (!inputTableNumber.trim()) {
      setValidationError('Per favore, inserisci il numero del tavolo');
      return;
    }

    const tableNum = parseInt(inputTableNumber.trim(), 10);
    if (isNaN(tableNum) || tableNum <= 0) {
      setValidationError('Inserisci un numero di tavolo valido');
      return;
    }

    // Nuovo controllo: il tavolo deve essere tra 1 e 20
    if (tableNum < 1 || tableNum > 20) {
      setValidationError('Il numero del tavolo deve essere compreso tra 1 e 20');
      return;
    }

    setTableNumber(tableNum);
    navigate('/menu-select'); // Vai alla pagina di selezione del menu
  };

  return (
    <div className="min-h-screen bg-red-50 relative overflow-hidden">
      <JapanesePattern className="top-0 left-0 opacity-10" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="text-red-800 mr-2" size={40} />
            <h1 className="text-4xl md:text-5xl font-bold text-red-900">
              Sushify
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Benvenuto! Per iniziare, inserisci il numero del tuo tavolo
          </p>
        </div>
        
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">Numero del Tavolo</h2>
          
          {validationError && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded flex items-center">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}
          
          <div className="mb-8">
            <label htmlFor="tableNumber" className="block text-gray-700 font-medium mb-2">
              Inserisci il numero del tuo tavolo * (1-20)
            </label>
            <input
              type="number"
              id="tableNumber"
              value={inputTableNumber}
              onChange={(e) => setInputTableNumber(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              placeholder="Es. 12"
              min="1"
              max="20"
            />
          </div>
          
          <button
            onClick={handleContinue}
            className="w-full py-3 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            Continua
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSelectPage;