'use client';

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { ChatAssistant } from './ChatAssistant';
import { AssetProvider, useAssets } from '@/contexts/AssetContext';
import { UserProvider } from '@/contexts/UserContext';

interface FullScreenLayoutProps {
  children: React.ReactNode;
}

const FullScreenLayoutContent: React.FC<FullScreenLayoutProps> = ({ children }) => {
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

const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      <AssetProvider>
        <FullScreenLayoutContent>{children}</FullScreenLayoutContent>
      </AssetProvider>
    </UserProvider>
  );
};

export default FullScreenLayout;