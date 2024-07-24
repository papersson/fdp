import React, { useState } from 'react';
import { Schema } from '@/lib/types';

interface SchemaViewProps {
  schema: Schema;
}

const SchemaView: React.FC<SchemaViewProps> = ({ schema }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'operations', title: 'Operations' },
    { id: 'businessGlossary', title: 'Business Glossary' },
    { id: 'dataModeling', title: 'Data Modeling' },
    { id: 'semanticModeling', title: 'Semantic Modeling' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <p className="text-text-secondary">{schema.overview}</p>;
      case 'operations':
        return (
          <ul className="list-disc list-inside space-y-2">
            {schema.operations?.map((operation, index) => (
              <li key={index} className="text-text-secondary">
                <span className="font-medium text-text-primary">{operation.title}:</span> {operation.description}
              </li>
            ))}
          </ul>
        );
      case 'businessGlossary':
        return (
          <dl className="space-y-2">
            {schema.businessGlossary?.map((term, index) => (
              <div key={index}>
                <dt className="font-medium text-text-primary">{term.term}</dt>
                <dd className="text-text-secondary ml-4">{term.definition}</dd>
              </div>
            ))}
          </dl>
        );
      case 'dataModeling':
        return (
          <div className="space-y-4">
            <p className="text-text-secondary">{schema.dataModeling?.description}</p>
            <h4 className="text-lg font-medium text-text-primary">Flags</h4>
            <ul className="list-disc list-inside space-y-2">
              {schema.dataModeling?.flags.map((flag, index) => (
                <li key={index} className="text-text-secondary">
                  <span className="font-medium text-text-primary">{flag.name}:</span> {flag.description}
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-medium text-text-primary">Dimensions</h4>
            <ul className="list-disc list-inside">
              {schema.dataModeling?.dimensions.map((dimension, index) => (
                <li key={index} className="text-text-secondary">{dimension}</li>
              ))}
            </ul>
            <h4 className="text-lg font-medium text-text-primary">Source Tables</h4>
            <ul className="list-disc list-inside">
              {schema.dataModeling?.sourceTables.map((table, index) => (
                <li key={index} className="text-text-secondary">{table}</li>
              ))}
            </ul>
          </div>
        );
      case 'semanticModeling':
        return (
          <ul className="list-disc list-inside space-y-2">
            {schema.dataModeling?.semanticModeling.map((measure, index) => (
              <li key={index} className="text-text-secondary">
                <span className="font-medium text-text-primary">{measure.measure}:</span> {measure.description}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-bg-main h-full overflow-y-auto">
      <h2 className="text-2xl font-heading font-semibold text-text-primary mb-6">
        {schema.displayName || schema.name}
      </h2>
      
      <div className="mb-6 border-b border-border">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`mr-4 py-2 px-4 font-medium ${
              activeSection === section.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary hover:text-primary'
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default SchemaView;