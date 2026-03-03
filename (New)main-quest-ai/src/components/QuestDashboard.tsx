import React, { useState, useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import FadeIn from './FadeIn';
import { Trophy, Target, Mail, FileText, Briefcase, Zap, Flame, CheckCircle2, Lock } from 'lucide-react';

interface QuestDashboardProps {
  onActionComplete?: (xp: number) => void;
  onNavigate?: (view: string) => void;
}

export default function QuestDashboard({ onActionComplete, onNavigate }: QuestDashboardProps) {
  const { session, addXp, completeQuest } = useSession();
  const [activeTab, setActiveTab] = useState<'roadmap' | 'quests'>('roadmap');

  const levels = [
    {
      level: 1,
      title: "SCOUT TERRITORY",
      goal: "Build target list of 50 businesses",
      unlocks: "First Contact email templates",
      icon: <Target className="w-6 h-6" />,
      requiredXp: 0,
    },
    {
      level: 2,
      title: "FIRST CONTACT",
      goal: "Send 20 outreach emails",
      unlocks: "Negotiation Playbook + community access",
      icon: <Mail className="w-6 h-6" />,
      requiredXp: 1000,
    },
    {
      level: 3,
      title: "DUE DILIGENCE",
      goal: "Review 3 financials",
      unlocks: "SBA Loan Application Assistant",
      icon: <FileText className="w-6 h-6" />,
      requiredXp: 2500,
    },
    {
      level: 4,
      title: "SUBMIT LOI",
      goal: "Submit LOI",
      unlocks: "Fractional CFO consultation + 'Deal Announcer' badge",
      icon: <Briefcase className="w-6 h-6" />,
      requiredXp: 5000,
    }
  ];

  const dailyQuests = [
    { id: 'research', title: 'Research 5 Businesses', xp: 100, icon: <Target className="w-4 h-4" /> },
    { id: 'outreach', title: 'Send 2 Outreach Emails', xp: 150, icon: <Mail className="w-4 h-4" /> },
    { id: 'analyze', title: 'Analyze 1 Deal Listing', xp: 75, icon: <Zap className="w-4 h-4" /> },
    { id: 'review', title: 'Review 1 CIM', xp: 100, icon: <FileText className="w-4 h-4" /> },
  ];

  const currentLevelData = levels.find(l => session.level === l.level) || levels[0];
  const nextLevelData = levels.find(l => l.level === session.level + 1);
  const xpInCurrentLevel = session.xp - (currentLevelData.requiredXp || 0);
  const xpNeededForNext = nextLevelData ? nextLevelData.requiredXp - currentLevelData.requiredXp : 1000;
  const progressToNextLevel = Math.min(100, (xpInCurrentLevel / xpNeededForNext) * 100);

  const handleQuestComplete = (questId: string, xp: number) => {
    completeQuest(questId, xp);
    if (onActionComplete) onActionComplete(xp);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* HEADER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <FadeIn className="glass-card p-6 border-l-4 border-l-[#15F5BA] bg-[#0A0A0F]/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#15F5BA]/10 flex items-center justify-center text-[#15F5BA]">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[12px] font-display font-bold uppercase tracking-widest text-gray-400">Current Level</div>
                <div className="text-2xl font-display font-bold text-white">LVL {session.level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[12px] font-display font-bold uppercase tracking-widest text-gray-400">Total XP</div>
              <div className="text-2xl font-display font-bold text-[#15F5BA]">{(session.xp || 0).toLocaleString()}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-display font-bold uppercase tracking-wider text-gray-500">
              <span>Progress to Level {session.level + 1}</span>
              <span>{Math.round(progressToNextLevel)}%</span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#15F5BA] to-[#836FFF] transition-all duration-1000"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100} className="glass-card p-6 border-l-4 border-l-[#FFD65A] bg-[#0A0A0F]/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFD65A]/10 flex items-center justify-center text-[#FFD65A]">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[12px] font-display font-bold uppercase tracking-widest text-gray-400">Daily Streak</div>
              <div className="text-2xl font-display font-bold text-white">🔥 {session.streak} Days Active</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">Keep the momentum going! Complete a quest today to maintain your streak.</p>
        </FadeIn>

        <FadeIn delay={200} className="glass-card p-6 border-l-4 border-l-[#836FFF] bg-[#0A0A0F]/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#836FFF]/10 flex items-center justify-center text-[#836FFF]">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[12px] font-display font-bold uppercase tracking-widest text-gray-400">Current Quest</div>
              <div className="text-xl font-display font-bold text-white truncate max-w-[200px]">{currentLevelData.title}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">Next Unlock: <span className="text-[#836FFF]">{currentLevelData.unlocks}</span></p>
        </FadeIn>
      </div>

      {/* MAIN CONTENT TABS */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('roadmap')}
          className={`px-6 py-3 rounded-xl font-display font-bold text-sm uppercase tracking-widest transition-all ${activeTab === 'roadmap' ? 'bg-[#15F5BA] text-black shadow-[0_0_20px_rgba(21,245,186,0.3)]' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'}`}
        >
          Acquisition Roadmap
        </button>
        <button 
          onClick={() => setActiveTab('quests')}
          className={`px-6 py-3 rounded-xl font-display font-bold text-sm uppercase tracking-widest transition-all ${activeTab === 'quests' ? 'bg-[#15F5BA] text-black shadow-[0_0_20px_rgba(21,245,186,0.3)]' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'}`}
        >
          Daily Quests
        </button>
      </div>

      {activeTab === 'roadmap' ? (
        <div className="grid grid-cols-1 gap-6">
          {levels.map((l, idx) => {
            const isUnlocked = session.level >= l.level;
            const isCurrent = session.level === l.level;
            
            return (
              <FadeIn key={l.level} delay={idx * 100}>
                <div className={`glass-card p-8 relative overflow-hidden transition-all duration-300 ${isUnlocked ? 'border-[#15F5BA]/30' : 'opacity-50 grayscale'}`}>
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-[#0A0A0F]/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <Lock className="w-8 h-8 text-gray-500" />
                        <span className="text-xs font-display font-bold uppercase tracking-widest text-gray-500">Locked - Reach Level {l.level}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isUnlocked ? 'bg-[#15F5BA]/10 text-[#15F5BA]' : 'bg-gray-800 text-gray-500'}`}>
                        {l.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[12px] font-display font-bold uppercase tracking-widest text-[#15F5BA]">Level {l.level}</span>
                          {isCurrent && <span className="bg-[#15F5BA] text-black text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Current Stage</span>}
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">{l.title}</h3>
                        <p className="text-gray-400 max-w-xl">{l.goal}</p>
                      </div>
                    </div>
                    
                    <div className="md:text-right">
                      <div className="text-[11px] font-display font-bold uppercase tracking-widest text-gray-500 mb-2">Unlocks</div>
                      <div className={`text-sm font-medium ${isUnlocked ? 'text-[#836FFF]' : 'text-gray-500'}`}>{l.unlocks}</div>
                    </div>
                  </div>
                  
                  {isCurrent && (
                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-sm text-gray-400">
                        Complete your target list to advance to Level 2.
                      </div>
                      <button 
                        onClick={() => onNavigate?.('deals')}
                        className="bg-[#15F5BA] text-black font-display font-bold text-xs uppercase px-8 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(21,245,186,0.4)] transition-all"
                      >
                        Launch Scout Tool →
                      </button>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dailyQuests.map((q, idx) => {
            const isCompleted = session.completedQuests.includes(q.id);
            return (
              <FadeIn key={q.id} delay={idx * 100}>
                <div className={`glass-card p-6 h-full flex flex-col transition-all duration-300 ${isCompleted ? 'border-[#15F5BA]/50 bg-[#15F5BA]/5' : 'hover:border-white/20'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-[#15F5BA] text-black' : 'bg-gray-800 text-gray-400'}`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : q.icon}
                    </div>
                    <div className="text-[12px] font-display font-bold text-[#15F5BA]">+{q.xp} XP</div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">{q.title}</h3>
                  <p className="text-sm text-gray-400 mb-8 flex-grow">Daily quest reset in 14h 22m</p>
                  
                  <button 
                    onClick={() => handleQuestComplete(q.id, q.xp)}
                    disabled={isCompleted}
                    className={`w-full py-3 rounded-lg font-display font-bold text-xs uppercase tracking-widest transition-all ${isCompleted ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {isCompleted ? 'Completed' : 'Complete Quest'}
                  </button>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
