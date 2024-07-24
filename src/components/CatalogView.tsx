import React, { useState } from 'react';
import { Catalog, AnalyticsDashboard } from '@/lib/types';
import RequestAccessModal from './RequestAccessModal';

interface CatalogViewProps {
  catalog: Catalog;
}

const CatalogView: React.FC<CatalogViewProps> = ({ catalog }) => {
  const [activeTab, setActiveTab] = useState<'data' | 'analytics'>('data');
  const [selectedDashboard, setSelectedDashboard] = useState<AnalyticsDashboard | null>(null);
  const [filter, setFilter] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const filteredBusinessAreas = catalog.businessAreas?.filter(area =>
    area.name.toLowerCase().includes(filter.toLowerCase()) ||
    area.description.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredDashboards = catalog.analytics?.filter(dashboard =>
    dashboard.name.toLowerCase().includes(filter.toLowerCase()) ||
    dashboard.description.toLowerCase().includes(filter.toLowerCase())
  );

  const handleTabChange = (tab: 'data' | 'analytics') => {
    setActiveTab(tab);
    setSelectedDashboard(null);  // Reset selected dashboard when changing tabs
  };

  const renderDataTab = () => (
    <div className="space-y-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter business areas..."
          className="w-full p-2 border border-border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {filteredBusinessAreas?.map((area, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-medium text-text-primary mb-2">{area.name}</h3>
          <p className="text-text-secondary mb-2">{area.description}</p>
          <h4 className="text-md font-medium text-text-primary mb-1">Related Schemas:</h4>
          <ul className="list-disc list-inside">
            {catalog.schemas?.filter(schema => schema.name.includes(area.name)).map((schema, schemaIndex) => (
              <li key={schemaIndex} className="text-text-secondary">{schema.name}</li>
            ))}
          </ul>
        </div>
      ))}
      <button 
        className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover transition-colors"
        onClick={() => setShowRequestModal(true)}
      >
        Request Access
      </button>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter dashboards..."
          className="w-full p-2 border border-border rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        {filteredDashboards?.map((dashboard, index) => (
          <div
            key={index}
            className="cursor-pointer hover:bg-bg-secondary p-2 rounded transition-colors"
            onClick={() => setSelectedDashboard(dashboard)}
          >
            <h4 className="font-medium text-text-primary mb-1">{dashboard.name}</h4>
            <p className="text-text-secondary">{dashboard.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6 bg-bg-main h-full overflow-y-auto">
      <h2 className="text-2xl font-heading font-semibold text-text-primary">{catalog.displayName || catalog.name}</h2>
      <p className="text-text-secondary">{catalog.description}</p>

      <div className="flex space-x-4 border-b border-border">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'data' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}
          onClick={() => handleTabChange('data')}
        >
          Data
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'analytics' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}
          onClick={() => handleTabChange('analytics')}
        >
          Analytics
        </button>
      </div>

      {activeTab === 'data' ? renderDataTab() : renderAnalyticsTab()}

      {selectedDashboard && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-subtle">
          <h3 className="text-xl font-heading font-medium text-text-primary mb-4">{selectedDashboard.name}</h3>
          <p className="text-text-secondary mb-4">{selectedDashboard.description}</p>
          <div className="bg-gray-200 h-96 flex items-center justify-center text-text-secondary">
            Mock Dashboard Content for {selectedDashboard.name}
          </div>
          <button
            className="mt-4 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover transition-colors"
            onClick={() => setSelectedDashboard(null)}
          >
            Close Dashboard
          </button>
        </div>
      )}

      {showRequestModal && (
        <RequestAccessModal onClose={() => setShowRequestModal(false)} catalog={catalog} />
      )}
    </div>
  );
};

export default CatalogView;