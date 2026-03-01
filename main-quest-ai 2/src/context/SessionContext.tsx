import React, { createContext, useContext, useState, useEffect } from 'react';
import { BuyerProfile, DealMatch } from '../types';

interface SessionState {
  sessionId: string;
  assessmentAnswers: Record<string, string[]>;
  assessmentComplete: boolean;
  archetype: string | null;
  email: string | null;
  savedDealIds: string[];
  roadmapProgress: number;
  buyerProfile: BuyerProfile | null;
  matchedDeals: DealMatch[] | null;
}

interface SessionContextType {
  session: SessionState;
  updateSession: (updates: Partial<SessionState>) => void;
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
    const stored = localStorage.getItem('main_quest_session');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      sessionId: generateUUID(),
      assessmentAnswers: {},
      assessmentComplete: false,
      archetype: null,
      email: null,
      savedDealIds: [],
      roadmapProgress: 0,
      buyerProfile: null,
      matchedDeals: null
    };
  });

  useEffect(() => {
    localStorage.setItem('main_quest_session', JSON.stringify(session));
  }, [session]);

  const updateSession = (updates: Partial<SessionState>) => {
    setSession(prev => ({ ...prev, ...updates }));
  };

  const clearSession = () => {
    const newSession = {
      sessionId: generateUUID(),
      assessmentAnswers: {},
      assessmentComplete: false,
      archetype: null,
      email: null,
      savedDealIds: [],
      roadmapProgress: 0,
      buyerProfile: null,
      matchedDeals: null
    };
    setSession(newSession);
  };

  return (
    <SessionContext.Provider value={{ session, updateSession, clearSession }}>
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
