import React, { useState } from 'react';
import { Table, Column } from '@/lib/types';

interface TableViewProps {
  table: Table;
}

interface ColumnDetailsModalProps {
  column: Column;
  onClose: () => void;
}

const ColumnDetailsModal: React.FC<ColumnDetailsModalProps> = ({ column, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-xl font-heading font-medium text-text-primary mb-4">{column.name}</h3>
        <p className="text-text-secondary mb-4">{column.description}</p>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-text-primary">Data Quality</h4>
            <p className="text-text-secondary">Non-null values: {column.qualityScore}%</p>
          </div>
          <div>
            <h4 className="font-medium text-text-primary">Dependencies</h4>
            <div className="mt-2">
              <h5 className="font-medium text-text-secondary">Upstream:</h5>
              <ul className="list-disc list-inside">
                {column.dependencies.upstream.map((dep, index) => (
                  <li key={index} className="text-text-secondary">{dep}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <h5 className="font-medium text-text-secondary">Downstream:</h5>
              <ul className="list-disc list-inside">
                {column.dependencies.downstream.map((dep, index) => (
                  <li key={index} className="text-text-secondary">{dep}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button
          className="mt-6 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const TableView: React.FC<TableViewProps> = ({ table }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const filteredColumns = table.columns?.filter(column =>
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

  return (
    <div className="space-y-8 p-6 bg-bg-main h-full overflow-y-auto">
      <h2 className="text-2xl font-heading font-semibold text-text-primary">{table.displayName || table.name}</h2>
      <p className="text-text-secondary">{table.description}</p>

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
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${column.isPII ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {column.isPII ? 'PII' : 'Non-PII'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedColumn && (
        <ColumnDetailsModal
          column={selectedColumn}
          onClose={() => setSelectedColumn(null)}
        />
      )}
    </div>
  );
};

export default TableView;