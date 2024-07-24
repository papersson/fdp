'use client'

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { ChatAssistant } from './ChatAssistant';
import { useAssets } from '@/contexts/AssetContext';

interface FullScreenLayoutProps {
  children: React.ReactNode;
}

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ children }) => {
  const { assets, selectedAsset, setSelectedAsset } = useAssets();

  return (
    <div className="h-screen flex flex-col bg-bg-main text-text-primary">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar assets={assets} onSelect={setSelectedAsset} selectedAsset={selectedAsset} />
        <main className="flex-1 overflow-y-auto p-6 flex flex-col">
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
      <ChatAssistant />
    </div>
  );
};

export default FullScreenLayout;