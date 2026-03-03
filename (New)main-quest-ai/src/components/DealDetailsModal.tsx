import React from 'react';
import { X, TrendingUp, DollarSign, BarChart3, ShieldCheck, MapPin, Calendar, Users, Info } from 'lucide-react';
import { DealMatch } from '../types';
import FadeIn from './FadeIn';

interface DealDetailsModalProps {
  deal: DealMatch | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (deal: DealMatch) => void;
  isSaved: boolean;
}

export default function DealDetailsModal({ deal, isOpen, onClose, onSave, isSaved }: DealDetailsModalProps) {
  if (!deal || !isOpen) return null;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-[#0A0A0F]/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <FadeIn className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-[#0A0A0F] border border-white/10 rounded-3xl shadow-2xl hide-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#15F5BA]/10 text-[#15F5BA] text-[10px] font-bold uppercase tracking-widest border border-[#15F5BA]/20">
                {deal.industry}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                {deal.matchPercent}% Match Score
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{deal.title}</h2>
            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{deal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{deal.yearsInBusiness} Years in Business</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{deal.ownerInvolvement} Owner Involvement</span>
              </div>
            </div>
          </div>

          {/* Financials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Asking Price', value: formatCurrency(deal.askingPrice), icon: <DollarSign className="w-5 h-5" />, color: 'text-white' },
              { label: 'Annual Revenue', value: formatCurrency(deal.annualRevenue), icon: <TrendingUp className="w-5 h-5" />, color: 'text-white' },
              { label: 'Annual EBITDA', value: formatCurrency(deal.annualEbitda), icon: <BarChart3 className="w-5 h-5" />, color: 'text-[#15F5BA]' },
              { label: 'Multiple', value: `${deal.ebitdaMultiple}x`, icon: < ShieldCheck className="w-5 h-5" />, color: 'text-[#836FFF]' },
            ].map((stat, idx) => (
              <div key={idx} className="glass-card p-6 border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-3 text-gray-500">
                  {stat.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                </div>
                <div className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <section>
                <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#15F5BA]" />
                  Deal Summary
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  This is a high-performing {deal.industry} business located in {deal.location}. 
                  With over {deal.yearsInBusiness} years of operational history, the company has established a dominant market position. 
                  The current owner is selling due to {deal.reasonForSale.toLowerCase()}, creating a prime opportunity for an operator-manager to step in and scale.
                </p>
              </section>

              {/* AI Analysis */}
              <section className="p-8 rounded-3xl bg-gradient-to-br from-[#15F5BA]/10 to-[#836FFF]/10 border border-[#15F5BA]/20">
                <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#15F5BA]" />
                  AI Analysis Score: {deal.dealHealthScore}/100
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-bold text-white mb-2">Why this matches your profile:</div>
                    <p className="text-sm text-gray-300">{deal.whyMatchedToYou}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-[11px] font-bold text-[#15F5BA] uppercase tracking-widest mb-3">Key Strengths</div>
                      <ul className="space-y-2">
                        {deal.keyStrengths.map((s, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-[#15F5BA]">✓</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[#FFD65A] uppercase tracking-widest mb-3">Watch Out For</div>
                      <ul className="space-y-2">
                        {deal.watchOutFor.map((w, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-[#FFD65A]">!</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              <div className="glass-card p-6 border-white/10 sticky top-0">
                <h4 className="font-display font-bold text-white mb-6">Take Action</h4>
                <div className="space-y-3">
                  <button 
                    onClick={() => onSave(deal)}
                    className={`w-full py-4 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all ${isSaved ? 'bg-[#15F5BA]/20 text-[#15F5BA] border border-[#15F5BA]/30' : 'bg-[#15F5BA] text-black hover:shadow-[0_0_20px_rgba(21,245,186,0.4)]'}`}
                  >
                    {isSaved ? 'Saved to Pipeline' : 'Save to Pipeline'}
                  </button>
                  <button className="w-full py-4 rounded-xl bg-white/5 text-white border border-white/10 font-display font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                    Request Intro
                  </button>
                  <button className="w-full py-4 rounded-xl bg-white/5 text-white border border-white/10 font-display font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                    Download CIM
                  </button>
                </div>
                <p className="mt-6 text-[10px] text-gray-500 text-center uppercase tracking-widest">
                  Verified Listing • SBA Eligible
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
