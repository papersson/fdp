export const catalogData = {
    name: 'ELM',
    displayName: 'Employee & Labor Market',
    type: 'catalog',
    description: 'Contains data related to employee management and labor market analytics.',
    businessAreas: [
      {
        name: 'Human Resources',
        description: 'Manages employee data, recruitment, and performance evaluations.'
      },
      {
        name: 'Payroll',
        description: 'Handles salary calculations, tax deductions, and benefit management.'
      },
      {
        name: 'Labor Analytics',
        description: 'Provides insights into labor market trends and workforce planning.'
      }
    ],
    terminology: [
      {
        term: 'FTE',
        definition: 'Full-Time Equivalent, a unit that indicates the workload of an employed person.'
      },
      {
        term: 'Turnover Rate',
        definition: 'The percentage of employees who leave an organization during a certain period of time.'
      },
      {
        term: 'Compensation Ratio',
        definition: 'The ratio of an employee\'s salary to the median salary for similar positions in the market.'
      }
    ],
    analytics: [
      {
        name: 'Employee Retention Dashboard',
        description: 'Visualizes employee turnover rates and factors affecting retention.',
        url: '/mock-dashboard/employee-retention'
      },
      {
        name: 'Recruitment Funnel Analysis',
        description: 'Analyzes the efficiency of the recruitment process from application to hire.',
        url: '/mock-dashboard/recruitment-funnel'
      },
      {
        name: 'Workforce Diversity Report',
        description: 'Provides insights into the diversity and inclusion metrics of the organization.',
        url: '/mock-dashboard/workforce-diversity'
      }
    ]
  };