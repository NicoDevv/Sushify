import React from 'react';

// Component for adding decorative Japanese-style patterns to the background
const JapanesePattern: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute opacity-5 pointer-events-none ${className}`}>
      <div className="grid grid-cols-6 gap-4">
        {Array.from({ length: 36 }).map((_, index) => (
          <div 
            key={index} 
            className="w-12 h-12 border border-red-800 rounded-full flex items-center justify-center"
          >
            <div className="w-8 h-8 border border-red-800 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-red-800 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JapanesePattern;