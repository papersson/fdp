'use client';

import React, { useState } from 'react';
import { Schema } from '@/lib/types';
import EditableText from './EditableText';
import MarkdownEditor from './MarkdownEditor';
import { useUser } from '@/contexts/UserContext';
import { useAssets } from '@/contexts/AssetContext';
import ReactMarkdown from 'react-markdown';

interface SchemaViewProps {
  schema: Schema;
}

interface Tab {
  id: string;
  title: string;
  content: string;
}

const SchemaView: React.FC<SchemaViewProps> = ({ schema }) => {
  const { role } = useUser();
  const { updateAsset } = useAssets();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [tabs, setTabs] = useState<Tab[]>(schema.tabs || []);
  const [schemaMaturity, setSchemaMaturity] = useState<'low' | 'medium' | 'high'>(schema.maturity || 'medium');
  const [editingTab, setEditingTab] = useState<string | null>(null);

  const isContributor = role === 'contributor' || role === 'productOwner';

  const handleUpdate = (updatedSchema: Schema) => {
    updateAsset(updatedSchema);
  };

  const handleDescriptionSave = (newDescription: string) => {
    handleUpdate({ ...schema, description: newDescription });
  };

  const handleMaturityChange = (newMaturity: 'low' | 'medium' | 'high') => {
    setSchemaMaturity(newMaturity);
    handleUpdate({ ...schema, maturity: newMaturity });
  };

  const handleTabContentSave = (tabId: string, newContent: string) => {
    const updatedTabs = tabs.map(tab => 
      tab.id === tabId ? { ...tab, content: newContent } : tab
    );
    setTabs(updatedTabs);
    handleUpdate({ ...schema, tabs: updatedTabs });
    setEditingTab(null);
  };

  const handleAddTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: 'New Tab',
      content: 'Add content here...'
    };
    const updatedTabs = [...tabs, newTab];
    setTabs(updatedTabs);
    handleUpdate({ ...schema, tabs: updatedTabs });
    setActiveTab(newTab.id);
    setEditingTab(newTab.id);
  };

  const handleRemoveTab = (tabId: string) => {
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(updatedTabs);
    handleUpdate({ ...schema, tabs: updatedTabs });
    if (activeTab === tabId) {
      setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].id : null);
    }
    setEditingTab(null);
  };

  const handleTabTitleChange = (tabId: string, newTitle: string) => {
    const updatedTabs = tabs.map(tab => 
      tab.id === tabId ? { ...tab, title: newTitle } : tab
    );
    setTabs(updatedTabs);
    handleUpdate({ ...schema, tabs: updatedTabs });
  };

  return (
    <div className="p-6 bg-bg-main h-full overflow-y-auto">
      <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">
        {schema.displayName || schema.name}
      </h2>

      <EditableText
        initialValue={schema.description || ''}
        onSave={handleDescriptionSave}
        className="text-text-secondary mb-4"
      />

      <div className="mb-6">
        <h3 className="text-lg font-medium text-text-primary mb-2">Schema Maturity</h3>
        <div className="flex items-center space-x-4">
          {['low', 'medium', 'high'].map((level) => (
            <button
              key={level}
              onClick={() => isContributor && handleMaturityChange(level as 'low' | 'medium' | 'high')}
              className={`px-4 py-2 rounded-md ${
                schemaMaturity === level
                  ? 'bg-primary text-white'
                  : 'bg-bg-secondary text-text-secondary'
              } ${isContributor ? 'cursor-pointer' : 'cursor-default'}`}
              disabled={!isContributor}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 border-b border-border flex items-center">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative group">
            <button
              className={`mr-4 py-2 px-4 font-medium ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {isContributor ? (
                <EditableText
                  initialValue={tab.title}
                  onSave={(newTitle) => handleTabTitleChange(tab.id, newTitle)}
                  className="inline-block"
                />
              ) : (
                tab.title
              )}
            </button>
            {isContributor && (
              <button
                onClick={() => handleRemoveTab(tab.id)}
                className="absolute top-0 right-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {isContributor && (
          <button
            onClick={handleAddTab}
            className="py-2 px-4 text-primary hover:bg-bg-secondary rounded-t-md transition-colors"
          >
            + Add Tab
          </button>
        )}
      </div>

      <div className="mt-4">
        {activeTab && (
          <>
            {editingTab === activeTab && isContributor ? (
              <MarkdownEditor
                initialValue={tabs.find(tab => tab.id === activeTab)?.content || ''}
                onSave={(newContent) => handleTabContentSave(activeTab, newContent)}
              />
            ) : (
              <div className="relative">
                <div className="prose max-w-none">
                  <ReactMarkdown>{tabs.find(tab => tab.id === activeTab)?.content || ''}</ReactMarkdown>
                </div>
                {isContributor && (
                  <button
                    onClick={() => setEditingTab(activeTab)}
                    className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded hover:bg-primary-hover transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SchemaView;