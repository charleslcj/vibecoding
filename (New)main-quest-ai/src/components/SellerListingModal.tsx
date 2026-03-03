import React, { useState } from 'react';
import { saveSellerListing } from '../lib/actions/saveProfile';

interface SellerListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SellerListingModal({ isOpen, onClose }: SellerListingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    businessType: '',
    revenue: '',
    ebitda: '',
    years: '',
    location: '',
    askingPrice: '',
    ownerRole: '',
    dependencies: [] as string[],
    reason: '',
    sbaEligible: '',
    name: '',
    email: '',
    phone: '',
    agreeToVerification: false
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  
  const handleSubmit = async () => {
    if (!formData.email || !formData.name || !formData.agreeToVerification) {
      setError('Please fill in required fields and agree to verification.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await saveSellerListing(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Failed to submit listing:", err);
      setError('Failed to submit listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDependency = (dep: string) => {
    setFormData(prev => ({
      ...prev,
      dependencies: prev.dependencies.includes(dep)
        ? prev.dependencies.filter(d => d !== dep)
        : [...prev.dependencies, dep]
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0A0A]/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-card w-full max-w-[600px] relative my-8 animate-badge overflow-hidden flex flex-col max-h-[90vh]">
        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-bg-elevated)]">
            <div 
              className="h-full bg-gradient-to-r from-[#836FFF] to-[#15F5BA] transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] z-10"
        >
          ✕
        </button>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-[#15F5BA]/20 flex items-center justify-center mb-6 animate-[scaleIn_0.5s_ease-out]">
                <div className="text-[#15F5BA] text-4xl">✓</div>
              </div>
              <h3 className="font-display font-semibold text-[24px] text-[var(--color-text-primary)] mb-4">
                Your listing is under review.
              </h3>
              <p className="text-[16px] text-[var(--color-text-secondary)] mb-8 max-w-[400px]">
                We'll email you within 24 hours with your Deal Health Score and first matched buyers.
              </p>
              <button 
                onClick={onClose}
                className="px-8 py-3 rounded-xl border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors font-display font-medium"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 mt-4">
                <h2 className="font-display font-bold text-[28px] text-[var(--color-text-primary)] mb-2">
                  List Your Business
                </h2>
                <p className="text-[16px] text-[var(--color-text-secondary)]">
                  Step {step} of 3: {step === 1 ? 'Business Basics' : step === 2 ? 'Business Profile' : 'Contact & Verification'}
                </p>
              </div>

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Business Type</label>
                    <select 
                      className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                      value={formData.businessType}
                      onChange={e => setFormData({...formData, businessType: e.target.value})}
                    >
                      <option value="">Select industry...</option>
                      <option value="B2B Services">B2B Services</option>
                      <option value="Home Services">Home Services</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Tech-Enabled">Tech-Enabled</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Annual Revenue</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-[var(--color-text-secondary)]">$</span>
                        <input 
                          type="text" 
                          placeholder="0"
                          className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl pl-8 pr-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                          value={formData.revenue}
                          onChange={e => setFormData({...formData, revenue: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Annual EBITDA</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-[var(--color-text-secondary)]">$</span>
                        <input 
                          type="text" 
                          placeholder="0"
                          className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl pl-8 pr-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                          value={formData.ebitda}
                          onChange={e => setFormData({...formData, ebitda: e.target.value})}
                        />
                      </div>
                      <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">Net profit + owner salary + depreciation</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Years in Business</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 10"
                        className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                        value={formData.years}
                        onChange={e => setFormData({...formData, years: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="City, State"
                        className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Asking Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-[var(--color-text-secondary)]">$</span>
                      <input 
                        type="text" 
                        placeholder="0"
                        className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl pl-8 pr-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                        value={formData.askingPrice}
                        onChange={e => setFormData({...formData, askingPrice: e.target.value})}
                      />
                    </div>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">Typical: 2.5–4x EBITDA</p>
                  </div>

                  <button 
                    onClick={handleNext}
                    className="w-full mt-6 bg-[var(--color-accent-secondary)] text-[#0A0A0A] font-display font-semibold text-[16px] uppercase px-6 py-4 rounded-xl shadow-[0_0_15px_rgba(21,245,186,0.3)] hover:shadow-[0_0_25px_rgba(21,245,186,0.5)] transition-all duration-200"
                  >
                    NEXT →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Owner Role</label>
                    <select 
                      className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                      value={formData.ownerRole}
                      onChange={e => setFormData({...formData, ownerRole: e.target.value})}
                    >
                      <option value="">Select role...</option>
                      <option value="I run day-to-day">I run day-to-day</option>
                      <option value="Semi-absent">Semi-absent</option>
                      <option value="Fully absent">Fully absent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Key Dependencies</label>
                    <div className="space-y-2">
                      {['Customer concentration', 'Owner-dependent relationships', 'Seasonal revenue', 'Key employee risk'].map(dep => (
                        <label key={dep} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/50 cursor-pointer hover:border-[#836FFF] transition-colors">
                          <input 
                            type="checkbox" 
                            className="accent-[#836FFF] w-4 h-4"
                            checked={formData.dependencies.includes(dep)}
                            onChange={() => toggleDependency(dep)}
                          />
                          <span className="text-[14px] text-[var(--color-text-primary)]">{dep}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Reason for Selling</label>
                    <select 
                      className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                      value={formData.reason}
                      onChange={e => setFormData({...formData, reason: e.target.value})}
                    >
                      <option value="">Select reason...</option>
                      <option value="Retirement">Retirement</option>
                      <option value="New venture">New venture</option>
                      <option value="Health">Health</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">SBA Eligible?</label>
                    <select 
                      className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                      value={formData.sbaEligible}
                      onChange={e => setFormData({...formData, sbaEligible: e.target.value})}
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">3 years of clean tax returns = likely eligible</p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={handleBack}
                      className="px-6 py-4 rounded-xl border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors font-display font-medium"
                    >
                      BACK
                    </button>
                    <button 
                      onClick={handleNext}
                      className="flex-1 bg-[var(--color-accent-secondary)] text-[#0A0A0A] font-display font-semibold text-[16px] uppercase px-6 py-4 rounded-xl shadow-[0_0_15px_rgba(21,245,186,0.3)] hover:shadow-[0_0_25px_rgba(21,245,186,0.5)] transition-all duration-200"
                    >
                      NEXT →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Name</label>
                      <input 
                        type="text" 
                        placeholder="Your name"
                        className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Phone (Optional)</label>
                      <input 
                        type="tel" 
                        placeholder="Your phone"
                        className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[#836FFF]"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Documents (Optional)</label>
                    <div className="border-2 border-dashed border-[var(--color-border-subtle)] rounded-xl p-8 text-center bg-[var(--color-bg-elevated)]/30 hover:bg-[var(--color-bg-elevated)]/50 transition-colors cursor-pointer">
                      <div className="text-2xl mb-2">📄</div>
                      <p className="text-[14px] text-[var(--color-text-primary)] font-medium mb-1">Drag & drop financials, CIM, or P&L</p>
                      <p className="text-[12px] text-[var(--color-text-secondary)]">optional at this stage</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/30 cursor-pointer mt-4">
                    <input 
                      type="checkbox" 
                      className="accent-[#836FFF] w-5 h-5 mt-0.5 flex-shrink-0"
                      checked={formData.agreeToVerification}
                      onChange={e => setFormData({...formData, agreeToVerification: e.target.checked})}
                    />
                    <span className="text-[14px] text-[var(--color-text-primary)] leading-snug">
                      I agree that buyers must verify proof of funds before contacting me.
                    </span>
                  </label>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-[13px] mb-4">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="px-6 py-4 rounded-xl border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors font-display font-medium disabled:opacity-50"
                    >
                      BACK
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-[#836FFF] text-[#E6F1FF] font-display font-semibold text-[16px] uppercase px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(131,111,255,0.4)] hover:shadow-[0_0_30px_rgba(131,111,255,0.6)] transition-all duration-200 disabled:opacity-50"
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT FOR REVIEW →'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-secondary)] text-center mt-3">
                    Our team reviews all listings within 24 hours. Pre-screened deals get priority placement.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
