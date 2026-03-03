import React from 'react';
import FadeIn from './FadeIn';

interface LandingPageProps {
  onStartAssessment: () => void;
}

export default function LandingPage({ onStartAssessment }: LandingPageProps) {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-bg-section)_0%,var(--color-bg-primary)_100%)] z-0" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-accent-secondary)] rounded-full blur-[100px] opacity-10 animate-float z-0" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--color-accent-secondary)] rounded-full blur-[100px] opacity-10 animate-float-reverse z-0" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="glass-card px-4 py-2 rounded-full border-[var(--color-accent-secondary)] border-opacity-30 mb-8">
            <span className="text-[var(--color-accent-primary)] text-sm font-medium tracking-wide uppercase">
              🔥 3 million U.S. small businesses are for sale. Most won't close. We fix that.
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl md:text-[64px] leading-tight text-[var(--color-text-primary)] max-w-[900px] mb-6">
            Buying a business is the most powerful financial move you can make. Most people never try because no one shows them how.
          </h1>

          <p className="text-[var(--color-text-secondary)] text-lg md:text-[22px] max-w-[700px] mb-10 leading-relaxed">
            The AI-powered acquisition OS that takes you from capital to closed deal—no broker, MBA, or ETA background required.
          </p>

          <button 
            onClick={onStartAssessment}
            className="bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-display font-semibold text-[16px] uppercase px-10 py-[18px] rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 mb-4"
          >
            BUILD YOUR BUYER PROFILE →
          </button>

          <p className="text-[var(--color-text-secondary)] text-[13px]">
            Free profile · No ETA experience required · 15 minutes
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-16">
            <div className="glass-card px-6 py-3">
              <span className="font-display font-medium text-[14px] uppercase tracking-[2px] text-[var(--color-text-primary)]">3M+ Businesses For Sale in the U.S.</span>
            </div>
            <div className="glass-card px-6 py-3">
              <span className="font-display font-medium text-[14px] uppercase tracking-[2px] text-[var(--color-text-primary)]">6,000 Business Brokers Available (Not Enough)</span>
            </div>
            <div className="glass-card px-6 py-3">
              <span className="font-display font-medium text-[14px] uppercase tracking-[2px] text-[var(--color-text-primary)]">73% of First-Time Buyers Quit Without a Guide</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / AGITATION SECTION */}
      <section className="bg-[var(--color-bg-primary)] py-[100px] px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display font-semibold text-3xl md:text-[40px] mb-4">Why Most First-Time Buyers Never Close a Deal</h2>
              <p className="text-[var(--color-text-secondary)] text-[18px] max-w-2xl mx-auto">
                It's not the capital. It's not the deal flow. It's that nobody built a system for people who are new to this.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <div className="glass-card p-8 border-t-2 border-t-[var(--color-accent-primary)] hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-primary)]/10 flex items-center justify-center text-[var(--color-accent-primary)] text-2xl mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="font-display font-semibold text-[22px] mb-3">The Knowledge Gap</h3>
                <p className="text-[var(--color-text-secondary)] text-[16px] leading-relaxed">
                  Listings are useless without context. We teach you how to read CIMs, value EBITDA, spot hidden risks, and talk to brokers.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="glass-card p-8 border-t-2 border-t-[var(--color-accent-secondary)] hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-secondary)]/10 flex items-center justify-center text-[var(--color-accent-secondary)] text-2xl mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-display font-semibold text-[22px] mb-3">The Process Gap</h3>
                <p className="text-[var(--color-text-secondary)] text-[16px] leading-relaxed">
                  Acquisition has 20+ sequential steps. Miss one, and you lose the deal. We provide the exact roadmap from buy box to LOI to close.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="glass-card p-8 border-t-2 border-t-[var(--color-accent-warning)] hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-warning)]/10 flex items-center justify-center text-[var(--color-accent-warning)] text-2xl mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <h3 className="font-display font-semibold text-[22px] mb-3">The Identity Gap</h3>
                <p className="text-[var(--color-text-secondary)] text-[16px] leading-relaxed">
                  Transitioning from W-2 to ownership is daunting. You need a system built for first-time buyers that proves you can actually do this.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="bg-[var(--color-bg-section)] py-[100px] px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="font-display font-semibold text-3xl md:text-[40px] text-center mb-20">Your Acquisition Pipeline</h2>
          </FadeIn>
          
          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[32px] left-[10%] right-[10%] h-[2px] bg-[var(--color-border-subtle)] z-0" />
            <div className="hidden md:block absolute top-[32px] left-[10%] w-[15%] h-[2px] bg-[var(--color-accent-primary)] shadow-sm z-0" />

            {/* Stage 1 */}
            <FadeIn delay={100} className="flex-1 relative z-10 flex flex-col items-center md:items-start group">
              <div className="w-[64px] h-[64px] rounded-2xl bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent-primary)] shadow-lg flex items-center justify-center text-[var(--color-accent-primary)] mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h3 className="font-display font-semibold text-[16px] mb-3 text-center md:text-left text-[var(--color-accent-primary)]">1. BUILD BUYER PROFILE</h3>
              <p className="text-[var(--color-text-secondary)] text-[15px] text-center md:text-left mb-4 leading-relaxed">
                Answer 12 questions. Our AI builds your buyer resume and defines your exact acquisition criteria.
              </p>
            </FadeIn>

            {/* Stage 2 */}
            <FadeIn delay={200} className="flex-1 relative z-10 flex flex-col items-center md:items-start opacity-70 hover:opacity-100 transition-opacity duration-300 group">
              <div className="w-[64px] h-[64px] rounded-2xl bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="font-display font-semibold text-[16px] mb-3 text-center md:text-left text-[var(--color-text-primary)]">2. GET MATCHED</h3>
              <p className="text-[var(--color-text-secondary)] text-[15px] text-center md:text-left mb-4 leading-relaxed">
                We source and score listings from across the web against your buy box. You only see deals worth your time.
              </p>
            </FadeIn>

            {/* Stage 3 */}
            <FadeIn delay={300} className="flex-1 relative z-10 flex flex-col items-center md:items-start opacity-70 hover:opacity-100 transition-opacity duration-300 group">
              <div className="w-[64px] h-[64px] rounded-2xl bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <h3 className="font-display font-semibold text-[16px] mb-3 text-center md:text-left text-[var(--color-text-primary)]">3. NAVIGATE DEAL</h3>
              <p className="text-[var(--color-text-secondary)] text-[15px] text-center md:text-left mb-4 leading-relaxed">
                From NDAs and intro calls to due diligence and financial review, our AI guides you through every step.
              </p>
            </FadeIn>

            {/* Stage 4 */}
            <FadeIn delay={400} className="flex-1 relative z-10 flex flex-col items-center md:items-start opacity-70 hover:opacity-100 transition-opacity duration-300 group">
              <div className="w-[64px] h-[64px] rounded-2xl bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="font-display font-semibold text-[16px] mb-3 text-center md:text-left text-[var(--color-text-primary)]">4. VERIFY & CLOSE</h3>
              <p className="text-[var(--color-text-secondary)] text-[15px] text-center md:text-left mb-4 leading-relaxed">
                Get verified with proof of funds and SBA pre-qualification. We connect you to lenders and attorneys to get the deal closed.
              </p>
            </FadeIn>

            {/* Stage 5 */}
            <FadeIn delay={500} className="flex-1 relative z-10 flex flex-col items-center md:items-start opacity-40 hover:opacity-100 transition-opacity duration-300 group">
              <div className="w-[64px] h-[64px] rounded-2xl bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="font-display font-semibold text-[16px] mb-3 text-center md:text-left text-[var(--color-text-primary)] flex items-center gap-2">
                5. OWN IT
                <span className="bg-[var(--color-accent-secondary)] text-white text-[9px] px-2 py-0.5 rounded-full">SOON</span>
              </h3>
              <p className="text-[var(--color-text-secondary)] text-[15px] text-center md:text-left mb-4 italic leading-relaxed">
                Your 90-day operating plan and AI-powered advisory to ensure a smooth transition into ownership.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PLATFORM OVERVIEW SECTION */}
      <section className="bg-[var(--color-bg-primary)] py-[100px] px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display font-semibold text-3xl md:text-[36px] mb-4">The Full Acquisition Stack. In One Platform.</h2>
              <p className="text-[var(--color-text-secondary)] text-[18px] max-w-2xl mx-auto">
                Main Quest AI replaces the broker, the deal database subscription, the advisor, and the guesswork — in a single guided workflow.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="glass-card overflow-hidden bg-[#1A1A2E] text-white border border-white/10 shadow-2xl rounded-2xl">
              {/* Headers */}
              <div className="grid grid-cols-3 border-b border-white/10">
                <div className="p-6 text-[#F6287D] font-display font-semibold text-lg text-center md:text-left">The Old Way</div>
                <div className="p-6 text-[var(--color-accent-primary)] font-display font-semibold text-xl border-l-2 border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 shadow-[inset_0_0_20px_rgba(21,245,186,0.1)] text-center md:text-left flex items-center justify-center md:justify-start gap-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                  <span className="text-2xl">✨</span> Main Quest AI
                </div>
                <div className="p-6 text-[#8892B0] font-display font-semibold text-lg text-center md:text-left">BizBuySell Alone</div>
              </div>

              {/* Rows */}
              <div className="grid grid-cols-3 bg-white/5 transition-colors hover:bg-white/10 group">
                <div className="p-5 text-[#F6287D]/80 text-[15px] flex items-center gap-2"><span className="text-xl">💸</span> Pay broker 8–10%</div>
                <div className="p-5 text-white text-[15px] border-l-2 border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 font-medium flex items-center gap-2 group-hover:bg-[var(--color-accent-primary)]/20 transition-colors"><span className="text-xl">🤖</span> AI-guided, fraction of cost</div>
                <div className="p-5 text-[#8892B0] text-[15px] flex items-center gap-2"><span className="text-xl">🤷</span> No guidance</div>
              </div>
              
              <div className="grid grid-cols-3 bg-transparent transition-colors hover:bg-white/5 group">
                <div className="p-5 text-[#F6287D]/80 text-[15px] flex items-center gap-2"><span className="text-xl">⏳</span> Months of manual research</div>
                <div className="p-5 text-white text-[15px] border-l-2 border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 font-medium flex items-center gap-2 group-hover:bg-[var(--color-accent-primary)]/20 transition-colors"><span className="text-xl">🎯</span> Pre-screened matched deals</div>
                <div className="p-5 text-[#8892B0] text-[15px] flex items-center gap-2"><span className="text-xl">🔍</span> Search thousands yourself</div>
              </div>

              <div className="grid grid-cols-3 bg-white/5 transition-colors hover:bg-white/10 group">
                <div className="p-5 text-[#F6287D]/80 text-[15px] flex items-center gap-2"><span className="text-xl">🎓</span> MBA/ETA experience needed</div>
                <div className="p-5 text-white text-[15px] border-l-2 border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 font-medium flex items-center gap-2 group-hover:bg-[var(--color-accent-primary)]/20 transition-colors"><span className="text-xl">🚀</span> Built for first-time buyers</div>
                <div className="p-5 text-[#8892B0] text-[15px] flex items-center gap-2"><span className="text-xl">📚</span> No education</div>
              </div>

              <div className="grid grid-cols-3 bg-transparent transition-colors hover:bg-white/5 group">
                <div className="p-5 text-[#F6287D]/80 text-[15px] flex items-center gap-2"><span className="text-xl">🔓</span> No buyer vetting</div>
                <div className="p-5 text-white text-[15px] border-l-2 border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 font-medium flex items-center gap-2 group-hover:bg-[var(--color-accent-primary)]/20 transition-colors"><span className="text-xl">✅</span> POF verification before contact</div>
                <div className="p-5 text-[#8892B0] text-[15px] flex items-center gap-2"><span className="text-xl">🔓</span> No vetting</div>
              </div>

              <div className="grid grid-cols-3 bg-white/5 transition-colors hover:bg-white/10 group">
                <div className="p-5 text-[#F6287D]/80 text-[15px] flex items-center gap-2"><span className="text-xl">👻</span> Broker disappears post-close</div>
                <div className="p-5 text-white text-[15px] border-l-2 border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 font-medium flex items-center gap-2 group-hover:bg-[var(--color-accent-primary)]/20 transition-colors"><span className="text-xl">🗺️</span> Step-by-step guidance</div>
                <div className="p-5 text-[#8892B0] text-[15px] flex items-center gap-2"><span className="text-xl">🛑</span> Support ends at listing</div>
              </div>

              <div className="grid grid-cols-3 bg-transparent transition-colors hover:bg-white/5 group">
                <div className="p-5 text-[#F6287D]/80 text-[15px] flex items-center gap-2"><span className="text-xl">🎲</span> Subjective deal quality</div>
                <div className="p-5 text-white text-[15px] border-l-2 border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 font-medium flex items-center gap-2 group-hover:bg-[var(--color-accent-primary)]/20 transition-colors"><span className="text-xl">📊</span> AI deal scorecard</div>
                <div className="p-5 text-[#8892B0] text-[15px] flex items-center gap-2"><span className="text-xl">📉</span> Basic financial data only</div>
              </div>
            </div>
          </FadeIn>

          <p className="text-center text-[14px] text-[var(--color-text-secondary)] mt-8 font-medium">
            BizBuySell is where deals live. Main Quest AI is how you close them.
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="bg-[var(--color-bg-primary)] py-[100px] px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-semibold text-3xl md:text-[36px] mb-4">From Corporate to Operator</h2>
            <p className="text-[var(--color-text-secondary)] text-[18px]">Real searchers. Real acquisition journeys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center text-xl">👩‍💼</div>
                <div>
                  <div className="font-display font-semibold text-[15px] text-[var(--color-text-primary)]">Sarah K.</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)]">Former Product Director</div>
                </div>
              </div>
              <div className="text-[var(--color-accent-primary)] text-xs font-medium mb-3 uppercase tracking-wider">🔥 47-day streak · 2 LOIs</div>
              <p className="text-[15px] italic mb-6 flex-grow text-[var(--color-text-secondary)] leading-relaxed">"Main Quest pointed me toward B2B manufacturing distribution — $1.1M EBITDA, low customer concentration. My corporate ops background actually matters here."</p>
            </div>

            <div className="glass-card p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center text-xl">👨‍💼</div>
                <div>
                  <div className="font-display font-semibold text-[15px] text-[var(--color-text-primary)]">Marcus T.</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)]">Ex-McKinsey Principal</div>
                </div>
              </div>
              <div className="text-[var(--color-accent-secondary)] text-xs font-medium mb-3 uppercase tracking-wider">Active diligence</div>
              <p className="text-[15px] italic mb-6 flex-grow text-[var(--color-text-secondary)] leading-relaxed">"Turns out I score high on financial risk but low on operational ambiguity tolerance. That's a Builder profile, not a Driver. Completely changed my targets."</p>
            </div>

            <div className="glass-card p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center text-xl">👩‍💻</div>
                <div>
                  <div className="font-display font-semibold text-[15px] text-[var(--color-text-primary)]">Priya N.</div>
                  <div className="text-[12px] text-[var(--color-text-secondary)]">Former VP Engineering</div>
                </div>
              </div>
              <div className="text-[var(--color-accent-primary)] text-xs font-medium mb-3 uppercase tracking-wider">🔥 31-day streak</div>
              <p className="text-[15px] italic mb-6 flex-grow text-[var(--color-text-secondary)] leading-relaxed">"The archetype matching alone was worth more than a $3,500 coaching program. Guide profile — identified professional services as my sweet spot."</p>
            </div>
          </div>

          <div className="glass-card p-6 text-center max-w-3xl mx-auto border-[var(--color-accent-secondary)]/30">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-2xl text-[var(--color-text-primary)]">847</span>
                <span className="text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)]">Active Searchers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-2xl text-[var(--color-text-primary)]">34</span>
                <span className="text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)]">LOIs Submitted</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-2xl text-[var(--color-text-primary)]">12</span>
                <span className="text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)]">Acquisitions</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-2xl text-[var(--color-text-primary)]">73</span>
                <span className="text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)]">Days to First LOI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)] py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display font-bold text-xl text-[var(--color-accent-primary)]">Main Quest AI</div>
          <div className="text-[var(--color-text-secondary)] text-[12px] text-center max-w-xl">
            Main Quest AI provides psychographic assessment tools for informational purposes only. This is not financial, legal, or investment advice. All acquisition decisions should involve qualified legal and financial professionals.
          </div>
          <div className="text-[var(--color-text-secondary)] text-[12px] text-center md:text-right">
            Built for the ETA community.<br/>
            Frameworks: Scalable.co Founder-Type Matrix · NFTE EMI · Grable-Lytton Risk Scale
          </div>
        </div>
      </footer>
    </div>
  );
}
