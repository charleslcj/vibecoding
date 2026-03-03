import React, { useState } from 'react';
import { Linkedin, Facebook, Instagram, X } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [step, setStep] = useState<'login' | 'onboarding'>('login');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleLinkedinLogin = () => {
    // Simulate OAuth flow
    setTimeout(() => {
      setStep('onboarding');
    }, 1000);
  };

  const handleRunScan = () => {
    setIsScanning(true);
    // Simulate AI scan
    setTimeout(() => {
      setIsScanning(false);
      onLoginSuccess();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-bg-primary)]/80 backdrop-blur-md">
      <div className="glass-card p-8 max-w-[480px] w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'login' ? (
          <div className="text-center">
            <h2 className="font-display font-bold text-3xl mb-2 text-[var(--color-text-primary)]">Welcome back</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">Sign in to access your operator profile and roadmap.</p>
            
            <button 
              onClick={handleLinkedinLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#0A66C2] text-white font-medium text-[16px] px-6 py-4 rounded-xl hover:bg-[#004182] transition-colors mb-4 shadow-sm"
            >
              <Linkedin className="w-5 h-5" />
              Sign in with LinkedIn
            </button>
            
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-[var(--color-border-subtle)]"></div>
              <span className="flex-shrink-0 mx-4 text-[var(--color-text-secondary)] text-sm">or</span>
              <div className="flex-grow border-t border-[var(--color-border-subtle)]"></div>
            </div>
            
            <button className="w-full flex items-center justify-center gap-3 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] font-medium text-[16px] px-6 py-4 rounded-xl hover:bg-[var(--color-bg-elevated)] transition-colors shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        ) : (
          <div>
            <h2 className="font-display font-bold text-2xl mb-2 text-[var(--color-text-primary)]">Enhance Your Profile</h2>
            <p className="text-[var(--color-text-secondary)] mb-6 text-sm">
              Connect your social accounts. Our AI will scan your background to deliver hyper-personalized business recommendations.
            </p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">LinkedIn Profile</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Linkedin className="h-4 w-4 text-[var(--color-text-secondary)]" />
                  </div>
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-xl focus:ring-[var(--color-accent-primary)] focus:border-[var(--color-accent-primary)] sm:text-sm text-[var(--color-text-primary)]"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Facebook Profile</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Facebook className="h-4 w-4 text-[var(--color-text-secondary)]" />
                  </div>
                  <input
                    type="text"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-xl focus:ring-[var(--color-accent-primary)] focus:border-[var(--color-accent-primary)] sm:text-sm text-[var(--color-text-primary)]"
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Instagram Profile</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Instagram className="h-4 w-4 text-[var(--color-text-secondary)]" />
                  </div>
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-xl focus:ring-[var(--color-accent-primary)] focus:border-[var(--color-accent-primary)] sm:text-sm text-[var(--color-text-primary)]"
                    placeholder="https://instagram.com/username"
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleRunScan}
              disabled={isScanning}
              className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-medium text-[16px] px-6 py-4 rounded-xl hover:opacity-90 transition-colors shadow-md disabled:opacity-70"
            >
              {isScanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-[var(--color-bg-primary)] border-t-transparent rounded-full animate-spin"></div>
                  Scanning Profiles...
                </>
              ) : (
                'Run AI Profile Scan →'
              )}
            </button>
            <button 
              onClick={onLoginSuccess}
              className="w-full mt-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
