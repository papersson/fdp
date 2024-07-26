'use client';

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

interface AssetContextType {
  assets: Asset[];
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset) => void;
  updateAsset: (updatedAsset: Asset) => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    const storedAssets = localStorage.getItem('assets');
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets));
    } else {
      const initialAssets = createHierarchy();
      setAssets(initialAssets);
      localStorage.setItem('assets', JSON.stringify(initialAssets));
    }
  }, []);

  const handleSetSelectedAsset = (asset: Asset) => {
    console.log('Setting selected asset:', asset.name);
    setSelectedAsset(asset);
  };

  const updateAsset = (updatedAsset: Asset) => {
    const updatedAssets = assets.map(asset => {
      if (asset.type === 'catalog' && updatedAsset.type === 'catalog' && asset.name === updatedAsset.name) {
        return updatedAsset;
      } else if (asset.type === 'catalog' && updatedAsset.type === 'schema') {
        return {
          ...asset,
          schemas: asset.schemas?.map(schema => 
            schema.name === updatedAsset.name ? updatedAsset : schema
          )
        };
      } else if (asset.type === 'catalog' && updatedAsset.type === 'table') {
        return {
          ...asset,
          schemas: asset.schemas?.map(schema => ({
            ...schema,
            tables: schema.tables?.map(table => 
              table.name === updatedAsset.name ? updatedAsset : table
            )
          }))
        };
      }
      return asset;
    });

    setAssets(updatedAssets);
    localStorage.setItem('assets', JSON.stringify(updatedAssets));

    if (selectedAsset && selectedAsset.name === updatedAsset.name) {
      setSelectedAsset(updatedAsset);
    }
  };

  return (
    <AssetContext.Provider value={{ assets, selectedAsset, setSelectedAsset: handleSetSelectedAsset, updateAsset }}>
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