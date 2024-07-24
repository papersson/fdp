export interface Dependency {
  upstream: string[];
  downstream: string[];
}

export interface Column {
  name: string;
  type: string;
  description: string;
  isPII: boolean;
  qualityScore: number;
  dependencies: Dependency;
}

export interface Table {
  name: string;
  type: 'table';
  displayName?: string;
  description?: string;
  columns?: Column[];
}

export interface Operation {
  title: string;
  description: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface Flag {
  name: string;
  description: string;
}

export interface SemanticMeasure {
  measure: string;
  description: string;
}

export interface DataModeling {
  description: string;
  flags: Flag[];
  dimensions: string[];
  sourceTables: string[];
  semanticModeling: SemanticMeasure[];
}

export interface Schema {
  name: string;
  type: 'schema';
  displayName?: string;
  description?: string;
  overview?: string;
  operations?: Operation[];
  businessGlossary?: GlossaryTerm[];
  dataModeling?: DataModeling;
  tables?: Table[];
}

export interface BusinessArea {
  name: string;
  description: string;
}

export interface AnalyticsDashboard {
  name: string;
  description: string;
  url: string;
}

export interface Catalog {
  name: string;
  type: 'catalog';
  displayName?: string;
  description?: string;
  businessAreas?: BusinessArea[];
  analytics?: AnalyticsDashboard[];
  schemas?: Schema[];
}

export type Asset = Catalog | Schema | Table;