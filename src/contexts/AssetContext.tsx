'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Asset, Catalog, Schema, Table } from '@/lib/types';
import { catalogData } from '@/mockData/catalogData';
import { schemaData } from '@/mockData/schemaData';
import { tableData } from '@/mockData/tableData';

const createHierarchy = (): Asset[] => {
  const elmCatalog: Catalog = {
    ...catalogData,
    schemas: [
      {
        ...schemaData,
        tables: Object.values(tableData)
      }
    ]
  };

  return [elmCatalog];
};

const fakeData: Asset[] = createHierarchy();

interface AssetContextType {
  assets: Asset[];
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset) => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    setAssets(fakeData);
  }, []);

  const handleSetSelectedAsset = (asset: Asset) => {
    console.log('Setting selected asset:', asset.name);
    setSelectedAsset(asset);
  };

  return (
    <AssetContext.Provider value={{ assets, selectedAsset, setSelectedAsset: handleSetSelectedAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};