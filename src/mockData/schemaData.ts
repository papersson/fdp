export const schemaData = {
    name: 'Appropriations',
    displayName: 'Appropriations Schema',
    type: 'schema',
    description: 'Contains all appropriation-related data assets',
    overview: `
      Appropriations grant consumers access to seek a number of treatments at Falck clinics or external integration clinics. 
      This schema models the process from appropriation creation to treatment and invoicing.
    `,
    operations: [
      {
        title: 'Admin Registration',
        description: 'An admin or employee in a health advisory center registers an appropriation on a client.'
      },
      {
        title: 'Self-Service Registration',
        description: 'An employee logs into the self-service portal to register an appropriation.'
      },
      {
        title: 'External Clinic Booking',
        description: 'Creation of a booking at an external clinic, generating an appropriation for invoices.'
      }
    ],
    businessGlossary: [
      {
        term: 'Treatment Appropriation',
        definition: 'An authorization for a client to access a number of treatments.'
      },
      {
        term: 'Treatment Appropriation Line',
        definition: 'One booking within an appropriation. Not all lines are necessarily used.'
      },
      {
        term: 'Generic Appropriation',
        definition: 'An appropriation for treatments at internal Falck clinics.'
      },
      {
        term: 'External Vendor Appropriation',
        definition: 'An appropriation for treatments at external clinics.'
      }
    ],
    dataModeling: {
      description: 'Appropriations are modeled as a single table named "Appropriations" with line-level granularity.',
      flags: [
        {
          name: 'IsUsedTreatment',
          description: 'Indicates if an appropriation line turned into an actual treatment.'
        },
        {
          name: 'IsGenericAppropriation',
          description: 'Indicates if the appropriation was carried out at internal clinics.'
        },
        {
          name: 'IsFirstTreatment',
          description: 'Marks the first treatment in an appropriation, which might incur higher costs.'
        }
      ],
      dimensions: ['Customer', 'CustomerDepartment', 'Consumer', 'Service', 'Network'],
      sourceTables: ['TreatmentAppropriation', 'TreatmentAppropriationLine', 'TreatmentAppropriationLineProduct', 'User', 'UserClientInfo', 'Customer'],
      semanticModeling: [
        {
          measure: 'Number of Appropriations',
          description: 'Uniquely counts appropriations aggregated over the appropriation creation date.'
        },
        {
          measure: 'Number of Appropriation Lines',
          description: 'Uniquely counts appropriation lines aggregated over the appropriation creation date.'
        },
        {
          measure: 'Number of Appropriation Treatments',
          description: 'Uniquely counts used appropriation lines aggregated over the treatment date.'
        }
      ]
    },
    tables: [
      {
        name: 'Appropriations',
        displayName: 'Appropriations Table',
        type: 'table',
        description: 'Contains detailed information about appropriations and their usage'
      },
      {
        name: 'Customer',
        displayName: 'Customer Dimension',
        type: 'table',
        description: 'Contains customer information for appropriations'
      },
      {
        name: 'Consumer',
        displayName: 'Consumer Dimension',
        type: 'table',
        description: 'Contains consumer information for appropriations'
      },
      {
        name: 'Service',
        displayName: 'Service Dimension',
        type: 'table',
        description: 'Contains service information for appropriations'
      },
      {
        name: 'Clinic',
        displayName: 'Clinic Dimension',
        type: 'table',
        description: 'Contains clinic information for appropriations'
      }
    ]
  };