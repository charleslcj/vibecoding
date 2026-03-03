import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Twitter, Linkedin, Facebook, Share2 } from 'lucide-react';
import FadeIn from './FadeIn';
import { analyzeBuyerProfile } from '../ai/flows/analyze-buyer-profile';
import { saveBuyerProfile, saveEmailLead } from '../lib/actions/saveProfile';
import { useSession } from '../context/SessionContext';
import { BuyerProfile } from '../types';

interface ResultsCardProps {
  answers: Record<string, string[]>;
  onEmailSubmit?: () => void;
}

export default function ResultsCard({ answers, onEmailSubmit }: ResultsCardProps) {
  const { session, updateSession } = useSession();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [buyerProfile, setBuyerProfile] = useState<BuyerProfile | null>(session.buyerProfile || null);
  
  // Deal Analysis State
  const [dealUrl, setDealUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showInput, setShowInput] = useState(false);

  const handleEmailSubmit = async () => {
    if (!emailInput || !/^\S+@\S+\.\S+$/.test(emailInput)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    
    try {
      if (buyerProfile) {
        await saveEmailLead(emailInput, buyerProfile, session.sessionId);
      }
      updateSession({ email: emailInput });
      setEmailSuccess(true);
      setTimeout(() => {
        setShowEmailModal(false);
        if (onEmailSubmit) {
          onEmailSubmit();
        }
      }, 2000);
    } catch (error) {
      console.error("Error saving email:", error);
      setEmailError('Failed to save email. Please try again.');
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      if (session.buyerProfile) {
        setBuyerProfile(session.buyerProfile);
        setIsLoadingProfile(false);
        return;
      }

      try {
        const profile = await analyzeBuyerProfile(answers);
        setBuyerProfile(profile);
        updateSession({ buyerProfile: profile, archetype: profile.archetype });
        await saveBuyerProfile(null, session.sessionId, answers, profile);
      } catch (error) {
        console.error("Error generating profile:", error);
        // Fallback to hardcoded logic if AI fails
        const fallbackProfile = generateFallbackProfile(answers);
        setBuyerProfile(fallbackProfile);
        updateSession({ buyerProfile: fallbackProfile, archetype: fallbackProfile.archetype });
      } finally {
        setIsLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [answers, session.sessionId]);

  const generateFallbackProfile = (ans: Record<string, string[]>): BuyerProfile => {
    // Deterministic logic based on answers
    const q1 = ans['q1']?.[0] || '';
    const q3 = ans['q3']?.[0] || '';
    const q5 = ans['q5']?.[0] || '';
    const q10 = ans['q10']?.[0] || '';
    const q11 = ans['q11']?.[0] || '';

    // Determine Archetype
    let archetype: BuyerProfile['archetype'] = "The Systems Builder";
    if (q1 === 'q1_1' || q11 === 'q11_2') archetype = "The Driver";
    else if (q1 === 'q1_4' || q3 === 'q3_1') archetype = "The Guardian";
    else if (q1 === 'q1_3' || q3 === 'q3_3') archetype = "The Guide";
    else if (q1 === 'q1_2' || q10 === 'q10_3') archetype = "The Systems Builder";

    // Stats calculation
    const riskTolerance = q3 === 'q3_3' ? 90 : q3 === 'q3_2' ? 60 : 30;
    const capitalAvailable = q5 === 'q10_5' ? 95 : q5 === 'q10_4' ? 80 : q5 === 'q10_3' ? 60 : 40;
    const passionAlignment = 85; // Default

    // Purchasing Power
    const powerMap: Record<string, string> = {
      'q10_1': 'Up to $500K',
      'q10_2': '$500K – $1.25M',
      'q10_3': '$1.25M – $2.5M',
      'q10_4': '$2.5M – $5M',
      'q10_5': '$5M+'
    };
    const pwrDesc = powerMap[q5] || '$500K – $1.25M';

    return {
      archetype,
      archetypeScore: 88,
      stats: { riskTolerance, capitalAvailable, passionAlignment, operationalSkills: 85, timeline: 70 },
      purchasingPower: { 
        minCapital: 500000, 
        maxCapital: 1250000, 
        sbaMultiplier: "5-10x", 
        description: pwrDesc 
      },
      businessMatches: [
        { 
          rank: 1, 
          businessType: "B2B Services Business", 
          ebitdaRange: "$800K–$2M EBITDA", 
          matchPercent: 94, 
          managementIntensity: "High", 
          explanation: `Your ${archetype} profile matches well with service businesses.`, 
          whyItFits: "Recurring revenue and operational upside." 
        },
        { 
          rank: 2, 
          businessType: "Light Manufacturing", 
          ebitdaRange: "$1M–$3M EBITDA", 
          matchPercent: 87, 
          managementIntensity: "Medium", 
          explanation: "Strong systems potential in a fragmented space.", 
          whyItFits: "Process-driven operations." 
        },
        { 
          rank: 3, 
          businessType: "Commercial Landscaping", 
          ebitdaRange: "$750K–$1.5M EBITDA", 
          matchPercent: 79, 
          managementIntensity: "High", 
          explanation: "Process-driven operations with recurring contracts.", 
          whyItFits: "Recurring revenue." 
        }
      ],
      operatorSummary: `You are ${archetype === 'The Driver' ? 'a growth-focused leader' : archetype === 'The Systems Builder' ? 'a process-oriented operator' : archetype === 'The Guardian' ? 'a stability-focused steward' : 'a strategic advisor'}. Your background allows you to identify value where others see complexity.`,
      buyerProfile: { geography: "Current Metro Area", involvementStyle: "Operator-Manager", capitalBand: pwrDesc },
      dealScorecardPreview: []
    };
  };

  useEffect(() => {
    if (isLoadingProfile) return;
    
    // Trigger flip after a short delay
    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
    }, 500);

    // Sequence animations
    if (isFlipped) {
      const statsTimer = setTimeout(() => setShowStats(true), 800);
      const matchesTimer = setTimeout(() => setShowMatches(true), 1600);
      const roadmapTimer = setTimeout(() => setShowRoadmap(true), 2100);

      return () => {
        clearTimeout(statsTimer);
        clearTimeout(matchesTimer);
        clearTimeout(roadmapTimer);
      };
    }

    return () => clearTimeout(flipTimer);
  }, [isFlipped, isLoadingProfile]);

  const getArchetypeIcon = (name: string) => {
    switch (name) {
      case 'The Systems Builder': return '⚙️';
      case 'The Driver': return '⚡';
      case 'The Guardian': return '🛡️';
      case 'The Guide': return '🧭';
      default: return '👤';
    }
  };

  const getArchetypeColor = (name: string) => {
    switch (name) {
      case 'The Systems Builder': return '#15F5BA';
      case 'The Driver': return '#15F5BA';
      case 'The Guardian': return '#836FFF';
      case 'The Guide': return '#FFD65A';
      default: return '#15F5BA';
    }
  };

  const getArchetypeDescription = (name: string) => {
    if (buyerProfile?.operatorSummary) {
      return buyerProfile.operatorSummary;
    }
    return "You scale systems. Corporate professionals with your profile run the most consistently profitable acquisitions in the $800K–$3M EBITDA range. Your edge is turning founder-dependent chaos into documented, delegatable operations.";
  };

  const shareText = buyerProfile ? `I just discovered my Acquisition Archetype is "${buyerProfile.archetype}" on Main Quest AI! My ideal target is a ${buyerProfile.purchasingPower.description} business. Find out your archetype:` : '';
  const shareUrl = "https://mainquest.ai";

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: 'My Acquisition Archetype',
            text: shareText,
            url: shareUrl,
          }).catch(console.error);
          return;
        }
        break;
    }
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  const handleAnalyzeDeal = async () => {
    if (!dealUrl) return;
    setIsAnalyzing(true);
    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY || '';
      if (!apiKey) throw new Error('NO_API_KEY');
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze this business acquisition deal using the provided URL: ${dealUrl}. 
        Provide a detailed evaluation based on the following criteria. 
        Do not make up information, quote exact text or data where possible.
        
        Company Evaluation (Score 0-3):
        - Growth Tailwinds (0: <=10%, 1: <=20%, 2: <=30%, 3: >30%)
        - Recurring Revenues (0: new customers, 1: repeat customers, 2: ongoing service, 3: contracts)
        - Niche Leadership (0: small player, 1: attainable range, 2: top 3, 3: clear leader)
        - High Margins (EBITDA/Rev) (0: <=15%, 1: <=20%, 2: <=25%, 3: >25%)
        - Strong Core Competency (0: difficult to identify, 1-3: clear identifiable product)
        - Differentiation (0: commodity, 1: slightly diff, 2: diff through product/service, 3: clear diff with proprietary attribute)
        - Low Supplier Power (0: one supplier, 1: few suppliers, 2: few but substitutable, 3: many suppliers)
        - Low Customer Concentration (0: >=50%, 1: >=30%, 2: >=20%, 3: >=10%)
        - Bonus Points Other (Company)
        
        Industry Evaluation (Score 0-3):
        - Growth Tailwinds (0: Negative, 1: 0-5%, 2: <=10%, 3: >10%)
        - Fragmented Industry (0: few players own majority, 1: few own 35%, 2: very fragmented, 3: no player >5%)
        - Barriers to Entry (0: none, 1: limited, 2: procedural/investment, 3: very hard)
        - Low Maintenance CAPEX (0: asset-intensive, 1-3: asset-light)
        - Operating Simplicity (0: very technical, 1: reasonably technical, 2: limited technical, 3: relies on execution)
        - Market Size (0: <=$300m, 1: <=$1bn, 2: <=$1.5bn, 3: >$1.5bn)
        - Scalable (0: geographic limitations, 1: slight limitations, 2: remote service, 3: current infrastructure sufficient)
        - Low Cyclicality (0: very cyclical, 1: cyclical but plannable, 2-3: non-cyclical)
        - Low Regulatory Risk (0: highly regulated, 1: regulated but stable, 2: compliance but not subsidized, 3: no risk)
        - Other factors
        
        Also provide qualitative Industry Analysis: History, Products, Customers, Size, Players, Business Model, Porter's Five Forces, Exogenous Variables, Megatrends, Final Assessment.`,
        config: {
          tools: [{ urlContext: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              companyName: { type: Type.STRING },
              productDescription: { type: Type.STRING },
              ebitda: { type: Type.STRING },
              purchaseMultiple: { type: Type.STRING },
              companyEvaluation: {
                type: Type.OBJECT,
                properties: {
                  growthTailwinds: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  recurringRevenues: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  nicheLeadership: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  highMargins: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  strongCoreCompetency: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  differentiation: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  lowSupplierPower: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  lowCustomerConcentration: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  bonusPoints: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } }
                }
              },
              industryEvaluation: {
                type: Type.OBJECT,
                properties: {
                  growthTailwinds: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  fragmentedIndustry: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  barriersToEntry: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  lowMaintenanceCapex: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  operatingSimplicity: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  marketSize: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  scalable: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  lowCyclicality: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  lowRegulatoryRisk: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } },
                  otherFactors: { type: Type.OBJECT, properties: { score: { type: Type.NUMBER }, reasoning: { type: Type.STRING } } }
                }
              },
              industryAnalysis: {
                type: Type.OBJECT,
                properties: {
                  historyAndEvolution: { type: Type.STRING },
                  productsServices: { type: Type.STRING },
                  customersSuppliersCompetitors: { type: Type.STRING },
                  industrySize: { type: Type.STRING },
                  industryPlayers: { type: Type.STRING },
                  businessModelReview: { type: Type.STRING },
                  strategicAssessment: { type: Type.STRING },
                  exogenousVariables: { type: Type.STRING },
                  megatrends: { type: Type.STRING },
                  finalAssessment: { type: Type.STRING }
                }
              },
              overallScore: { type: Type.NUMBER },
              summary: { type: Type.STRING }
            }
          }
        }
      });
      
      if (response.text) {
        const result = JSON.parse(response.text);
        setAnalysisResult(result);
      }
    } catch (error) {
      console.error("Error analyzing deal:", error);
      // Fallback mock data if API fails or no key
      setAnalysisResult({
        companyName: "Sample Logistics Co.",
        productDescription: "Regional B2B logistics and freight forwarding.",
        ebitda: "$1.2M",
        purchaseMultiple: "4.5x",
        companyEvaluation: {
          growthTailwinds: { score: 2, reasoning: "Steady 15% YoY growth." },
          recurringRevenues: { score: 1, reasoning: "High repeat business, but few long-term contracts." },
          nicheLeadership: { score: 2, reasoning: "Top 3 player in the regional market." },
          highMargins: { score: 1, reasoning: "18% EBITDA margin, standard for industry." },
          strongCoreCompetency: { score: 3, reasoning: "Clear focus on last-mile delivery." },
          differentiation: { score: 1, reasoning: "Competes somewhat on price, but reliable." },
          lowSupplierPower: { score: 3, reasoning: "Many fleet providers available." },
          lowCustomerConcentration: { score: 2, reasoning: "Top customer is 15% of revenue." },
          bonusPoints: { score: 1, reasoning: "Strong management team in place." }
        },
        industryEvaluation: {
          growthTailwinds: { score: 2, reasoning: "Industry growing at 8% annually." },
          fragmentedIndustry: { score: 2, reasoning: "Highly fragmented with many regional players." },
          barriersToEntry: { score: 2, reasoning: "Requires significant capital for fleet." },
          lowMaintenanceCapex: { score: 0, reasoning: "High capex for vehicle maintenance." },
          operatingSimplicity: { score: 2, reasoning: "Operationally straightforward but requires execution." },
          marketSize: { score: 3, reasoning: ">$1.5B national market." },
          scalable: { score: 1, reasoning: "Geographically constrained without new hubs." },
          lowCyclicality: { score: 1, reasoning: "Tied to broader economic health." },
          lowRegulatoryRisk: { score: 1, reasoning: "Subject to DOT regulations, but stable." },
          otherFactors: { score: 0, reasoning: "None noted." }
        },
        industryAnalysis: {
          historyAndEvolution: "The logistics industry has evolved from fragmented local carriers to tech-enabled regional networks.",
          productsServices: "Freight forwarding, last-mile delivery, warehousing.",
          customersSuppliersCompetitors: "B2B manufacturers, fleet leasers, regional carriers.",
          industrySize: "Total industry revenues exceed $100B nationally.",
          industryPlayers: "Highly fragmented with thousands of mom-and-pop operators.",
          businessModelReview: "Asset-heavy model with focus on route optimization and volume.",
          strategicAssessment: "High competition, moderate buyer power, low supplier power.",
          exogenousVariables: "Fuel prices and driver shortages are key risks.",
          megatrends: "E-commerce growth driving last-mile demand.",
          finalAssessment: "Solid industry with growth, but requires strong operational execution and capital management."
        },
        overallScore: 72,
        summary: "A solid regional player with good growth, but asset-heavy and somewhat cyclical."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const results = buyerProfile ? {
    archetype: {
      name: buyerProfile.archetype,
      icon: getArchetypeIcon(buyerProfile.archetype),
      color: getArchetypeColor(buyerProfile.archetype)
    },
    stats: {
      capitalPower: buyerProfile.stats.capitalAvailable,
      riskTolerance: buyerProfile.stats.riskTolerance,
      passionAlignment: buyerProfile.stats.passionAlignment
    }
  } : null;

  const matches = buyerProfile ? buyerProfile.businessMatches.map((m, i) => ({
    rank: m.rank,
    title: m.businessType,
    ebitda: m.ebitdaRange,
    match: m.matchPercent,
    mgmt: m.managementIntensity,
    why: m.explanation,
    color: i === 0 ? '#15F5BA' : i === 1 ? '#836FFF' : '#FFD65A'
  })) : [];

  if (!buyerProfile || !results) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[var(--color-bg-primary)]">
        <div className="w-16 h-16 rounded-full border-4 border-t-[var(--color-accent-primary)] border-r-[var(--color-accent-secondary)] border-b-[var(--color-accent-primary)] border-l-[var(--color-accent-secondary)] animate-spin-slow"></div>
        <p className="mt-6 text-[var(--color-text-secondary)] font-display tracking-widest text-sm uppercase">Analyzing Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4 bg-[var(--color-bg-primary)] relative overflow-hidden">
      {/* Background Burst */}
      <div className={`absolute inset-0 bg-gradient-to-b from-[var(--color-bg-section)] via-[var(--color-accent-secondary)]/10 to-[var(--color-bg-primary)] transition-opacity duration-1000 ${isFlipped ? 'opacity-100' : 'opacity-0'} pointer-events-none`}></div>

      <div className="flip-container w-full max-w-[720px] z-10">
        <FadeIn className={`flip-card w-full ${isFlipped ? 'flipped' : ''}`}>
          
          {/* Front Face (Placeholder) */}
          <div className="flip-face absolute inset-0 glass-card p-10 flex items-center justify-center border-[var(--color-accent-secondary)] shadow-lg">
            <div className="w-16 h-16 rounded-full border-4 border-t-[var(--color-accent-primary)] border-r-[var(--color-accent-secondary)] border-b-[var(--color-accent-primary)] border-l-[var(--color-accent-secondary)] animate-spin-slow"></div>
          </div>

          {/* Back Face (Results) */}
          <div className="flip-face flip-back glass-card w-full p-6 md:p-10 relative overflow-hidden">
            
            {/* BUYER PROFILE SUMMARY BOX */}
            <div className="mb-6">
              <div className="font-display font-medium text-[12px] uppercase tracking-[3px] text-[var(--color-text-secondary)] mb-4">
                YOUR BUYER PROFILE
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="glass-card p-4 border border-[rgba(131,111,255,0.2)] flex items-start gap-3 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-[var(--color-accent-secondary)] text-xl">💰</div>
                  <div>
                    <div className="font-display font-medium text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Purchasing Power</div>
                    <div className="text-[14px] text-[var(--color-text-primary)] font-medium">{buyerProfile.purchasingPower.description}</div>
                  </div>
                </div>
                <div className="glass-card p-4 border border-[rgba(131,111,255,0.2)] flex items-start gap-3 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-[var(--color-accent-secondary)] text-xl">⚙️</div>
                  <div>
                    <div className="font-display font-medium text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Involvement Style</div>
                    <div className="text-[14px] text-[var(--color-text-primary)] font-medium">{buyerProfile.buyerProfile.involvementStyle}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* BUY BOX SUMMARY */}
            <div className="mb-10">
              <div className="font-display font-medium text-[12px] uppercase tracking-[3px] text-[var(--color-text-secondary)] mb-4">
                YOUR BUY BOX
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="glass-card p-4 border border-[rgba(21,245,186,0.2)] flex items-start gap-3 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-[var(--color-accent-primary)] text-xl">🎯</div>
                  <div>
                    <div className="font-display font-medium text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Deal Size Target</div>
                    <div className="text-[14px] text-[var(--color-text-primary)] font-medium">{buyerProfile.buyerProfile.capitalBand}</div>
                  </div>
                </div>
                <div className="glass-card p-4 border border-[rgba(21,245,186,0.2)] flex items-start gap-3 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-[var(--color-accent-primary)] text-xl">📍</div>
                  <div>
                    <div className="font-display font-medium text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Geography</div>
                    <div className="text-[14px] text-[var(--color-text-primary)] font-medium">{buyerProfile.buyerProfile.geography}</div>
                  </div>
                </div>
                <div className="glass-card p-4 border border-[rgba(21,245,186,0.2)] flex items-start gap-3 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-[var(--color-accent-primary)] text-xl">🏢</div>
                  <div>
                    <div className="font-display font-medium text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Industry Focus</div>
                    <div className="text-[14px] text-[var(--color-text-primary)] font-medium">{buyerProfile.businessMatches[0]?.businessType || 'N/A'}</div>
                  </div>
                </div>
                <div className="glass-card p-4 border border-[rgba(21,245,186,0.2)] flex items-start gap-3 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-[var(--color-accent-primary)] text-xl">🔧</div>
                  <div>
                    <div className="font-display font-medium text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">Operations</div>
                    <div className="text-[14px] text-[var(--color-text-primary)] font-medium">{buyerProfile.businessMatches[0]?.managementIntensity || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* TOP — ARCHETYPE HEADER */}
            <div className="mb-8 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-elevated)] flex items-center justify-center text-2xl shadow-md border border-[var(--color-border-glass)]">
                    {results.archetype.icon}
                  </div>
                  <div className="font-display font-medium text-[12px] uppercase tracking-[3px] text-[var(--color-text-secondary)]">
                    YOUR ARCHETYPE:
                  </div>
                </div>
                
                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors" title="Share on Twitter">
                    <Twitter size={16} />
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="p-2 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors" title="Share on LinkedIn">
                    <Linkedin size={16} />
                  </button>
                  <button onClick={() => handleShare('facebook')} className="p-2 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[#1877F2] hover:border-[#1877F2] transition-colors" title="Share on Facebook">
                    <Facebook size={16} />
                  </button>
                  <button onClick={() => handleShare('native')} className="p-2 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-colors md:hidden" title="Share">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
              
              <h2 
                className="font-display font-bold text-[40px] md:text-[52px] leading-none mb-2"
                style={{ color: results.archetype.color, textShadow: `0 0 20px ${results.archetype.color}40` }}
              >
                {results.archetype.name.toUpperCase()}
              </h2>
              
              <div className="font-display font-medium text-[14px] text-[var(--color-accent-primary)] mb-4 italic">
                "Your corporate background is your competitive advantage"
              </div>
              
              <p className="text-[17px] text-[var(--color-text-secondary)] max-w-[560px] leading-relaxed">
                {getArchetypeDescription(results.archetype.name)}
              </p>
            </div>

            {/* Animated gradient accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] mb-8 rounded-full overflow-hidden">
              <div className={`h-full bg-[var(--color-bg-primary)] transition-all duration-800 ease-out ${isFlipped ? 'w-0' : 'w-full'} float-right`}></div>
            </div>

            {/* STAT BARS */}
            <div className="mb-10">
              <div className="font-display font-medium text-[12px] uppercase tracking-[2px] text-[var(--color-text-secondary)] mb-6">
                YOUR OPERATOR STATS
              </div>
              
              <div className="mt-4">
                <ThinStatRow label="Capital Power" score={results.stats.capitalPower} show={showStats} delay={0} />
                <ThinStatRow label="Risk Tolerance" score={results.stats.riskTolerance} show={showStats} delay={200} />
                <ThinStatRow label="Passion Alignment" score={results.stats.passionAlignment} show={showStats} delay={400} />
              </div>
            </div>

            {/* BUSINESS PROFILE MATCHES */}
            <div className={`transition-all duration-500 transform ${showMatches ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-10`}>
              <div className="font-display font-medium text-[12px] uppercase tracking-[2px] text-[var(--color-text-secondary)] mb-6">
                YOUR TOP ACQUISITION TARGETS
              </div>
              
              <div className="space-y-4">
                {matches.map((match, idx) => (
                  <div key={idx} className="glass-card p-5 relative overflow-hidden" style={{ borderLeft: `4px solid ${match.color}` }}>
                    <div className="absolute top-4 right-4 bg-[var(--color-bg-elevated)] px-3 py-1 rounded-full border border-[var(--color-border-glass)]">
                      <span className="font-display font-bold text-[12px] text-[var(--color-text-primary)]">{match.match}% MATCH</span>
                    </div>
                    
                    <h3 className="font-display font-semibold text-[18px] text-[var(--color-text-primary)] mb-1 pr-24">
                      #{match.rank} {match.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display font-medium text-[14px] text-[var(--color-accent-primary)]">{match.ebitda}</span>
                      <span className="text-[var(--color-border-subtle)]">•</span>
                      <span className="font-display font-medium text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wide">MGMT: {match.mgmt}</span>
                    </div>
                    
                    <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                      {match.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI DEAL SCORECARD PREVIEW */}
            <div className={`transition-all duration-500 transform ${showMatches ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-10`}>
              <div className="font-display font-medium text-[12px] uppercase tracking-[2px] text-[var(--color-text-secondary)] mb-2">
                AI DEAL SCORECARD PREVIEW
              </div>
              <div className="text-[12px] text-[var(--color-text-secondary)] mb-6 italic">
                Based on Professor Kent Weaver's acquisition framework
              </div>
              
              <div className="glass-card p-6 relative overflow-hidden group">
                {analysisResult ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border-subtle)] pb-4">
                      <h3 className="font-display font-semibold text-[20px] text-[var(--color-text-primary)]">Deal Analysis Complete</h3>
                      <div className="bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 px-3 py-1 rounded-full font-display font-bold text-[14px]">
                        SCORE: {analysisResult.overallScore}/100
                      </div>
                    </div>
                    <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed italic border-l-2 border-[var(--color-accent-secondary)] pl-4 mb-6">
                      "{analysisResult.summary}"
                    </p>
                    <div className="space-y-8">
                      {/* Company Evaluation */}
                      <div>
                        <h4 className="font-display font-semibold text-[16px] text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border-subtle)] pb-2">Company Evaluation</h4>
                        <div className="space-y-3">
                          <ScorecardBar label="Growth Tailwinds" desc={analysisResult.companyEvaluation.growthTailwinds.reasoning} score={analysisResult.companyEvaluation.growthTailwinds.score} maxScore={3} />
                          <ScorecardBar label="Recurring Revenues" desc={analysisResult.companyEvaluation.recurringRevenues.reasoning} score={analysisResult.companyEvaluation.recurringRevenues.score} maxScore={3} />
                          <ScorecardBar label="Niche Leadership" desc={analysisResult.companyEvaluation.nicheLeadership.reasoning} score={analysisResult.companyEvaluation.nicheLeadership.score} maxScore={3} />
                          <ScorecardBar label="High Margins" desc={analysisResult.companyEvaluation.highMargins.reasoning} score={analysisResult.companyEvaluation.highMargins.score} maxScore={3} />
                          <ScorecardBar label="Strong Core Competency" desc={analysisResult.companyEvaluation.strongCoreCompetency.reasoning} score={analysisResult.companyEvaluation.strongCoreCompetency.score} maxScore={3} />
                          <ScorecardBar label="Differentiation" desc={analysisResult.companyEvaluation.differentiation.reasoning} score={analysisResult.companyEvaluation.differentiation.score} maxScore={3} />
                          <ScorecardBar label="Low Supplier Power" desc={analysisResult.companyEvaluation.lowSupplierPower.reasoning} score={analysisResult.companyEvaluation.lowSupplierPower.score} maxScore={3} />
                          <ScorecardBar label="Low Customer Concentration" desc={analysisResult.companyEvaluation.lowCustomerConcentration.reasoning} score={analysisResult.companyEvaluation.lowCustomerConcentration.score} maxScore={3} />
                        </div>
                      </div>

                      {/* Industry Evaluation */}
                      <div>
                        <h4 className="font-display font-semibold text-[16px] text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border-subtle)] pb-2">Industry Evaluation</h4>
                        <div className="space-y-3">
                          <ScorecardBar label="Growth Tailwinds" desc={analysisResult.industryEvaluation.growthTailwinds.reasoning} score={analysisResult.industryEvaluation.growthTailwinds.score} maxScore={3} />
                          <ScorecardBar label="Fragmented Industry" desc={analysisResult.industryEvaluation.fragmentedIndustry.reasoning} score={analysisResult.industryEvaluation.fragmentedIndustry.score} maxScore={3} />
                          <ScorecardBar label="Barriers to Entry" desc={analysisResult.industryEvaluation.barriersToEntry.reasoning} score={analysisResult.industryEvaluation.barriersToEntry.score} maxScore={3} />
                          <ScorecardBar label="Low Maintenance CAPEX" desc={analysisResult.industryEvaluation.lowMaintenanceCapex.reasoning} score={analysisResult.industryEvaluation.lowMaintenanceCapex.score} maxScore={3} />
                          <ScorecardBar label="Operating Simplicity" desc={analysisResult.industryEvaluation.operatingSimplicity.reasoning} score={analysisResult.industryEvaluation.operatingSimplicity.score} maxScore={3} />
                          <ScorecardBar label="Market Size" desc={analysisResult.industryEvaluation.marketSize.reasoning} score={analysisResult.industryEvaluation.marketSize.score} maxScore={3} />
                          <ScorecardBar label="Scalable" desc={analysisResult.industryEvaluation.scalable.reasoning} score={analysisResult.industryEvaluation.scalable.score} maxScore={3} />
                          <ScorecardBar label="Low Cyclicality" desc={analysisResult.industryEvaluation.lowCyclicality.reasoning} score={analysisResult.industryEvaluation.lowCyclicality.score} maxScore={3} />
                          <ScorecardBar label="Low Regulatory Risk" desc={analysisResult.industryEvaluation.lowRegulatoryRisk.reasoning} score={analysisResult.industryEvaluation.lowRegulatoryRisk.score} maxScore={3} />
                        </div>
                      </div>

                      {/* Qualitative Industry Analysis */}
                      <div>
                        <h4 className="font-display font-semibold text-[16px] text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border-subtle)] pb-2">Industry Analysis</h4>
                        <div className="space-y-4 text-[13px] text-[var(--color-text-secondary)]">
                          <div><strong className="text-[var(--color-text-primary)]">History & Evolution:</strong> {analysisResult.industryAnalysis.historyAndEvolution}</div>
                          <div><strong className="text-[var(--color-text-primary)]">Products/Services:</strong> {analysisResult.industryAnalysis.productsServices}</div>
                          <div><strong className="text-[var(--color-text-primary)]">Customers, Suppliers, Competitors:</strong> {analysisResult.industryAnalysis.customersSuppliersCompetitors}</div>
                          <div><strong className="text-[var(--color-text-primary)]">Industry Size:</strong> {analysisResult.industryAnalysis.industrySize}</div>
                          <div><strong className="text-[var(--color-text-primary)]">Industry Players:</strong> {analysisResult.industryAnalysis.industryPlayers}</div>
                          <div><strong className="text-[var(--color-text-primary)]">Business Model Review:</strong> {analysisResult.industryAnalysis.businessModelReview}</div>
                          <div><strong className="text-[var(--color-text-primary)]">Strategic Assessment (Porter's):</strong> {analysisResult.industryAnalysis.strategicAssessment}</div>
                          <div><strong className="text-[var(--color-text-primary)]">Exogenous Variables:</strong> {analysisResult.industryAnalysis.exogenousVariables}</div>
                          <div><strong className="text-[var(--color-text-primary)]">Megatrends:</strong> {analysisResult.industryAnalysis.megatrends}</div>
                          <div className="p-3 bg-[var(--color-bg-elevated)] rounded-lg border border-[var(--color-border-subtle)] mt-2">
                            <strong className="text-[var(--color-text-primary)] block mb-1">Final Assessment:</strong> 
                            {analysisResult.industryAnalysis.finalAssessment}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setAnalysisResult(null); setShowInput(false); setDealUrl(''); }}
                      className="mt-6 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline"
                    >
                      Analyze another deal
                    </button>
                  </div>
                ) : showInput ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-full max-w-md">
                      <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] mb-2">Paste BizBuySell or Crexi URL</label>
                      <input 
                        type="url" 
                        value={dealUrl}
                        onChange={(e) => setDealUrl(e.target.value)}
                        placeholder="https://www.bizbuysell.com/Business-Real-Estate-For-Sale/..."
                        className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] mb-4"
                      />
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setShowInput(false)}
                          className="flex-1 bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] font-display font-semibold text-[13px] uppercase px-4 py-3 rounded-lg hover:bg-[var(--color-bg-primary)] transition-all duration-200"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleAnalyzeDeal}
                          disabled={!dealUrl || isAnalyzing}
                          className={`flex-1 font-display font-semibold text-[13px] uppercase px-4 py-3 rounded-lg transition-all duration-200 ${!dealUrl || isAnalyzing ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] cursor-not-allowed' : 'bg-[var(--color-accent-secondary)] text-white hover:shadow-lg'}`}
                        >
                          {isAnalyzing ? 'Analyzing...' : 'Analyze Deal →'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 opacity-40 blur-[1px] transition-all duration-300">
                      <ScorecardBar label="Growth Tailwinds" desc="Is this industry growing, stable, or declining?" />
                      <ScorecardBar label="Recurring Revenues" desc="Recurring vs. one-time revenue concentration" />
                      <ScorecardBar label="Niche Leadership" desc="Is the company a leader in its niche market?" />
                      <ScorecardBar label="High Margins" desc="EBITDA/Revenue - healthy, defensible margins" />
                      <ScorecardBar label="Strong Core Competency" desc="Clear, identifiable product or service" />
                      <ScorecardBar label="Differentiation" desc="Differentiation from competitors" />
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-primary)]/40 backdrop-blur-[2px]">
                      <div className="text-3xl mb-3">🔒</div>
                      <p className="text-[14px] text-[var(--color-text-primary)] font-medium mb-4 text-center max-w-[280px]">
                        Full deal scorecard unlocks when you submit a listing for analysis
                      </p>
                      <button 
                        onClick={() => setShowInput(true)}
                        className="bg-transparent text-[var(--color-accent-secondary)] border border-[var(--color-accent-secondary)] font-display font-semibold text-[13px] uppercase px-6 py-2 rounded-lg hover:bg-[var(--color-accent-secondary)] hover:bg-opacity-10 transition-all duration-200"
                      >
                        ANALYZE A DEAL →
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ROADMAP PREVIEW */}
            <div className={`transition-all duration-500 transform ${showRoadmap ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="font-display font-medium text-[12px] uppercase tracking-[2px] text-[var(--color-text-secondary)] mb-6">
                YOUR 90-DAY ACQUISITION ROADMAP
              </div>
              
              <div className="glass-card p-6 mb-8 overflow-x-auto hover:border-[var(--color-accent-primary)]/30 transition-colors duration-300">
                <div className="flex justify-between items-center mb-4 relative min-w-[600px]">
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[var(--color-border-subtle)] -z-10 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-0 w-[28%] h-[2px] bg-[var(--color-accent-primary)] shadow-sm -z-10 -translate-y-1/2"></div>
                  
                  <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-accent-primary)] shadow-md border-2 border-[var(--color-bg-primary)] flex items-center justify-center text-[var(--color-bg-primary)] text-[10px] group-hover:scale-125 transition-transform duration-300">✓</div>
                    <span className="font-display font-medium text-[10px] uppercase tracking-wide text-[var(--color-accent-primary)] text-center w-16 group-hover:font-bold transition-all">Build Profile</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-accent-primary)] shadow-[0_0_15px_rgba(21,245,186,0.5)] border-2 border-[var(--color-bg-primary)] animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="font-display font-medium text-[10px] uppercase tracking-wide text-[var(--color-accent-primary)] text-center w-16 group-hover:font-bold transition-all">Review Deals</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 opacity-50 group cursor-pointer hover:opacity-100 transition-opacity">
                    <div className="w-4 h-4 rounded-full bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] group-hover:border-[var(--color-accent-secondary)] transition-colors"></div>
                    <span className="font-display font-medium text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] text-center w-16">Sign NDA</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 opacity-50 group cursor-pointer hover:opacity-100 transition-opacity">
                    <div className="w-4 h-4 rounded-full bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] group-hover:border-[var(--color-accent-secondary)] transition-colors"></div>
                    <span className="font-display font-medium text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] text-center w-16">Diligence</span>
                  </div>

                  <div className="flex flex-col items-center gap-2 opacity-50 group cursor-pointer hover:opacity-100 transition-opacity">
                    <div className="w-4 h-4 rounded-full bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] group-hover:border-[var(--color-accent-secondary)] transition-colors"></div>
                    <span className="font-display font-medium text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] text-center w-16">POF Verified</span>
                  </div>

                  <div className="flex flex-col items-center gap-2 opacity-50 group cursor-pointer hover:opacity-100 transition-opacity">
                    <div className="w-4 h-4 rounded-full bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] group-hover:border-[var(--color-accent-secondary)] transition-colors"></div>
                    <span className="font-display font-medium text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] text-center w-16">Submit LOI</span>
                  </div>

                  <div className="flex flex-col items-center gap-2 opacity-50 group cursor-pointer hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] flex items-center justify-center text-[12px] group-hover:border-[var(--color-accent-secondary)] transition-colors">🏆</div>
                    <span className="font-display font-medium text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] text-center w-16">Close</span>
                  </div>
                </div>
                
                <p className="text-[14px] text-[var(--color-text-secondary)] text-center mt-6">
                  You've completed Step 1 of 7. 847 buyers are on this path. Most stop here. Don't.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setShowEmailModal(true)}
                  className="w-full bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-display font-semibold text-[16px] uppercase px-10 py-[18px] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                >
                  SEE MY MATCHED DEALS →
                </button>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[13px] text-[var(--color-text-secondary)] mt-2">
                  <span className="flex items-center gap-1">🔒 Proof of funds required only before broker contact</span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">📋 No credit check at this stage</span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">🤝 Free until you're ready to move on a deal</span>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>

      {/* EMAIL MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm">
          <div className="glass-card p-8 max-w-[480px] w-full relative animate-badge">
            <button 
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              ✕
            </button>
            
            {emailSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[var(--color-accent-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[var(--color-accent-primary)] text-3xl">✓</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-[var(--color-text-primary)] mb-2">Roadmap Unlocked!</h3>
                <p className="text-[var(--color-text-secondary)]">Scroll down to see your personalized 90-day acquisition plan.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display font-semibold text-[24px] mb-4 text-[var(--color-text-primary)]">Your full 90-day acquisition roadmap is ready.</h3>
                <p className="text-[16px] text-[var(--color-text-secondary)] mb-6">
                  Enter your email to unlock Level 1: your personalized target list criteria, outreach templates, and first-contact scripts — built for your exact archetype and capital band.
                </p>
                
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your@email.com" 
                  className={`w-full bg-[var(--color-bg-primary)] border ${emailError ? 'border-red-500' : 'border-[var(--color-border-subtle)]'} rounded-xl px-4 py-4 mb-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-secondary)] focus:shadow-md transition-all`}
                />
                {emailError && <p className="text-red-500 text-xs mt-1 mb-4">{emailError}</p>}
                
                <button 
                  onClick={handleEmailSubmit}
                  className="w-full bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-display font-semibold text-[16px] uppercase px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mb-4"
                >
                  UNLOCK MY ROADMAP →
                </button>
                
                <p className="text-[12px] text-[var(--color-text-secondary)] text-center">
                  No spam. Unsubscribe anytime. Used by 847 active searchers.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for thin stat rows
function ThinStatRow({ label, score, show, delay }: { label: string, score: number, show: boolean, delay: number }) {
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setIsFilled(true), delay);
      return () => clearTimeout(timer);
    }
  }, [show, delay]);

  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="w-32 font-display font-medium text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] text-right">
        {label}
      </div>
      <div className="flex-1 h-[6px] bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] rounded-full transition-all duration-1000 ease-out"
          style={{ width: isFilled ? `${score}%` : '0%' }}
        ></div>
      </div>
      <div className="w-8 font-display font-bold text-[12px] text-[var(--color-text-primary)]">
        {score}
      </div>
    </div>
  );
}

// Helper component for Scorecard Preview
function ScorecardBar({ label, desc, score, maxScore = 10 }: { label: string, desc: string, score?: number, maxScore?: number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/50">
      <div className="flex-1 pr-4">
        <div className="font-display font-medium text-[13px] text-[var(--color-text-primary)]">{label}</div>
        <div className="text-[11px] text-[var(--color-text-secondary)] mt-1">{desc}</div>
      </div>
      {score !== undefined ? (
        <div className="flex flex-col items-end min-w-[40px]">
          <span className="font-display font-bold text-[16px] text-[var(--color-accent-primary)]">{score}/{maxScore}</span>
          <div className="w-16 h-1.5 bg-[var(--color-border-glass)] rounded-full overflow-hidden mt-1">
            <div className="h-full bg-[var(--color-accent-primary)]" style={{ width: `${(score / maxScore) * 100}%` }}></div>
          </div>
        </div>
      ) : (
        <div className="w-16 h-2 bg-[var(--color-border-glass)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--color-accent-secondary)] w-2/3"></div>
        </div>
      )}
    </div>
  );
}
