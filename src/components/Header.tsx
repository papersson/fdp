import React from 'react';
import { Hexagon } from 'lucide-react'; // Using Hexagon as a placeholder icon

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-bg-main border-b border-border">
      <div className="px-4 py-4 flex items-center">
        <div className="flex items-center">
          <Hexagon size={24} className="text-primary mr-2" /> {/* Placeholder icon */}
          <h1 className="text-xl font-heading font-semibold text-text-primary">Falck Data Platform</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;