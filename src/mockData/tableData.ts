export const tableData = {
    Appropriations: {
      name: 'Appropriations',
      displayName: 'Appropriations Table',
      type: 'table',
      description: 'Contains detailed information about appropriations and their usage',
      columns: [
        {
          name: 'AppropriationID',
          type: 'int',
          description: 'Unique identifier for each appropriation',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: ['Customer.AppropriationID', 'Consumer.AppropriationID']
          }
        },
        {
          name: 'CustomerID',
          type: 'int',
          description: 'Foreign key to Customer dimension',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: ['Customer.CustomerID'],
            downstream: []
          }
        },
        {
          name: 'ConsumerID',
          type: 'int',
          description: 'Identifier for the consumer receiving the appropriation',
          isPII: true,
          qualityScore: 99.8,
          dependencies: {
            upstream: ['Consumer.ConsumerID'],
            downstream: []
          }
        },
        {
          name: 'ServiceID',
          type: 'int',
          description: 'Foreign key to Service dimension',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: ['Service.ServiceID'],
            downstream: []
          }
        },
        {
          name: 'ClinicID',
          type: 'int',
          description: 'Foreign key to Clinic dimension',
          isPII: false,
          qualityScore: 99.9,
          dependencies: {
            upstream: ['Clinic.ClinicID'],
            downstream: []
          }
        },
        {
          name: 'CreationDate',
          type: 'date',
          description: 'Date when the appropriation was created',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'ExpiryDate',
          type: 'date',
          description: 'Date when the appropriation expires',
          isPII: false,
          qualityScore: 99.7,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'TreatmentDate',
          type: 'date',
          description: 'Date of the treatment',
          isPII: false,
          qualityScore: 98.5,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'IsUsedTreatment',
          type: 'boolean',
          description: 'Indicates if the appropriation was used',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'InvoiceAmount',
          type: 'decimal',
          description: 'Amount invoiced for the treatment',
          isPII: false,
          qualityScore: 99.9,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'PaidDate',
          type: 'date',
          description: 'Date the invoice was paid',
          isPII: false,
          qualityScore: 97.8,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'IsGenericAppropriation',
          type: 'boolean',
          description: 'Indicates if it\'s a generic appropriation',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'IsFirstTreatment',
          type: 'boolean',
          description: 'Indicates if it\'s the first treatment in the appropriation',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'ExternalVendorID',
          type: 'int',
          description: 'Identifier for external vendors, null for internal clinics',
          isPII: false,
          qualityScore: 99.5,
          dependencies: {
            upstream: [],
            downstream: []
          }
        }
      ]
    },
    Customer: {
      name: 'Customer',
      displayName: 'Customer Dimension',
      type: 'table',
      description: 'Contains customer information for appropriations',
      columns: [
        {
          name: 'CustomerID',
          type: 'int',
          description: 'Unique identifier for each customer',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: ['Appropriations.CustomerID']
          }
        },
        {
          name: 'CustomerName',
          type: 'varchar',
          description: 'Name of the customer',
          isPII: true,
          qualityScore: 99.9,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'CustomerType',
          type: 'varchar',
          description: 'Type of customer (e.g., Individual, Corporate)',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: []
          }
        }
      ]
    },
    Consumer: {
      name: 'Consumer',
      displayName: 'Consumer Dimension',
      type: 'table',
      description: 'Contains consumer information for appropriations',
      columns: [
        {
          name: 'ConsumerID',
          type: 'int',
          description: 'Unique identifier for each consumer',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: ['Appropriations.ConsumerID']
          }
        },
        {
          name: 'ConsumerName',
          type: 'varchar',
          description: 'Name of the consumer',
          isPII: true,
          qualityScore: 99.8,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'DateOfBirth',
          type: 'date',
          description: 'Date of birth of the consumer',
          isPII: true,
          qualityScore: 98.5,
          dependencies: {
            upstream: [],
            downstream: []
          }
        }
      ]
    },
    Service: {
      name: 'Service',
      displayName: 'Service Dimension',
      type: 'table',
      description: 'Contains service information for appropriations',
      columns: [
        {
          name: 'ServiceID',
          type: 'int',
          description: 'Unique identifier for each service',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: ['Appropriations.ServiceID']
          }
        },
        {
          name: 'ServiceName',
          type: 'varchar',
          description: 'Name of the service',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'ServiceCategory',
          type: 'varchar',
          description: 'Category of the service',
          isPII: false,
          qualityScore: 99.9,
          dependencies: {
            upstream: [],
            downstream: []
          }
        }
      ]
    },
    Clinic: {
      name: 'Clinic',
      displayName: 'Clinic Dimension',
      type: 'table',
      description: 'Contains clinic information for appropriations',
      columns: [
        {
          name: 'ClinicID',
          type: 'int',
          description: 'Unique identifier for each clinic',
          isPII: false,
          qualityScore: 100,
          dependencies: {
            upstream: [],
            downstream: ['Appropriations.ClinicID']
          }
        },
        {
          name: 'ClinicName',
          type: 'varchar',
          description: 'Name of the clinic',
          isPII: false,
          qualityScore: 99.9,
          dependencies: {
            upstream: [],
            downstream: []
          }
        },
        {
          name: 'ClinicLocation',
          type: 'varchar',
          description: 'Location of the clinic',
          isPII: false,
          qualityScore: 99.5,
          dependencies: {
            upstream: [],
            downstream: []
          }
        }
      ]
    }
  };