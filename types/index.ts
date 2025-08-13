export interface ProductManager {
  id: string;
  name: string;
  email: string;
}

export interface ValueStream {
  id: string;
  name: string;
  description: string;
  productManagerId: string;
  products: Product[];
  totalBenefit: number;
  totalCloudCosts: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  horizon: ProductHorizon;
  estimatedBenefit: number;
  cloudCosts: number;
  valueStreamId: string;
  milestones: Milestone[];
  risks: Risk[];
  stakeholders: Stakeholder[];
}

export type ProductHorizon = 'Idea' | 'Evaluation' | 'Emerging' | 'Investing' | 'Extracting' | 'Retiring';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'At Risk';
  owner: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  probability: 'Low' | 'Medium' | 'High';
  mitigation: string;
  owner: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  email: string;
  raciRole: 'Responsible' | 'Accountable' | 'Consulted' | 'Informed';
}