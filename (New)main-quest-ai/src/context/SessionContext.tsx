import React, { createContext, useContext, useState, useEffect } from 'react';
import { BuyerProfile, DealMatch, PipelineDeal } from '../types';

interface SessionState {
  sessionId: string;
  assessmentAnswers: Record<string, string[]>;
  assessmentComplete: boolean;
  archetype: string | null;
  email: string | null;
  savedDealIds: string[];
  pipelineDeals: PipelineDeal[];
  rank: number;
  roadmapProgress: number;
  buyerProfile: BuyerProfile | null;
  matchedDeals: DealMatch[] | null;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null;
  completedQuests: string[];
}

interface SessionContextType {
  session: SessionState;
  updateSession: (updates: Partial<SessionState>) => void;
  addXp: (amount: number) => void;
  completeQuest: (questId: string, xpReward: number) => void;
  updatePipelineStatus: (dealId: string, status: PipelineDeal['status']) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionState>(() => {
    const defaultState: SessionState = {
      sessionId: generateUUID(),
      assessmentAnswers: {},
      assessmentComplete: false,
      archetype: null,
      email: null,
      savedDealIds: [],
      pipelineDeals: [],
      rank: 42,
      roadmapProgress: 0,
      buyerProfile: null,
      matchedDeals: null,
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: null,
      completedQuests: []
    };

    const stored = localStorage.getItem('main_quest_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { ...defaultState, ...parsed };
      } catch (e) {
        console.error("Failed to parse session", e);
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('main_quest_session', JSON.stringify(session));
  }, [session]);

  const updateSession = (updates: Partial<SessionState>) => {
    setSession(prev => ({ ...prev, ...updates }));
  };

  const addXp = (amount: number) => {
    setSession(prev => {
      const newXp = prev.xp + amount;
      // Simple leveling logic: level = floor(xp / 1000) + 1
      const newLevel = Math.floor(newXp / 1000) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const completeQuest = (questId: string, xpReward: number) => {
    setSession(prev => {
      if (prev.completedQuests.includes(questId)) return prev;
      const newXp = prev.xp + xpReward;
      const newLevel = Math.floor(newXp / 1000) + 1;
      return { 
        ...prev, 
        xp: newXp, 
        level: newLevel, 
        completedQuests: [...prev.completedQuests, questId] 
      };
    });
  };

  const updatePipelineStatus = (dealId: string, status: PipelineDeal['status']) => {
    setSession(prev => {
      const existing = prev.pipelineDeals.find(d => d.dealId === dealId);
      if (existing) {
        return {
          ...prev,
          pipelineDeals: prev.pipelineDeals.map(d => 
            d.dealId === dealId ? { ...d, status } : d
          )
        };
      } else {
        return {
          ...prev,
          pipelineDeals: [...prev.pipelineDeals, { dealId, status, addedAt: new Date().toISOString() }]
        };
      }
    });
  };

  const clearSession = () => {
    const newSession: SessionState = {
      sessionId: generateUUID(),
      assessmentAnswers: {},
      assessmentComplete: false,
      archetype: null,
      email: null,
      savedDealIds: [],
      pipelineDeals: [],
      rank: 42,
      roadmapProgress: 0,
      buyerProfile: null,
      matchedDeals: null,
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: null,
      completedQuests: []
    };
    setSession(newSession);
  };

  return (
    <SessionContext.Provider value={{ session, updateSession, addXp, completeQuest, updatePipelineStatus, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
