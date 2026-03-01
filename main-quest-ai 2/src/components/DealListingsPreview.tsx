import React, { useState, useEffect } from 'react';
import VerificationModal from './VerificationModal';
import FadeIn from './FadeIn';
import { useSession } from '../context/SessionContext';
import { generateDealMatches } from '../ai/flows/generate-deal-matches';
import { saveDeal } from '../lib/actions/saveProfile';
import { DealMatch } from '../types';

interface DealListingsPreviewProps {
  onDealSave?: () => void;
}

export default function DealListingsPreview({ onDealSave }: DealListingsPreviewProps) {
  const { session, updateSession } = useSession();
  const [verifiedDeals, setVerifiedDeals] = useState<Set<string>>(new Set());
  const [dealToVerify, setDealToVerify] = useState<string | null>(null);
  const [deals, setDeals] = useState<DealMatch[]>(session.matchedDeals || []);
  const [isLoading, setIsLoading] = useState(!session.matchedDeals);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    async function fetchDeals() {
      if (session.matchedDeals || !session.buyerProfile) {
        setIsLoading(false);
        return;
      }

      try {
        const generatedDeals = await generateDealMatches(session.buyerProfile);
        setDeals(generatedDeals);
        updateSession({ matchedDeals: generatedDeals });
      } catch (error) {
        console.error("Error generating deals:", error);
        // Fallback to sample deals if AI fails
        const fallbackDeals = generateFallbackDeals();
        setDeals(fallbackDeals);
        updateSession({ matchedDeals: fallbackDeals });
      } finally {
        setIsLoading(false);
      }
    }

    fetchDeals();
  }, [session.buyerProfile, session.matchedDeals]);

  const generateFallbackDeals = (): DealMatch[] => {
    return [
      {
        id: 'd1', title: 'B2B Commercial Landscaping', industry: 'Facility Services', location: 'Sunbelt Region',
        annualRevenue: 4200000, annualEbitda: 850000, ebitdaMultiple: 3.8, askingPrice: 3200000,
        matchPercent: 94, dealHealthScore: 88, yearsInBusiness: 15,
        keyStrengths: ['Recurring Revenue', 'SBA Pre-Qualified'], watchOutFor: ['Customer Concentration'],
        whyMatchedToYou: 'Strong process orientation fits this model.', sbaEligible: true, ownerInvolvement: 'Medium', reasonForSale: 'Retirement'
      },
      {
        id: 'd2', title: 'Niche Manufacturing - Aerospace Parts', industry: 'Light Manufacturing', location: 'Midwest',
        annualRevenue: 6500000, annualEbitda: 1200000, ebitdaMultiple: 3.75, askingPrice: 4500000,
        matchPercent: 89, dealHealthScore: 76, yearsInBusiness: 22,
        keyStrengths: ['High Moat', 'Real Estate Included'], watchOutFor: ['CapEx Requirements'],
        whyMatchedToYou: 'Matches your capital band and industry preference.', sbaEligible: false, ownerInvolvement: 'High', reasonForSale: 'Relocation'
      },
      {
        id: 'd3', title: 'Managed IT Services Provider (MSP)', industry: 'B2B Services', location: 'Remote / National',
        annualRevenue: 2800000, annualEbitda: 600000, ebitdaMultiple: 3.5, askingPrice: 2100000,
        matchPercent: 85, dealHealthScore: 92, yearsInBusiness: 8,
        keyStrengths: ['90% Recurring', 'Turnkey Management'], watchOutFor: ['Key Employee Risk'],
        whyMatchedToYou: 'High recurring revenue aligns with your risk profile.', sbaEligible: true, ownerInvolvement: 'Low', reasonForSale: 'Other Interests'
      },
      {
        id: 'd4', title: 'Specialty HVAC Commercial Contractor', industry: 'Commercial Services', location: 'Texas',
        annualRevenue: 8100000, annualEbitda: 1500000, ebitdaMultiple: 3.86, askingPrice: 5800000,
        matchPercent: 82, dealHealthScore: 71, yearsInBusiness: 12,
        keyStrengths: ['Union-Free', 'High Growth'], watchOutFor: ['Cyclicality'],
        whyMatchedToYou: 'Strong growth potential for a Driver archetype.', sbaEligible: false, ownerInvolvement: 'High', reasonForSale: 'Partner Dispute'
      }
    ];
  };

  const handleVerify = () => {
    if (dealToVerify) {
      setVerifiedDeals(prev => new Set(prev).add(dealToVerify));
      setDealToVerify(null);
    }
  };

  const handleSaveDeal = async (deal: DealMatch) => {
    const isSaved = session.savedDealIds.includes(deal.id);
    let newSavedIds = [...session.savedDealIds];
    
    if (isSaved) {
      newSavedIds = newSavedIds.filter(id => id !== deal.id);
    } else {
      newSavedIds.push(deal.id);
      try {
        await saveDeal(session.sessionId, deal);
      } catch (error) {
        console.error("Failed to save deal to DB", error);
      }
      if (onDealSave) onDealSave();
    }
    
    updateSession({ savedDealIds: newSavedIds });
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const industries = ['All', ...Array.from(new Set(deals.map(d => d.industry)))];
  const filteredDeals = filter === 'All' ? deals : deals.filter(d => d.industry === filter);

  return (
    <div id="deals" className="w-full max-w-[1000px] mx-auto py-20 px-4">
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-[32px] md:text-[40px] text-[var(--color-text-primary)] mb-4">
            Matched Deals Preview
          </h2>
          <p className="text-[18px] text-[var(--color-text-secondary)] max-w-[600px] mx-auto mb-8">
            Based on your profile, here are actual businesses currently on the market that fit your criteria.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-colors ${
                  filter === ind 
                    ? 'bg-[var(--color-accent-primary)] border-[var(--color-accent-primary)] text-[var(--color-bg-primary)]' 
                    : 'bg-[var(--color-bg-elevated)] border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)]'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-card p-6 h-[400px] animate-pulse">
              <div className="w-16 h-6 bg-[var(--color-border-subtle)] rounded-full absolute top-6 right-6"></div>
              <div className="w-24 h-4 bg-[var(--color-border-subtle)] rounded mb-2 mt-2"></div>
              <div className="w-3/4 h-8 bg-[var(--color-border-subtle)] rounded mb-4"></div>
              <div className="w-1/3 h-4 bg-[var(--color-border-subtle)] rounded mb-8"></div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-12 bg-[var(--color-bg-elevated)] rounded"></div>
                <div className="h-12 bg-[var(--color-bg-elevated)] rounded"></div>
                <div className="h-12 bg-[var(--color-bg-elevated)] rounded"></div>
                <div className="h-12 bg-[var(--color-bg-elevated)] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredDeals.map((deal, index) => (
            <FadeIn key={deal.id} delay={index * 100}>
              <div className="glass-card p-6 relative group hover:border-[var(--color-accent-secondary)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Match Badge & Verified Badge */}
                <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                  <div className="bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 px-3 py-1 rounded-full font-display font-bold text-[14px]">
                    {deal.matchPercent}% MATCH
                  </div>
                  {verifiedDeals.has(deal.id) && (
                    <div className="bg-[#15F5BA]/10 text-[#15F5BA] border border-[#15F5BA]/30 px-3 py-1 rounded-full font-display font-bold text-[12px] flex items-center gap-1">
                      <span>✅</span> VERIFIED BUYER
                    </div>
                  )}
                </div>

                {/* Header */}
                <div className="mb-4 pr-24">
                  <div className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    {deal.industry}
                  </div>
                  <h3 className="font-display font-semibold text-[20px] text-[var(--color-text-primary)] leading-tight mb-2">
                    {deal.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[14px] text-[var(--color-text-secondary)]">
                    <span>📍 {deal.location}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {deal.keyStrengths.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[var(--color-bg-elevated)] rounded text-[11px] text-[var(--color-text-secondary)]">
                      {tag}
                    </span>
                  ))}
                  {deal.sbaEligible && (
                    <span className="px-2 py-1 bg-[var(--color-bg-elevated)] rounded text-[11px] text-[var(--color-text-secondary)]">
                      SBA Pre-Qualified
                    </span>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[var(--color-bg-elevated)]/50 rounded-xl border border-[var(--color-border-subtle)]">
                  <div>
                    <div className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Revenue</div>
                    <div className="font-display font-semibold text-[16px] text-[var(--color-text-primary)]">{formatCurrency(deal.annualRevenue)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">EBITDA</div>
                    <div className="font-display font-semibold text-[16px] text-[var(--color-accent-primary)]">{formatCurrency(deal.annualEbitda)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Margin</div>
                    <div className="font-display font-semibold text-[16px] text-[var(--color-text-primary)]">{Math.round((deal.annualEbitda / deal.annualRevenue) * 100)}%</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Asking</div>
                    <div className="font-display font-semibold text-[16px] text-[var(--color-text-primary)]">{formatCurrency(deal.askingPrice)}</div>
                  </div>
                </div>

                {/* Scorecard Health */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase">Scorecard Health</span>
                    <span className="text-[12px] font-bold text-[var(--color-text-primary)]">{deal.dealHealthScore}/100</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] rounded-full"
                      style={{ width: `${deal.dealHealthScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto">
                  {verifiedDeals.has(deal.id) ? (
                    <button className="flex-1 bg-[#15F5BA] text-[#0A0A0A] shadow-[0_0_15px_rgba(21,245,186,0.3)] hover:shadow-[0_0_25px_rgba(21,245,186,0.5)] font-display font-semibold text-[13px] uppercase py-3 rounded-lg transition-all duration-200">
                      CONTACT SELLER →
                    </button>
                  ) : (
                    <button 
                      onClick={() => setDealToVerify(deal.id)}
                      className="flex-1 bg-[var(--color-bg-elevated)] hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] font-display font-semibold text-[13px] uppercase py-3 rounded-lg transition-all duration-200"
                    >
                      VIEW DEAL DETAILS
                    </button>
                  )}
                  <button 
                    onClick={() => handleSaveDeal(deal)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-lg transition-colors text-xl ${
                      session.savedDealIds.includes(deal.id) 
                        ? 'bg-[var(--color-accent-primary)]/20 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]' 
                        : 'bg-[var(--color-bg-elevated)] border-[var(--color-border-subtle)] hover:bg-[var(--color-border-glass)]'
                    }`}
                  >
                    {session.savedDealIds.includes(deal.id) ? '★' : '☆'}
                  </button>
                </div>
                
                <div className="text-center mt-3">
                  <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">
                    Broker: Quiet Light Brokerage
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {/* External Partners Section */}
      <div className="border-t border-[var(--color-border-subtle)] pt-12">
        <div className="text-center mb-8">
          <h3 className="font-display font-semibold text-[24px] text-[var(--color-text-primary)] mb-2">
            Deal Sourcing & Diligence Partners
          </h3>
          <p className="text-[15px] text-[var(--color-text-secondary)] max-w-[600px] mx-auto">
            Your profile automatically filters and analyzes listings from our network of premium deal sources.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-70">
          <a href="https://www.rejigg.com/businesses/113487?utm_source=rejigg_notification&utm_medium=email&utm_campaign=NEW_SEARCH_PARAMS_MATCH" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:scale-105 transition-all text-[20px] font-display font-bold text-[#1A1A2E] flex items-center gap-2">
            <span className="text-[var(--color-accent-primary)]">●</span> Rejigg
          </a>
          <a href="https://www.bizbuysell.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:scale-105 transition-all text-[20px] font-display font-bold text-[#D32F2F] flex items-center gap-2">
            BizBuySell
          </a>
          <a href="https://network.axial.net" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:scale-105 transition-all text-[20px] font-display font-bold text-[#0052CC] flex items-center gap-2">
            Axial
          </a>
          <a href="https://searchfunder.com/feed" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:scale-105 transition-all text-[20px] font-display font-bold text-[#2E7D32] flex items-center gap-2">
            Searchfunder
          </a>
          <a href="https://dealprint.io/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:scale-105 transition-all text-[20px] font-display font-bold text-[#4A148C] flex items-center gap-2">
            Dealprint
          </a>
        </div>
      </div>

      <VerificationModal 
        isOpen={dealToVerify !== null}
        onClose={() => setDealToVerify(null)}
        onVerify={handleVerify}
      />
    </div>
  );
}
