import React, { useState, useEffect } from 'react';
import { questions, Question, Option } from '../data/questions';
import FadeIn from './FadeIn';

interface AssessmentToolProps {
  onComplete: (answers: Record<string, string[]>) => void;
  initialAnswers?: Record<string, string[]>;
}

export default function AssessmentTool({ onComplete, initialAnswers = {} }: AssessmentToolProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const keys = Object.keys(initialAnswers);
    return keys.length > 0 ? keys.length : -1;
  });
  const [answers, setAnswers] = useState<Record<string, string[]>>(initialAnswers);
  const [showError, setShowError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'enter' | 'exit'>('enter');

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = currentQuestionIndex >= 0 ? (currentQuestionIndex / totalQuestions) * 100 : 0;

  const handleStart = () => {
    setCurrentQuestionIndex(0);
  };

  const handleOptionClick = (optionId: string) => {
    if (!currentQuestion) return;
    
    setShowError(false);
    
    setAnswers(prev => {
      const currentAnswers = prev[currentQuestion.id] || [];
      
      if (currentQuestion.type === 'single') {
        return { ...prev, [currentQuestion.id]: [optionId] };
      } else {
        if (currentAnswers.includes(optionId)) {
          return { ...prev, [currentQuestion.id]: currentAnswers.filter(id => id !== optionId) };
        } else {
          return { ...prev, [currentQuestion.id]: [...currentAnswers, optionId] };
        }
      }
    });
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    const currentAnswers = answers[currentQuestion.id] || [];
    if (currentAnswers.length === 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setSlideDirection('exit');
    
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSlideDirection('enter');
      } else {
        startProcessing();
      }
    }, 300);
  };

  const startProcessing = () => {
    setIsProcessing(true);
    
    setTimeout(() => setProcessingStep(1), 500);
    setTimeout(() => setProcessingStep(2), 1500);
    setTimeout(() => setProcessingStep(3), 2500);
    
    setTimeout(() => {
      onComplete(answers);
    }, 3500);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg-primary)] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[600px] h-[600px] rounded-full bg-[conic-gradient(from_0deg,var(--color-accent-secondary),var(--color-accent-primary),var(--color-bg-primary))] opacity-20 animate-spin-slow blur-3xl"></div>
        </div>
        
        <div className="glass-card p-10 max-w-[640px] w-full text-center relative z-10 border-[var(--color-accent-primary)] border-opacity-50">
          <h2 className="font-display font-semibold text-[28px] mb-8 animate-pulse text-[var(--color-text-primary)]">Mapping your operator profile...</h2>
          
          <div className="space-y-4 text-left max-w-md mx-auto">
            <p className={`text-[16px] text-[var(--color-text-secondary)] transition-opacity duration-500 ${processingStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-[var(--color-accent-primary)] mr-2">✓</span> Analyzing flow state and Ikigai alignment...
            </p>
            <p className={`text-[16px] text-[var(--color-text-secondary)] transition-opacity duration-500 ${processingStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-[var(--color-accent-secondary)] mr-2">✓</span> Calibrating risk tolerance and resilience profile...
            </p>
            <p className={`text-[16px] text-[var(--color-text-secondary)] transition-opacity duration-500 ${processingStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-[var(--color-accent-success)] mr-2">✓</span> Matching to ETA business archetypes...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex === -1) {
    return (
      <div id="assessment" className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg-primary)] relative">
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-[var(--color-accent-secondary)]/10 to-transparent pointer-events-none"></div>
        
        <FadeIn className="glass-card p-8 md:p-12 max-w-[640px] w-full text-center relative z-10">
          <div className="mb-8">
            <div className="flex justify-between text-[12px] font-display uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">
              <span>Profile Completion</span>
              <span>0/12</span>
            </div>
            <div className="h-2 w-full bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] transition-all duration-600 ease-out"></div>
            </div>
          </div>

          <h2 className="font-display font-bold text-[40px] mb-4 leading-tight text-[var(--color-text-primary)]">Let's build your buyer profile.</h2>
          <p className="text-[18px] text-[var(--color-text-secondary)] mb-6">12 questions. Your business resume. Your buy box. Delivered instantly.</p>
          <p className="text-[14px] text-[var(--color-text-secondary)] mb-10">No ETA experience required. No financial documents yet. Just honest answers.</p>
          
          <button 
            onClick={handleStart}
            className="w-full md:w-auto bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-display font-semibold text-[16px] uppercase px-10 py-[18px] rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            BEGIN ASSESSMENT →
          </button>
        </FadeIn>
      </div>
    );
  }

  const currentAnswers = answers[currentQuestion.id] || [];
  const hasAnswer = currentAnswers.length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-10 px-4 bg-[var(--color-bg-primary)] relative">
      <div className="w-full max-w-[640px] mb-8">
        <div className="flex justify-between text-[12px] font-display uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">
          <span>Q{currentQuestionIndex + 1} of 12</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-[var(--color-bg-elevated)] rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] transition-all duration-600 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-[14px] font-display font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
          {currentQuestion.section}
        </div>
      </div>

      <div className={`w-full max-w-[640px] transition-all duration-300 ${slideDirection === 'enter' ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
        <div className="glass-card p-6 md:p-10 mb-6">
          <h3 className="font-display font-semibold text-[24px] md:text-[28px] mb-8 text-[var(--color-text-primary)] leading-tight">
            {currentQuestion.title}
          </h3>
          
          {currentQuestion.type === 'multi' && (
            <p className="text-[13px] text-[var(--color-text-secondary)] mb-4 italic">Select all that apply</p>
          )}

          {currentQuestion.id === 'q10' && (
            <p className="text-[13px] text-[var(--color-text-secondary)] mb-4 italic">This determines your SBA 7(a) loan range. Typically, a 10–20% down payment unlocks 5–10x in total purchasing power.</p>
          )}

          <div className={`grid gap-3 ${currentQuestion.options.length > 4 && currentQuestion.options[0].icon ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswers.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className={`
                    flex items-center text-left p-4 rounded-xl border transition-all duration-200 min-h-[48px]
                    ${isSelected 
                      ? 'bg-[var(--color-accent-primary)]/10 border-[var(--color-accent-primary)] shadow-md scale-[1.02]' 
                      : 'bg-[var(--color-bg-elevated)]/50 border-[var(--color-border-subtle)] hover:border-[var(--color-accent-secondary)]/50 hover:bg-[var(--color-bg-elevated)]'}
                  `}
                >
                  {option.icon && <span className="text-2xl mr-3">{option.icon}</span>}
                  <div className="flex flex-col">
                    <span className={`text-[16px] ${isSelected ? 'text-[var(--color-text-primary)] font-medium' : 'text-[var(--color-text-secondary)]'}`}>
                      {option.label}
                    </span>
                    {option.color && (
                      <span className={`text-[13px] mt-1 ${isSelected ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                        {option.color}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-[var(--color-accent-primary)] flex items-center justify-center">
                      <svg className="w-3 h-3 text-[var(--color-bg-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className={`
              font-display font-semibold text-[16px] uppercase px-12 py-4 rounded-xl transition-all duration-300 w-full md:w-auto
              ${hasAnswer 
                ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] shadow-lg hover:shadow-xl cursor-pointer' 
                : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] opacity-50 cursor-not-allowed'}
            `}
          >
            Next →
          </button>
          
          <div className={`mt-4 text-[var(--color-accent-warning)] text-[14px] transition-opacity duration-200 ${showError ? 'opacity-100' : 'opacity-0'}`}>
            Select at least one option to continue.
          </div>
        </div>
      </div>
    </div>
  );
}
