export type QuestionType = 'single' | 'multi';

export interface Option {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

export interface Question {
  id: string;
  section: string;
  title: string;
  type: QuestionType;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    section: 'Section 1 of 5 — Operational Skills',
    title: 'Which of these best describes your professional "Superpower"?',
    type: 'single',
    options: [
      { id: 'q1_1', label: 'Sales & Revenue Growth', icon: '📈' },
      { id: 'q1_2', label: 'Operations & Process Optimization', icon: '⚙️' },
      { id: 'q1_3', label: 'Financial Analysis & Deal Structuring', icon: '📊' },
      { id: 'q1_4', label: 'Team Leadership & People Management', icon: '👥' },
      { id: 'q1_5', label: 'Product Development & Innovation', icon: '💡' }
    ]
  },
  {
    id: 'q2',
    section: 'Section 1 of 5 — Operational Skills',
    title: 'How do you prefer to spend your first 90 days in a new business?',
    type: 'single',
    options: [
      { id: 'q2_1', label: 'In the trenches, learning every role' },
      { id: 'q2_2', label: 'Analyzing data to find efficiency gains' },
      { id: 'q2_3', label: 'Meeting customers and driving new sales' },
      { id: 'q2_4', label: 'Building a management layer to delegate' }
    ]
  },
  {
    id: 'q3',
    section: 'Section 2 of 5 — Risk Tolerance',
    title: 'How do you feel about acquiring a business with "Red Flags" (e.g., customer concentration)?',
    type: 'single',
    options: [
      { id: 'q3_1', label: 'Avoid at all costs — I want a clean, stable asset', icon: '🛡️' },
      { id: 'q3_2', label: 'Open to it if the price reflects the risk', icon: '⚖️' },
      { id: 'q3_3', label: 'I seek them out — that is where the value is created', icon: '🛠️' }
    ]
  },
  {
    id: 'q4',
    section: 'Section 2 of 5 — Risk Tolerance',
    title: 'What is your comfort level with debt (leverage)?',
    type: 'single',
    options: [
      { id: 'q4_1', label: 'Low — I want to pay down debt as fast as possible' },
      { id: 'q4_2', label: 'Moderate — Comfortable with standard SBA 7(a) leverage' },
      { id: 'q4_3', label: 'High — I want to maximize leverage to increase IRR' }
    ]
  },
  {
    id: 'q5',
    section: 'Section 3 of 5 — Capital Available',
    title: 'What is your total liquid capital available for a down payment?',
    type: 'single',
    options: [
      { id: 'q10_1', label: 'Under $100K', color: 'Purchasing power up to $500K' },
      { id: 'q10_2', label: '$100K – $250K', color: 'Purchasing power up to $1.25M' },
      { id: 'q10_3', label: '$250K – $500K', color: 'Purchasing power up to $2.5M' },
      { id: 'q10_4', label: '$500K – $1M', color: 'Purchasing power up to $5M' },
      { id: 'q10_5', label: '$1M+', color: 'Institutional-scale deals' }
    ]
  },
  {
    id: 'q6',
    section: 'Section 4 of 5 — Industry Preference',
    title: 'Which industries are you most interested in? (Select up to 3)',
    type: 'multi',
    options: [
      { id: 'q6_1', label: 'Home Services (HVAC, Plumbing)', icon: '🏠' },
      { id: 'q6_2', label: 'B2B SaaS / Tech Services', icon: '💻' },
      { id: 'q6_3', label: 'Manufacturing & Industrial', icon: '🏭' },
      { id: 'q6_4', label: 'Healthcare & Medical Practices', icon: '🏥' },
      { id: 'q6_5', label: 'E-commerce & Digital Brands', icon: '🛒' },
      { id: 'q6_6', label: 'Professional Services (Accounting, Legal)', icon: '💼' }
    ]
  },
  {
    id: 'q7',
    section: 'Section 4 of 5 — Industry Preference',
    title: 'What is your preferred business model?',
    type: 'single',
    options: [
      { id: 'q7_1', label: 'High Recurring Revenue (Subscriptions/Contracts)' },
      { id: 'q7_2', label: 'High Margin / Low Volume (Specialized Services)' },
      { id: 'q7_3', label: 'Asset Heavy / High Barrier to Entry (Manufacturing)' },
      { id: 'q7_4', label: 'High Volume / Low Margin (Retail/Distribution)' }
    ]
  },
  {
    id: 'q8',
    section: 'Section 5 of 5 — Timeline',
    title: 'How soon do you want to close on a business?',
    type: 'single',
    options: [
      { id: 'q8_1', label: 'Immediately (within 3-6 months)', icon: '🚀' },
      { id: 'q8_2', label: 'Planning ahead (6-12 months)', icon: '📅' },
      { id: 'q8_3', label: 'Just exploring (12+ months)', icon: '🔍' }
    ]
  },
  {
    id: 'q9',
    section: 'Section 5 of 5 — Timeline',
    title: 'How much time can you commit to the search process weekly?',
    type: 'single',
    options: [
      { id: 'q9_1', label: 'Full-time (40+ hours/week)' },
      { id: 'q9_2', label: 'Part-time (10-20 hours/week)' },
      { id: 'q9_3', label: 'Passive (under 10 hours/week)' }
    ]
  },
  {
    id: 'q10',
    section: 'Section 1 of 5 — Operational Skills',
    title: 'How do you handle conflict or difficult employee conversations?',
    type: 'single',
    options: [
      { id: 'q10_1', label: 'Direct and decisive' },
      { id: 'q10_2', label: 'Empathetic and collaborative' },
      { id: 'q10_3', label: 'Process-driven and formal' }
    ]
  },
  {
    id: 'q11',
    section: 'Section 2 of 5 — Risk Tolerance',
    title: 'What would you do if a key customer left in the first month?',
    type: 'single',
    options: [
      { id: 'q11_1', label: 'Panic and look for a way out' },
      { id: 'q11_2', label: 'Immediately pivot to aggressive sales' },
      { id: 'q11_3', label: 'Analyze why they left and fix the core issue' }
    ]
  },
  {
    id: 'q12',
    section: 'Section 4 of 5 — Industry Preference',
    title: 'Do you prefer a business that is...',
    type: 'single',
    options: [
      { id: 'q12_1', label: 'B2B (Business to Business)' },
      { id: 'q12_2', label: 'B2C (Business to Consumer)' },
      { id: 'q12_3', label: 'No preference' }
    ]
  }
];
