import React from 'react';
import { Search, ShieldCheck, Handshake, Lock } from 'lucide-react';
import FadeIn from './FadeIn';

export default function CampaignDashboard() {
  return (
    <div id="campaign" className="w-full max-w-6xl mx-auto px-4 md:px-10 py-16">
      {/* DASHBOARD HEADER */}
      <FadeIn>
        <div className="bg-[#0A0A0F] rounded-3xl p-8 md:p-12 relative overflow-hidden mb-8 border border-[var(--color-border-glass)] shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#211951_0%,transparent_70%)] opacity-50 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex-1">
              <div className="font-display font-medium text-[11px] uppercase tracking-[3px] text-[#8892B0] mb-3">
                YOUR MAIN QUEST
              </div>
              <h2 className="font-display font-bold text-[36px] text-[#E6F1FF] leading-tight mb-3">
                90-Day Acquisition Campaign
              </h2>
              <p className="font-sans text-[16px] text-[#8892B0] max-w-xl">
                The fastest path from 'I have capital' to 'I own a business.' Mapped. Guided. Tracked.
              </p>
            </div>
            
            <div className="glass-card p-6 border border-[rgba(131,111,255,0.2)] flex items-center gap-8 bg-[#0A0A0F]/60 backdrop-blur-xl rounded-2xl">
              <div>
                <div className="font-display font-bold text-[40px] text-[#15F5BA] leading-none mb-1">
                  1,250 XP
                </div>
                <div className="font-display font-medium text-[13px] text-[#8892B0] mb-4">
                  Level 3 · Qualified Buyer
                </div>
                <div className="h-2 w-full bg-[#2A2A4A] rounded-full overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#836FFF] to-[#15F5BA] rounded-full shadow-[0_0_10px_rgba(21,245,186,0.5)]"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="px-4 py-1.5 rounded-full bg-[#FFD65A]/10 border border-[#FFD65A]/30 text-[#FFD65A] font-display font-bold text-[13px]">
                  🔥 12-Day Streak
                </div>
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2A2A4A" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#15F5BA" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="217.7" className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display font-bold text-[14px] text-[#E6F1FF] leading-tight">Day 12</span>
                    <span className="font-display font-medium text-[10px] text-[#8892B0] uppercase">of 90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 3-PHASE CAMPAIGN TIMELINE & ACTIVE MISSION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* TIMELINE */}
        <div className="lg:col-span-5 relative">
          <div className="absolute left-[24px] top-10 bottom-10 w-[2px] border-l-2 border-dashed border-[#2A2A4A] hidden md:block"></div>
          
          <div className="space-y-8">
            {/* PHASE 1 */}
            <FadeIn delay={100}>
              <div className="relative flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#15F5BA]/10 border border-[#15F5BA] flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(21,245,186,0.2)]">
                  <Search size={20} className="text-[#15F5BA]" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#15F5BA]/20 text-[#15F5BA] font-display font-bold text-[10px] uppercase tracking-wider mb-2">
                    ACTIVE · Day 12
                  </div>
                  <h3 className="font-display font-semibold text-[20px] text-[#E6F1FF] mb-1">PHASE 1: SCOUT TARGETS</h3>
                  <div className="text-[13px] text-[#8892B0] mb-4">Days 0–30 · +2,500 XP on completion</div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-1.5 bg-[#2A2A4A] rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-[#15F5BA]"></div>
                    </div>
                    <span className="text-[12px] text-[#8892B0] font-medium">4 of 8 missions</span>
                  </div>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-[14px] text-[#8892B0]">
                      <div className="w-5 h-5 rounded-full bg-[#15F5BA]/20 flex items-center justify-center text-[#15F5BA] text-[10px]">✓</div>
                      <span className="line-through opacity-70">Complete Buyer Profile</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#8892B0]">
                      <div className="w-5 h-5 rounded-full bg-[#15F5BA]/20 flex items-center justify-center text-[#15F5BA] text-[10px]">✓</div>
                      <span className="line-through opacity-70">Review 5 Matched Deals</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#8892B0]">
                      <div className="w-5 h-5 rounded-full bg-[#15F5BA]/20 flex items-center justify-center text-[#15F5BA] text-[10px]">✓</div>
                      <span className="line-through opacity-70">Save 2 Deals to Watchlist</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#8892B0]">
                      <div className="w-5 h-5 rounded-full bg-[#15F5BA]/20 flex items-center justify-center text-[#15F5BA] text-[10px]">✓</div>
                      <span className="line-through opacity-70">Read: What is EBITDA?</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#E6F1FF] font-medium">
                      <div className="w-5 h-5 rounded-full border-2 border-[#15F5BA] flex items-center justify-center relative">
                        <div className="w-2 h-2 rounded-full bg-[#15F5BA] animate-pulse"></div>
                      </div>
                      <span>Request CIM from 1 Deal</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#8892B0]/50">
                      <Lock size={14} className="ml-0.5" />
                      <span className="ml-1">Sign Your First NDA</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#8892B0]/50">
                      <Lock size={14} className="ml-0.5" />
                      <span className="ml-1">Schedule Intro Call with Seller</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#8892B0]/50">
                      <Lock size={14} className="ml-0.5" />
                      <span className="ml-1">Complete Due Diligence Checklist</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* PHASE 2 */}
            <FadeIn delay={200}>
              <div className="relative flex gap-6 opacity-60">
                <div className="w-12 h-12 rounded-full bg-[#2A2A4A] flex items-center justify-center shrink-0 z-10">
                  <ShieldCheck size={20} className="text-[#8892B0]" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#2A2A4A] text-[#8892B0] font-display font-bold text-[10px] uppercase tracking-wider mb-2">
                    UNLOCKS DAY 31
                  </div>
                  <h3 className="font-display font-semibold text-[20px] text-[#E6F1FF] mb-1 opacity-80">PHASE 2: EVALUATE & DILIGENCE</h3>
                  <div className="text-[13px] text-[#8892B0] mb-2">Days 31–60 · 8 missions · +3,500 XP</div>
                  <p className="text-[14px] text-[#8892B0] leading-relaxed">
                    Quality of earnings analysis, management interview framework, red flag scanner, SBA pre-qualification.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* PHASE 3 */}
            <FadeIn delay={300}>
              <div className="relative flex gap-6 opacity-40">
                <div className="w-12 h-12 rounded-full bg-[#2A2A4A] flex items-center justify-center shrink-0 z-10">
                  <Handshake size={20} className="text-[#8892B0]" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#2A2A4A] text-[#8892B0] font-display font-bold text-[10px] uppercase tracking-wider mb-2">
                    UNLOCKS DAY 61
                  </div>
                  <h3 className="font-display font-semibold text-[20px] text-[#E6F1FF] mb-1 opacity-80">PHASE 3: NEGOTIATE & CLOSE</h3>
                  <div className="text-[13px] text-[#8892B0] mb-2">Days 61–90 · 8 missions · +5,000 XP</div>
                  <p className="text-[14px] text-[#8892B0] leading-relaxed">
                    LOI drafting, SBA lender connections, purchase agreement review, closing checklist.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ACTIVE MISSION CARD */}
        <div className="lg:col-span-7">
          <FadeIn delay={400} className="h-full">
            <div className="glass-card p-8 border border-[#15F5BA]/30 shadow-[0_0_30px_rgba(21,245,186,0.05)] bg-[#0A0A0F]/80 backdrop-blur-xl rounded-3xl sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="font-display font-medium text-[12px] uppercase tracking-[2px] text-[#8892B0]">
                  CURRENT MISSION
                </div>
                <div className="px-3 py-1 rounded-full bg-[#15F5BA]/20 text-[#15F5BA] font-display font-bold text-[12px]">
                  +250 XP
                </div>
              </div>
              
              <h3 className="font-display font-semibold text-[24px] text-[#E6F1FF] mb-4">
                Request a CIM from Your #1 Matched Deal
              </h3>
              
              <p className="font-sans text-[16px] text-[#8892B0] leading-relaxed mb-6">
                A Confidential Information Memorandum (CIM) is the seller's business prospectus. Requesting one signals you're a serious buyer. Your AI will draft a professional email introduction — ready to send in 2 minutes.
              </p>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#15F5BA]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#15F5BA]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#2A2A4A]"></div>
                </div>
                <span className="text-[13px] text-[#8892B0] font-medium">Step 2 of 3 · In Progress</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="flex-1 bg-[#15F5BA] text-[#0A0A0F] font-display font-bold text-[14px] uppercase tracking-wider px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(21,245,186,0.4)] hover:shadow-[0_0_30px_rgba(21,245,186,0.6)] transition-all transform hover:-translate-y-0.5">
                  GENERATE INTRO EMAIL →
                </button>
                <button className="flex-1 bg-transparent border border-[#836FFF] text-[#E6F1FF] font-display font-bold text-[14px] uppercase tracking-wider px-6 py-4 rounded-xl hover:bg-[#836FFF]/10 transition-colors">
                  VIEW DEAL DETAILS
                </button>
              </div>
              
              <div className="bg-[#211951]/50 border-l-2 border-[#836FFF] p-4 rounded-r-xl">
                <p className="text-[14px] text-[#E6F1FF] leading-relaxed">
                  <span className="mr-2">💡</span>
                  <span className="font-semibold text-[#836FFF]">Pro Tip:</span> Mention your SBA pre-qualification in your intro email. Brokers filter out buyers who can't prove capital — this gets you to the front of the line.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* COMMUNITY PULSE */}
      <div className="mb-16">
        <div className="mb-6">
          <div className="font-display font-medium text-[11px] uppercase tracking-[3px] text-[#8892B0] mb-1">
            COMMUNITY PULSE
          </div>
          <div className="text-[14px] text-[#8892B0]">
            Where other buyers are in their 90-day campaign.
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 gap-4 snap-x hide-scrollbar">
          {[
            { name: "Marcus T.", arch: "Driver", icon: "⚡", phase: 2, day: 43, streak: 28, xp: 4200 },
            { name: "Sarah K.", arch: "Builder", icon: "⚙️", phase: 2, day: 38, streak: 47, xp: 3800 },
            { name: "Priya N.", arch: "Builder", icon: "⚙️", phase: 1, day: 22, streak: 31, xp: 2100 },
            { name: "James L.", arch: "Guide", icon: "🧭", phase: 1, day: 15, streak: 5, xp: 1450 },
            { name: "David R.", arch: "Inventor", icon: "💡", phase: 1, day: 9, streak: 3, xp: 850 }
          ].map((user, i) => (
            <div key={i} className="glass-card min-w-[220px] p-5 rounded-2xl border border-[var(--color-border-glass)] snap-start shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2A2A4A] flex items-center justify-center text-[14px]">
                    {user.icon}
                  </div>
                  <div>
                    <div className="font-display font-bold text-[14px] text-[#E6F1FF]">{user.name}</div>
                    <div className="text-[11px] text-[#8892B0]">{user.arch}</div>
                  </div>
                </div>
                <div className="text-[12px] font-bold text-[#FFD65A]">🔥 {user.streak}</div>
              </div>
              
              <div className="flex items-center justify-between text-[12px] text-[#8892B0] mb-2">
                <span>Phase {user.phase} · Day {user.day}</span>
                <span className="font-display font-bold text-[#15F5BA]">{user.xp} XP</span>
              </div>
              
              <div className="h-1.5 w-full bg-[#2A2A4A] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#836FFF] to-[#15F5BA]" style={{ width: `${(user.xp / 5000) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACHIEVEMENT BADGES */}
      <div>
        <div className="font-display font-medium text-[11px] uppercase tracking-[3px] text-[#8892B0] mb-6">
          ACHIEVEMENTS UNLOCKED
        </div>
        
        <div className="flex flex-wrap gap-6">
          {[
            { id: 1, title: "PROFILE BUILT", desc: "You know who you are as a buyer.", icon: "👤", unlocked: true },
            { id: 2, title: "FIRST MATCH", desc: "Your deal feed is live.", icon: "🎯", unlocked: true },
            { id: 3, title: "DEAL SAVED", desc: "You've got a target.", icon: "⭐", unlocked: true },
            { id: 4, title: "CIM REQUESTED", desc: "You're in the conversation.", icon: "📄", unlocked: true },
            { id: 5, title: "NDA SIGNED", desc: "Access to confidential info.", icon: "✍️", unlocked: false },
            { id: 6, title: "LOI SUBMITTED", desc: "Making an offer.", icon: "🤝", unlocked: false },
          ].map((badge, i) => (
            <div key={badge.id} className="group relative flex flex-col items-center gap-3">
              <div 
                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-500
                  ${badge.unlocked 
                    ? 'bg-[#15F5BA]/10 border-2 border-[#15F5BA] shadow-[0_0_20px_rgba(21,245,186,0.3)] animate-[scale-in_0.5s_ease-out_forwards]' 
                    : 'bg-[#2A2A4A]/50 border-2 border-[#2A2A4A] opacity-50'
                  }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {badge.icon}
              </div>
              <div className={`font-display font-bold text-[10px] uppercase tracking-wider text-center max-w-[80px] ${badge.unlocked ? 'text-[#15F5BA]' : 'text-[#8892B0]'}`}>
                {badge.title}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-3 bg-[#211951] border border-[#836FFF]/50 rounded-xl text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                <div className="font-display font-bold text-[12px] text-[#E6F1FF] mb-1">{badge.title}</div>
                <div className="text-[12px] text-[#8892B0]">{badge.desc}</div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#211951] border-b border-r border-[#836FFF]/50 transform rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
