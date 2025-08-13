import { ProductManager, ValueStream, Product, ProductHorizon, Milestone, Risk, Stakeholder } from '../types';

export const mockProductManagers: ProductManager[] = [
  { id: 'pm1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
  { id: 'pm2', name: 'Mike Chen', email: 'mike.chen@company.com' },
  { id: 'pm3', name: 'Emma Davis', email: 'emma.davis@company.com' },
  { id: 'pm4', name: 'James Wilson', email: 'james.wilson@company.com' },
];

export const mockValueStreams: ValueStream[] = [
  {
    id: 'vs1',
    name: 'Efficiency Value Stream',
    description: 'Products that boost efficiency of CAPEX and OPEX spending',
    productManagerId: 'pm1',
    totalBenefit: 2800000,
    totalCloudCosts: 45000,
    products: [
      {
        id: 'p1',
        name: 'Cost Optimization Platform',
        description: 'AI-powered cost optimization for cloud infrastructure',
        horizon: 'Investing',
        estimatedBenefit: 1500000,
        cloudCosts: 25000,
        valueStreamId: 'vs1',
        milestones: [
          {
            id: 'm1',
            title: 'MVP Launch',
            description: 'Launch minimum viable product with core features',
            dueDate: '2024-03-15',
            status: 'Completed',
            owner: 'Sarah Johnson'
          },
          {
            id: 'm2',
            title: 'AI Integration',
            description: 'Integrate machine learning algorithms for cost prediction',
            dueDate: '2024-06-30',
            status: 'In Progress',
            owner: 'Tech Lead'
          }
        ],
        risks: [
          {
            id: 'r1',
            title: 'Data Quality Issues',
            description: 'Poor data quality may affect AI model accuracy',
            severity: 'High',
            probability: 'Medium',
            mitigation: 'Implement data validation and cleaning processes',
            owner: 'Data Engineer'
          }
        ],
        stakeholders: [
          {
            id: 's1',
            name: 'Sarah Johnson',
            role: 'Product Manager',
            email: 'sarah.johnson@company.com',
            raciRole: 'Accountable'
          },
          {
            id: 's2',
            name: 'John Tech',
            role: 'Tech Lead',
            email: 'john.tech@company.com',
            raciRole: 'Responsible'
          }
        ]
      },
      {
        id: 'p2',
        name: 'Automated Procurement System',
        description: 'Streamline procurement processes and reduce manual work',
        horizon: 'Extracting',
        estimatedBenefit: 800000,
        cloudCosts: 12000,
        valueStreamId: 'vs1',
        milestones: [
          {
            id: 'm3',
            title: 'System Integration',
            description: 'Integrate with existing ERP systems',
            dueDate: '2024-04-20',
            status: 'Completed',
            owner: 'Integration Team'
          }
        ],
        risks: [
          {
            id: 'r2',
            title: 'Legacy System Compatibility',
            description: 'Challenges with legacy system integration',
            severity: 'Medium',
            probability: 'Low',
            mitigation: 'Develop adapter layers for legacy systems',
            owner: 'System Architect'
          }
        ],
        stakeholders: [
          {
            id: 's3',
            name: 'Sarah Johnson',
            role: 'Product Manager',
            email: 'sarah.johnson@company.com',
            raciRole: 'Accountable'
          }
        ]
      },
      {
        id: 'p3',
        name: 'Resource Planning Tool',
        description: 'Advanced resource planning and allocation system',
        horizon: 'Emerging',
        estimatedBenefit: 500000,
        cloudCosts: 8000,
        valueStreamId: 'vs1',
        milestones: [
          {
            id: 'm4',
            title: 'Requirements Gathering',
            description: 'Complete requirements analysis with stakeholders',
            dueDate: '2024-02-28',
            status: 'Completed',
            owner: 'Business Analyst'
          }
        ],
        risks: [],
        stakeholders: []
      }
    ]
  },
  {
    id: 'vs2',
    name: 'Customer Experience',
    description: 'Products focused on improving customer satisfaction and engagement',
    productManagerId: 'pm2',
    totalBenefit: 1900000,
    totalCloudCosts: 32000,
    products: [
      {
        id: 'p4',
        name: 'Customer Journey Analytics',
        description: 'Real-time customer journey tracking and optimization',
        horizon: 'Investing',
        estimatedBenefit: 1200000,
        cloudCosts: 20000,
        valueStreamId: 'vs2',
        milestones: [
          {
            id: 'm5',
            title: 'Analytics Dashboard',
            description: 'Launch customer analytics dashboard',
            dueDate: '2024-05-15',
            status: 'In Progress',
            owner: 'Mike Chen'
          }
        ],
        risks: [
          {
            id: 'r3',
            title: 'Privacy Compliance',
            description: 'Ensuring GDPR and privacy regulation compliance',
            severity: 'High',
            probability: 'Medium',
            mitigation: 'Work with legal team for compliance review',
            owner: 'Compliance Officer'
          }
        ],
        stakeholders: [
          {
            id: 's4',
            name: 'Mike Chen',
            role: 'Product Manager',
            email: 'mike.chen@company.com',
            raciRole: 'Accountable'
          }
        ]
      },
      {
        id: 'p5',
        name: 'Personalization Engine',
        description: 'AI-powered content and experience personalization',
        horizon: 'Evaluation',
        estimatedBenefit: 700000,
        cloudCosts: 12000,
        valueStreamId: 'vs2',
        milestones: [],
        risks: [],
        stakeholders: []
      }
    ]
  },
  {
    id: 'vs3',
    name: 'Innovation Pipeline',
    description: 'Experimental products and emerging technologies',
    productManagerId: 'pm3',
    totalBenefit: 1200000,
    totalCloudCosts: 28000,
    products: [
      {
        id: 'p6',
        name: 'AI Assistant Platform',
        description: 'Intelligent assistant for business operations',
        horizon: 'Idea',
        estimatedBenefit: 800000,
        cloudCosts: 18000,
        valueStreamId: 'vs3',
        milestones: [],
        risks: [],
        stakeholders: []
      },
      {
        id: 'p7',
        name: 'Blockchain Integration',
        description: 'Blockchain-based verification system',
        horizon: 'Evaluation',
        estimatedBenefit: 400000,
        cloudCosts: 10000,
        valueStreamId: 'vs3',
        milestones: [],
        risks: [],
        stakeholders: []
      }
    ]
  }
];