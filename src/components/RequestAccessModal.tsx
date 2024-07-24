import React, { useState, useEffect } from 'react';
import { Catalog, Schema, Table } from '@/lib/types';
import { CheckCircle, Circle, ChevronDown, ChevronRight, Info } from 'lucide-react';

interface RequestAccessModalProps {
  onClose: () => void;
  catalog: Catalog;
}

const RequestAccessModal: React.FC<RequestAccessModalProps> = ({ onClose, catalog }) => {
  const [accessType, setAccessType] = useState<'databricks' | 'sqlWarehouse'>('databricks');
  const [users, setUsers] = useState<string[]>([]);
  const [newUser, setNewUser] = useState('');
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set([catalog.name]));

  const mockUsers = [
    'john.doe@falck.com',
    'jane.smith@falck.com',
    'mike.johnson@falck.com',
    'emily.brown@falck.com',
    'david.wilson@falck.com'
  ];

  useEffect(() => {
    if (newUser.length > 0) {
      setSuggestions(mockUsers.filter(user => user.toLowerCase().includes(newUser.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  }, [newUser]);

  const handleAddUser = () => {
    if (newUser && !users.includes(newUser)) {
      setUsers([...users, newUser]);
      setNewUser('');
    }
  };

  const handleRemoveUser = (user: string) => {
    setUsers(users.filter(u => u !== user));
  };

  const handleObjectSelection = (objectName: string, type: 'catalog' | 'schema' | 'table') => {
    let newSelection: string[];
    if (selectedObjects.includes(objectName)) {
      newSelection = selectedObjects.filter(obj => !obj.startsWith(objectName));
    } else {
      newSelection = [...selectedObjects, objectName];
      if (type === 'catalog') {
        catalog.schemas?.forEach(schema => {
          newSelection.push(schema.name);
          schema.tables?.forEach(table => newSelection.push(table.name));
        });
      } else if (type === 'schema') {
        const schema = catalog.schemas?.find(s => s.name === objectName);
        schema?.tables?.forEach(table => newSelection.push(table.name));
      }
    }
    setSelectedObjects(newSelection);
  };

  const isDisabled = (objectName: string, type: 'catalog' | 'schema' | 'table') => {
    if (type === 'catalog') return false;
    if (type === 'schema') return selectedObjects.includes(catalog.name);
    return selectedObjects.includes(catalog.name) || 
           selectedObjects.includes(catalog.schemas?.find(s => s.tables?.some(t => t.name === objectName))?.name || '');
  };

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  const renderDataObjects = (item: Catalog | Schema | Table, level = 0) => {
    const padding = level * 20;
    const isExpanded = expandedItems.has(item.name);
    const hasChildren = 'schemas' in item || 'tables' in item;

    return (
      <div key={item.name}>
        <div style={{ paddingLeft: `${padding}px` }} className="flex items-center py-2">
          {hasChildren && (
            <button onClick={() => toggleExpand(item.name)} className="mr-2">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          {!hasChildren && <span className="w-6" />}
          <button
            onClick={() => handleObjectSelection(item.name, item.type)}
            disabled={isDisabled(item.name, item.type)}
            className={`flex items-center ${isDisabled(item.name, item.type) ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
          >
            {selectedObjects.includes(item.name) ? (
              <CheckCircle size={20} className="text-primary mr-2" />
            ) : (
              <Circle size={20} className="text-gray-400 mr-2" />
            )}
            <span>{item.name}</span>
          </button>
        </div>
        {isExpanded && (
          <div>
            {'schemas' in item && item.schemas?.map(schema => renderDataObjects(schema, level + 1))}
            {'tables' in item && item.tables?.map(table => renderDataObjects(table, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    console.log('Submitting access request:', { accessType, users, selectedObjects });
    alert('Access request submitted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-heading font-medium text-text-primary mb-6">Request Access</h3>
        
        <div className="mb-6">
          <label className="block text-text-secondary mb-2 font-medium">Access Type</label>
          <div className="flex space-x-4 mb-2">
            <button
              className={`py-2 px-4 rounded-md transition-colors ${accessType === 'databricks' ? 'bg-primary text-white' : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'}`}
              onClick={() => setAccessType('databricks')}
            >
              Databricks
            </button>
            <button
              className={`py-2 px-4 rounded-md transition-colors ${accessType === 'sqlWarehouse' ? 'bg-primary text-white' : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'}`}
              onClick={() => setAccessType('sqlWarehouse')}
            >
              SQL Warehouse
            </button>
          </div>
          <p className="text-sm text-text-secondary flex items-center">
            <Info size={16} className="mr-1" />
            {accessType === 'databricks' 
              ? 'Choose Databricks for end-user access to query and analyze data.'
              : 'Choose SQL Warehouse for scheduled data ingestion from Unity Catalog.'
            }
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-text-secondary mb-2 font-medium">Add Users (Azure AD)</label>
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <input
                type="text"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                className="w-full p-2 border border-border rounded-md"
                placeholder="Enter Azure AD user"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setNewUser(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={handleAddUser}
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-text-secondary mb-2 font-medium">Selected Users</label>
          <div className="bg-bg-secondary p-2 rounded-md flex flex-wrap gap-2">
            {users.map((user, index) => (
              <div key={index} className="bg-white px-3 py-1 rounded-full flex items-center shadow-sm">
                <span className="mr-2">{user}</span>
                <button
                  onClick={() => handleRemoveUser(user)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-text-secondary mb-2 font-medium">Select Data Objects</label>
          <div className="bg-bg-secondary p-2 rounded-md max-h-60 overflow-y-auto">
            {renderDataObjects(catalog)}
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-6 flex items-center">
          <Info size={16} className="mr-1" />
          Estimated approval time: 2-3 business days
        </p>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-bg-secondary text-text-secondary py-2 px-6 rounded-md hover:bg-bg-tertiary transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover transition-colors"
            onClick={handleSubmit}
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAccessModal;