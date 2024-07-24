'use client'

import React from 'react'
import AssetDetailView from '@/components/AssetDetailView'
import { useAssets } from '@/contexts/AssetContext'

export default function Home() {
  const { selectedAsset } = useAssets();
  console.log('Home rendering with selectedAsset:', selectedAsset?.name);

  return (
    <AssetDetailView />
  )
}