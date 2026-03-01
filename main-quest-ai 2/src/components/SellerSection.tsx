import React, { useState } from 'react';
import SellerListingModal from './SellerListingModal';
import FadeIn from './FadeIn';

export default function SellerSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="seller-section" className="bg-[#211951] py-[80px] px-[40px] relative overflow-hidden border-t border-[var(--color-border-subtle)]">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#836FFF] rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side (60%) */}
        <div className="lg:w-[60%] z-10">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#836FFF]/10 border border-[#836FFF]/30 mb-6">
              <span className="font-display font-bold text-[12px] text-[#836FFF] tracking-widest uppercase">
                FOR BUSINESS OWNERS
              </span>
            </div>
            
            <h2 className="font-display font-bold text-[40px] text-white leading-[1.1] mb-6">
              Ready to sell? We bring you qualified, pre-screened buyers.
            </h2>
            
            <p className="font-sans text-[18px] text-[#8892B0] leading-relaxed mb-8 max-w-[600px]">
              We verify every buyer's proof of funds before they can contact you. No tire kickers. No time wasters. Just motivated, capital-ready acquirers.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <span className="text-[#15F5BA] mt-0.5">✅</span>
                <span className="font-sans text-[16px] text-[#8892B0]">
                  <strong className="text-white font-medium">Pre-screened buyers only</strong> — proof of funds verified upfront
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#15F5BA] mt-0.5">✅</span>
                <span className="font-sans text-[16px] text-[#8892B0]">
                  <strong className="text-white font-medium">AI-powered buyer-business matching</strong> (your deal goes to the right person)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#15F5BA] mt-0.5">✅</span>
                <span className="font-sans text-[16px] text-[#8892B0]">
                  <strong className="text-white font-medium">List for less than BizBuySell</strong> — we handle deal flow for you
                </span>
              </li>
            </ul>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#836FFF] text-[#E6F1FF] font-display font-semibold text-[16px] uppercase px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(131,111,255,0.4)] hover:shadow-[0_0_30px_rgba(131,111,255,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              LIST YOUR BUSINESS →
            </button>
          </FadeIn>
        </div>

        {/* Right Side (40%) */}
        <div className="lg:w-[40%] w-full z-10">
          <FadeIn delay={200}>
            <div className="bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#836FFF] to-[#15F5BA]"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#836FFF]/20 flex items-center justify-center text-xl">
                  📊
                </div>
                <h3 className="font-display font-semibold text-[20px] text-white">
                  SELLER SCORECARD PREVIEW
                </h3>
              </div>
              
              <p className="font-sans text-[14px] text-[#8892B0] mb-6">
                Your business will be scored on:
              </p>
              
              <div className="space-y-5 mb-8">
                {[
                  { label: 'Revenue Stability', val: 85 },
                  { label: 'Owner Dependency', val: 70 },
                  { label: 'Mgmt Team Depth', val: 60 },
                  { label: 'SBA Eligibility', val: 95 },
                  { label: 'Buyer Demand Index', val: 88 }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] font-medium text-[#8892B0] uppercase tracking-wider mb-2">
                      <span>{stat.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#836FFF] to-[#15F5BA] rounded-full"
                        style={{ width: `${stat.val}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 rounded-xl bg-[#15F5BA]/10 border border-[#15F5BA]/20">
                <p className="font-sans text-[14px] text-[#15F5BA] text-center font-medium">
                  Sellers with scores 75+ get 3x more qualified buyer introductions.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
        
      </div>

      <SellerListingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
