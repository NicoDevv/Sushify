import React from 'react';
import { ChefHat } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-900 text-white py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-3">
          <ChefHat className="text-yellow-300 mr-2" size={20} />
          <h2 className="text-lg font-bold">Sushify</h2>
        </div>
        <div className="text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Sushify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;