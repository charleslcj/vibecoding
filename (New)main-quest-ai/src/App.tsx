import React, { useState, useRef, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AssessmentTool from './components/AssessmentTool';
import ResultsCard from './components/ResultsCard';
import CommunityHub from './components/CommunityHub';
import AuthModal from './components/AuthModal';
import DealListingsPreview from './components/DealListingsPreview';
import EnhanceProfileModal from './components/EnhanceProfileModal';
import QuestDashboard from './components/QuestDashboard';
import DealPipeline from './components/DealPipeline';
import XPToast from './components/XPToast';
import SellerSection from './components/SellerSection';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import { useSession } from './context/SessionContext';
import AdvisorChat from './components/AdvisorChat';

export default function App() {
  const { session, updateSession } = useSession();
  const [currentView, setCurrentView] = useState<'landing' | 'profile' | 'dashboard' | 'deals' | 'pipeline' | 'community'>('landing');
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);
  const [xpToasts, setXpToasts] = useState<{ id: number, amount: number }[]>([]);
  
  const assessmentRef = useRef<HTMLDivElement>(null);
  const toastIdCounter = useRef(0);

  useEffect(() => {
    if (session.assessmentComplete && currentView === 'landing') {
      setCurrentView('profile');
    }
  }, [session.assessmentComplete]);

  const addXpToast = (amount: number) => {
    const id = toastIdCounter.current++;
    setXpToasts(prev => [...prev, { id, amount }]);
  };

  const removeXpToast = (id: number) => {
    setXpToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleStartAssessmentClick = () => {
    setShowEnhanceModal(true);
  };

  const handleEnhanceComplete = () => {
    setShowEnhanceModal(false);
    setAssessmentStarted(true);
    setTimeout(() => {
      assessmentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAssessmentComplete = (finalAnswers: Record<string, string[]>) => {
    updateSession({ assessmentAnswers: finalAnswers, assessmentComplete: true });
    addXpToast(500);
    setCurrentView('profile');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <>
            <LandingPage onStartAssessment={handleStartAssessmentClick} />
            <div id="assessment" ref={assessmentRef}>
              {assessmentStarted && (
                <AssessmentTool onComplete={handleAssessmentComplete} initialAnswers={session.assessmentAnswers} />
              )}
            </div>
            <SellerSection />
          </>
        );
      case 'profile':
        return (
          <div className="flex flex-col items-center py-10">
            <ResultsCard answers={session.assessmentAnswers} onEmailSubmit={() => addXpToast(250)} />
            <div className="mt-10 mb-20">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-[#15F5BA] text-black font-display font-bold text-lg uppercase px-12 py-5 rounded-2xl shadow-[0_0_30px_rgba(21,245,186,0.3)] hover:scale-105 transition-all"
              >
                ENTER QUEST DASHBOARD →
              </button>
            </div>
          </div>
        );
      case 'dashboard':
        return <QuestDashboard onActionComplete={addXpToast} onNavigate={(v: any) => setCurrentView(v)} />;
      case 'deals':
        return <DealListingsPreview onDealSave={() => addXpToast(100)} />;
      case 'pipeline':
        return <DealPipeline />;
      case 'community':
        return <CommunityHub />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-[var(--color-bg-primary)]">
      <Navbar 
        onNavigate={(v: any) => setCurrentView(v)} 
        currentView={currentView} 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowAuthModal(true)}
      />

      <main className="pt-16 pb-24 md:pb-0">
        {renderView()}
      </main>

      {session.assessmentComplete && (
        <BottomNav onNavigate={(v: any) => setCurrentView(v)} currentView={currentView} />
      )}

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {showEnhanceModal && (
        <EnhanceProfileModal 
          onClose={() => setShowEnhanceModal(false)}
          onComplete={handleEnhanceComplete}
        />
      )}

      {/* Global XP Toasts */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
        {xpToasts.map(toast => (
          <XPToast 
            key={toast.id} 
            amount={toast.amount} 
            onDismiss={() => removeXpToast(toast.id)} 
          />
        ))}
      </div>
      
      <AdvisorChat />
    </div>
  );
}
