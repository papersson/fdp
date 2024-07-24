'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import CatalogExplorer from './CatalogExplorer';
import { Asset } from '../lib/types';

interface SidebarProps {
  assets: Asset[];
  onSelect: (asset: Asset) => void;
  selectedAsset: Asset | null;
}

const Sidebar: React.FC<SidebarProps> = ({ assets, onSelect, selectedAsset }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-bg-secondary transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && <h2 className="text-lg font-heading font-medium text-text-primary">Catalog</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-bg-tertiary transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        {!isCollapsed && (
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search catalog..."
              className="w-full pl-8 pr-4 py-2 bg-bg-main border-b border-border focus:border-primary"
            />
            <Search size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          </div>
        )}
      </div>
      <CatalogExplorer assets={assets} onSelect={onSelect} isCollapsed={isCollapsed} selectedAsset={selectedAsset} />
    </aside>
  );
};

export default Sidebar;