import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, Database, Table2 } from 'lucide-react';
import { Asset, Catalog, Schema, Table } from '../lib/types';

interface CatalogExplorerProps {
  assets: Asset[];
  onSelect: (asset: Asset) => void;
  isCollapsed: boolean;
  selectedAsset: Asset | null;
}

const CatalogExplorer: React.FC<CatalogExplorerProps> = ({ assets, onSelect, isCollapsed, selectedAsset }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderItem = (item: Asset, level = 0) => {
    const key = `${level}-${item.name}`;
    const isExpanded = expanded[key];
    const hasChildren = (item.type === 'catalog' && 'schemas' in item && item.schemas && item.schemas.length > 0) ||
                        (item.type === 'schema' && 'tables' in item && item.tables && item.tables.length > 0);
    let Icon = Folder;
    if (item.type === 'schema') Icon = Database;
    if (item.type === 'table') Icon = Table2;

    const isSelected = selectedAsset?.name === item.name && selectedAsset?.type === item.type;

    return (
      <div key={key} className="group">
        <div
          className={`flex items-center cursor-pointer p-2 transition-colors duration-150 ease-in-out
                      ${isSelected ? 'bg-bg-tertiary text-primary' : 'text-text-secondary hover:bg-white/50'}`}
          style={{ paddingLeft: isCollapsed ? '0.5rem' : `${level * 12 + 8}px` }}
          onClick={() => onSelect(item)}
        >
          <div className="w-6 flex justify-center mr-1">
            {hasChildren && !isCollapsed ? (
              <span
                className="p-1 rounded-full transition-colors duration-150 ease-in-out hover:bg-white"
                onClick={(e) => toggleExpand(key, e)}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            ) : (
              <span className="w-6"></span> // Placeholder for alignment
            )}
          </div>
          <Icon size={16} className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
          {!isCollapsed && <span className="truncate">{item.name}</span>}
        </div>
        {isExpanded && !isCollapsed && item.type === 'catalog' && 'schemas' in item && item.schemas && (
          <div>
            {item.schemas.map(schema => renderItem(schema, level + 1))}
          </div>
        )}
        {isExpanded && !isCollapsed && item.type === 'schema' && 'tables' in item && item.tables && (
          <div>
            {item.tables.map(table => renderItem(table, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-y-auto h-full">
      {assets.map(catalog => renderItem(catalog))}
    </div>
  );
};

export default CatalogExplorer;