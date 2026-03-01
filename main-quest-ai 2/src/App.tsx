import React, { useState, useRef, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AssessmentTool from './components/AssessmentTool';
import ResultsCard from './components/ResultsCard';
import CommunityProfiles from './components/CommunityProfiles';
import AuthModal from './components/AuthModal';
import DealListingsPreview from './components/DealListingsPreview';
import EnhanceProfileModal from './components/EnhanceProfileModal';
import CampaignDashboard from './components/CampaignDashboard';
import XPToast from './components/XPToast';
import SellerSection from './components/SellerSection';
import { useSession } from './context/SessionContext';
import RoadmapSection from './components/RoadmapSection';
import AdvisorChat from './components/AdvisorChat';

export default function App() {
  const { session, updateSession } = useSession();
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(session.assessmentComplete);
  const [answers, setAnswers] = useState<Record<string, string[]>>(session.assessmentAnswers);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [xpToasts, setXpToasts] = useState<{ id: number, amount: number }[]>([]);
  
  const assessmentRef = useRef<HTMLDivElement>(null);
  const toastIdCounter = useRef(0);

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
    setAnswers(finalAnswers);
    setAssessmentCompleted(true);
    updateSession({ assessmentAnswers: finalAnswers, assessmentComplete: true });
    addXpToast(500); // Add XP for completing assessment
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)] selection:text-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl text-black">Main Quest AI</div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('deals')}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Find Deals
            </button>
            <button 
              onClick={() => scrollToSection('seller')}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              List Business
            </button>
            {isLoggedIn ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 ml-2">
                JD
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Log In
              </button>
            )}
            <button 
              onClick={handleStartAssessmentClick}
              className="bg-black text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors ml-2"
            >
              BUILD MY PROFILE →
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[rgba(10,10,15,0.95)] backdrop-blur-[20px] border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-left text-white/80 hover:text-white font-medium px-4 py-3 rounded-lg hover:bg-white/5"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('deals')}
              className="text-left text-white/80 hover:text-white font-medium px-4 py-3 rounded-lg hover:bg-white/5"
            >
              Find Deals
            </button>
            <button 
              onClick={() => scrollToSection('seller')}
              className="text-left text-white/80 hover:text-white font-medium px-4 py-3 rounded-lg hover:bg-white/5"
            >
              List Business
            </button>
            {!isLoggedIn && (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowAuthModal(true);
                }}
                className="text-left text-white/80 hover:text-white font-medium px-4 py-3 rounded-lg hover:bg-white/5"
              >
                Log In
              </button>
            )}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleStartAssessmentClick();
              }}
              className="mt-2 bg-[#15F5BA] text-black font-bold px-4 py-3 rounded-lg hover:bg-[#15F5BA]/90 transition-colors"
            >
              BUILD MY PROFILE →
            </button>
          </div>
        )}
      </header>

      <main className="pt-16">
        {session.assessmentComplete && !assessmentCompleted ? (
           <div className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-subtle)] py-4 px-4 text-center z-30 relative">
             <p className="text-[14px] text-[var(--color-text-primary)]">
               Welcome back! You're a {session.archetype || 'Buyer'}. Pick up where you left off.
               <button 
                 onClick={() => setAssessmentCompleted(true)}
                 className="ml-4 text-[var(--color-accent-primary)] font-display font-bold uppercase hover:underline"
               >
                 CONTINUE MY SEARCH →
               </button>
             </p>
           </div>
        ) : null}
        
        {Object.keys(session.assessmentAnswers).length > 0 && !session.assessmentComplete && !assessmentStarted ? (
           <div className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-subtle)] py-4 px-4 text-center z-30 relative">
             <p className="text-[14px] text-[var(--color-text-primary)]">
               You have an unfinished profile.
               <button 
                 onClick={() => {
                   setAssessmentStarted(true);
                   setTimeout(() => {
                     assessmentRef.current?.scrollIntoView({ behavior: 'smooth' });
                   }, 100);
                 }}
                 className="ml-4 text-[var(--color-accent-primary)] font-display font-bold uppercase hover:underline"
               >
                 Continue from Q{Object.keys(session.assessmentAnswers).length + 1} →
               </button>
             </p>
           </div>
        ) : null}

        {!assessmentCompleted ? (
          <>
            <LandingPage onStartAssessment={handleStartAssessmentClick} />
            
            <div id="assessment" ref={assessmentRef}>
              {assessmentStarted && (
                <AssessmentTool onComplete={handleAssessmentComplete} initialAnswers={session.assessmentAnswers} />
              )}
            </div>
            
            <SellerSection />
          </>
        ) : (
          <>
            <ResultsCard answers={answers} onEmailSubmit={() => addXpToast(250)} />
            {session.email && <RoadmapSection />}
            <DealListingsPreview onDealSave={() => addXpToast(100)} />
            <CampaignDashboard />
            <CommunityProfiles />
          </>
        )}
      </main>

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
