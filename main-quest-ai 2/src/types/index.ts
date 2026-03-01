export interface BuyerProfile {
  archetype: "The Operator" | "The Investor" | "The Builder" | "The Legacy Buyer";
  archetypeScore: number;
  stats: {
    riskTolerance: number;
    capitalAvailable: number;
    industryPreference: number;
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
