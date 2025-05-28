import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Reindirizza immediatamente alla pagina di selezione del tavolo
    navigate('/table-select');
  }, [navigate]);

  // In teoria questo non dovrebbe essere mai visualizzato
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Reindirizzamento in corso...</p>
      </div>
    </div>
  );
};

export default LandingPage;