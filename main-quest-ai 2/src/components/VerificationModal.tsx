import React, { useState } from 'react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
}

export default function VerificationModal({ isOpen, onClose, onVerify }: VerificationModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selfDeclaration, setSelfDeclaration] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedOption) {
      onVerify();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0A0A]/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-card w-full max-w-[700px] relative my-8 animate-badge overflow-hidden flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] z-10"
        >
          ✕
        </button>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="mb-8 mt-4 text-center">
            <h2 className="font-display font-bold text-[28px] text-[var(--color-text-primary)] mb-2">
              One step before you reach out.
            </h2>
            <p className="text-[16px] text-[var(--color-text-secondary)]">
              Sellers on Main Quest require proof of funds before buyer contact.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Option A */}
            <div 
              onClick={() => setSelectedOption('A')}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                selectedOption === 'A' 
                  ? 'border-[#15F5BA] bg-[#15F5BA]/5' 
                  : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-glass)]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                  selectedOption === 'A' ? 'border-[#15F5BA]' : 'border-[var(--color-text-secondary)]'
                }`}>
                  {selectedOption === 'A' && <div className="w-3 h-3 rounded-full bg-[#15F5BA]" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-[18px] text-[var(--color-text-primary)] mb-1">
                    Upload Bank Statement or Brokerage Statement
                  </h3>
                  <p className="text-[14px] text-[var(--color-text-secondary)] mb-4">
                    Redact account numbers — we only need the balance.
                  </p>
                  
                  {selectedOption === 'A' && (
                    <div className="border-2 border-dashed border-[var(--color-border-subtle)] rounded-xl p-6 text-center bg-[var(--color-bg-primary)]/50 hover:bg-[var(--color-bg-elevated)] transition-colors">
                      <div className="text-2xl mb-2">📄</div>
                      <p className="text-[14px] text-[var(--color-text-primary)] font-medium">Click to upload or drag and drop</p>
                      <p className="text-[12px] text-[var(--color-text-secondary)]">PDF, JPG, PNG (max 10MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Option B */}
            <div 
              onClick={() => setSelectedOption('B')}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                selectedOption === 'B' 
                  ? 'border-[#15F5BA] bg-[#15F5BA]/5' 
                  : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-glass)]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                  selectedOption === 'B' ? 'border-[#15F5BA]' : 'border-[var(--color-text-secondary)]'
                }`}>
                  {selectedOption === 'B' && <div className="w-3 h-3 rounded-full bg-[#15F5BA]" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-[18px] text-[var(--color-text-primary)] mb-1">
                    SBA Pre-Qualification Letter
                  </h3>
                  <p className="text-[14px] text-[var(--color-text-secondary)] mb-4">
                    Strongest signal to sellers. Don't have one? We'll connect you to an SBA lender in 24 hours.
                  </p>
                  
                  {selectedOption === 'B' && (
                    <div className="flex flex-col gap-4">
                      <div className="border-2 border-dashed border-[var(--color-border-subtle)] rounded-xl p-6 text-center bg-[var(--color-bg-primary)]/50 hover:bg-[var(--color-bg-elevated)] transition-colors">
                        <div className="text-2xl mb-2">📄</div>
                        <p className="text-[14px] text-[var(--color-text-primary)] font-medium">Upload SBA Letter</p>
                      </div>
                      <div className="text-center">
                        <span className="text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 block">OR</span>
                        <button className="w-full py-3 rounded-xl border border-[#836FFF] text-[#836FFF] hover:bg-[#836FFF]/10 transition-colors font-display font-medium text-[14px]">
                          GET CONNECTED TO SBA LENDERS →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Option C */}
            <div 
              onClick={() => setSelectedOption('C')}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                selectedOption === 'C' 
                  ? 'border-[#15F5BA] bg-[#15F5BA]/5' 
                  : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-glass)]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                  selectedOption === 'C' ? 'border-[#15F5BA]' : 'border-[var(--color-text-secondary)]'
                }`}>
                  {selectedOption === 'C' && <div className="w-3 h-3 rounded-full bg-[#15F5BA]" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-[18px] text-[var(--color-text-primary)] mb-1">
                    Self-Declaration (Limited Access)
                  </h3>
                  <p className="text-[14px] text-[var(--color-text-secondary)] mb-4">
                    Declare your available capital. You'll get view-only access — no direct seller contact until verified.
                  </p>
                  
                  {selectedOption === 'C' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {['Under $100K', '$100K–$250K', '$250K–$500K', '$500K–$1M', '$1M+'].map(amount => (
                        <label 
                          key={amount}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            selfDeclaration === amount 
                              ? 'border-[#15F5BA] bg-[#15F5BA]/10' 
                              : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] hover:border-[var(--color-border-glass)]'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="self-declaration"
                            className="accent-[#15F5BA] w-4 h-4"
                            checked={selfDeclaration === amount}
                            onChange={() => setSelfDeclaration(amount)}
                          />
                          <span className="text-[14px] text-[var(--color-text-primary)]">{amount}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!selectedOption || (selectedOption === 'C' && !selfDeclaration)}
            className={`w-full font-display font-semibold text-[16px] uppercase px-6 py-4 rounded-xl transition-all duration-200 ${
              selectedOption && (selectedOption !== 'C' || selfDeclaration)
                ? 'bg-[#15F5BA] text-[#0A0A0A] shadow-[0_0_15px_rgba(21,245,186,0.3)] hover:shadow-[0_0_25px_rgba(21,245,186,0.5)]'
                : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] cursor-not-allowed'
            }`}
          >
            VERIFY & UNLOCK DEAL →
          </button>
          
          <p className="text-[12px] text-[var(--color-text-secondary)] text-center mt-4">
            🔒 Documents are encrypted and never shared with sellers. Used only for access verification.
          </p>
        </div>
      </div>
    </div>
  );
}
