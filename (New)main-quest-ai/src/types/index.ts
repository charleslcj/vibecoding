export interface BuyerProfile {
  archetype: "The Systems Builder" | "The Driver" | "The Guardian" | "The Guide";
  archetypeScore: number;
  stats: {
    riskTolerance: number;
    capitalAvailable: number;
    passionAlignment: number;
    operationalSkills: number;
    timeline: number;
  };
  purchasingPower: {
    minCapital: number;
    maxCapital: number;
    sbaMultiplier: string;
    description: string;
  };
  businessMatches: Array<{
    rank: number;
    businessType: string;
    ebitdaRange: string;
    matchPercent: number;
    managementIntensity: "High" | "Medium" | "Low";
    explanation: string;
    whyItFits: string;
  }>;
  operatorSummary: string;
  buyerProfile: {
    geography: string;
    involvementStyle: string;
    capitalBand: string;
  };
  dealScorecardPreview: Array<{
    criterion: string;
    description: string;
    score: number;
  }>;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  type: 'daily' | 'milestone';
}

export interface QuestLevel {
  level: number;
  title: string;
  description: string;
  goal: string;
  unlocks: string;
  requiredXp: number;
}

export type PipelineStatus = 'Reviewing' | 'NDA Signed' | 'LOI Sent' | 'Under LOI';

export interface PipelineDeal {
  dealId: string;
  status: PipelineStatus;
  notes?: string;
  addedAt: string;
}

export interface DealMatch {
  id: string;
  title: string;
  location: string;
  industry: string;
  askingPrice: number;
  annualRevenue: number;
  annualEbitda: number;
  ebitdaMultiple: number;
  yearsInBusiness: number;
  matchPercent: number;
  dealHealthScore: number;
  keyStrengths: string[];
  watchOutFor: string[];
  whyMatchedToYou: string;
  sbaEligible: boolean;
  ownerInvolvement: "High" | "Medium" | "Low";
  reasonForSale: string;
}
