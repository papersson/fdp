'use client'

import React from 'react';
import { useAssets } from '@/contexts/AssetContext';
import CatalogView from './CatalogView';
import SchemaView from './SchemaView';
import TableView from './TableView';

const AssetDetailView: React.FC = () => {
  const { selectedAsset } = useAssets();

  if (!selectedAsset) {
    return (
      <div className="h-full flex items-center justify-center text-text-secondary">
        Select an item from the catalog to view details
      </div>
    );
  }

  switch (selectedAsset.type) {
    case 'catalog':
      return <CatalogView catalog={selectedAsset} />;
    case 'schema':
      return <SchemaView schema={selectedAsset} />;
    case 'table':
      return <TableView table={selectedAsset} />;
    default:
      return <div>Unsupported asset type</div>;
  }
};

export default AssetDetailView;