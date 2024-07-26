'use client';

import React, { useState, useEffect } from 'react';
import { Table, Column } from '@/lib/types';
import { useUser } from '@/contexts/UserContext';
import { useAssets } from '@/contexts/AssetContext';
import EditableText from './EditableText';
import { tableData } from '@/mockData/tableData';

interface TableViewProps {
  table: Table;
}

interface ColumnDetailsModalProps {
  column: Column;
  onClose: () => void;
  onUpdate: (updatedColumn: Column) => void;
  isPrivilegedUser: boolean;
}

const ColumnDetailsModal: React.FC<ColumnDetailsModalProps> = ({ column, onClose, onUpdate, isPrivilegedUser }) => {
  const [editedColumn, setEditedColumn] = useState(column);

  const handleSave = () => {
    onUpdate(editedColumn);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-xl font-heading font-medium text-text-primary mb-4">{column.name}</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-text-primary mb-2">Description</h4>
            <EditableText
              initialValue={editedColumn.description}
              onSave={(newDescription) => setEditedColumn({ ...editedColumn, description: newDescription })}
              className="text-text-secondary"
            />
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-2">Data Type</h4>
            <p className="text-text-secondary">{editedColumn.type}</p>
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-2">PII Status</h4>
            {isPrivilegedUser ? (
              <button
                onClick={() => setEditedColumn({ ...editedColumn, isPII: !editedColumn.isPII })}
                className={`px-4 py-2 rounded-md ${
                  editedColumn.isPII ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
              >
                {editedColumn.isPII ? 'PII' : 'Non-PII'}
              </button>
            ) : (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                editedColumn.isPII ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {editedColumn.isPII ? 'PII' : 'Non-PII'}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-2">Data Quality</h4>
            {isPrivilegedUser ? (
              <input
                type="number"
                value={editedColumn.qualityScore}
                onChange={(e) => setEditedColumn({ ...editedColumn, qualityScore: Number(e.target.value) })}
                className="border border-border rounded px-2 py-1"
                min="0"
                max="100"
              />
            ) : (
              <p className="text-text-secondary">Non-null values: {editedColumn.qualityScore}%</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-bg-secondary text-text-secondary py-2 px-6 rounded-md hover:bg-bg-tertiary transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          {isPrivilegedUser && (
            <button
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover transition-colors"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


const TableView: React.FC<TableViewProps> = ({ table }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const { role } = useUser();
  const { updateAsset } = useAssets();
  const [editedTable, setEditedTable] = useState(table);
  
  const isPrivilegedUser = role === 'contributor' || role === 'productOwner';

  useEffect(() => {
    // Merge mock data with editable fields
    const mockColumns = tableData[table.name]?.columns || [];
    const mergedColumns = mockColumns.map(mockColumn => ({
      ...mockColumn,
      description: editedTable.columns?.find(c => c.name === mockColumn.name)?.description || mockColumn.description,
      isPII: editedTable.columns?.find(c => c.name === mockColumn.name)?.isPII ?? mockColumn.isPII,
      qualityScore: editedTable.columns?.find(c => c.name === mockColumn.name)?.qualityScore || mockColumn.qualityScore,
    }));
    setEditedTable({ ...editedTable, columns: mergedColumns });
  }, [table]);

  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const filteredColumns = editedTable.columns?.filter(column =>
    column.name.toLowerCase().includes(filter.toLowerCase()) ||
    column.description.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedColumns = filteredColumns?.sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn as keyof Column];
      const bValue = b[sortColumn as keyof Column];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleColumnUpdate = (updatedColumn: Column) => {
    const updatedColumns = editedTable.columns?.map(col => 
      col.name === updatedColumn.name ? updatedColumn : col
    );
    const updatedTable = { ...editedTable, columns: updatedColumns };
    setEditedTable(updatedTable);
    updateAsset(updatedTable);
  };

  const handleTableDescriptionSave = (newDescription: string) => {
    const updatedTable = { ...editedTable, description: newDescription };
    setEditedTable(updatedTable);
    updateAsset(updatedTable);
  };

  return (
    <div className="space-y-8 p-6 bg-bg-main h-full overflow-y-auto">
      <h2 className="text-2xl font-heading font-semibold text-text-primary">{editedTable.displayName || editedTable.name}</h2>
      {isPrivilegedUser ? (
        <EditableText
          initialValue={editedTable.description || ''}
          onSave={handleTableDescriptionSave}
          className="text-text-secondary"
        />
      ) : (
        <p className="text-text-secondary">{editedTable.description}</p>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter columns..."
          className="w-full p-2 border border-border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('name')}>
                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('type')}>
                Type {sortColumn === 'type' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('isPII')}>
                PII {sortColumn === 'isPII' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('qualityScore')}>
                Quality {sortColumn === 'qualityScore' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedColumns?.map((column, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-bg-main'} cursor-pointer hover:bg-bg-secondary`}
                onClick={() => setSelectedColumn(column)}
              >
                <td className="p-2 font-medium text-text-primary">{column.name}</td>
                <td className="p-2 text-text-secondary">{column.type}</td>
                <td className="p-2 text-text-secondary">{column.description}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    column.isPII ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {column.isPII ? 'PII' : 'Non-PII'}
                  </span>
                </td>
                <td className="p-2 text-text-secondary">{column.qualityScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedColumn && (
        <ColumnDetailsModal
          column={selectedColumn}
          onClose={() => setSelectedColumn(null)}
          onUpdate={handleColumnUpdate}
          isPrivilegedUser={isPrivilegedUser}
        />
      )}
    </div>
  );
};

export default TableView;