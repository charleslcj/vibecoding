import React, { useEffect, useState } from 'react';

interface XPToastProps {
  amount: number;
  onDismiss: () => void;
  key?: string | number;
}

export default function XPToast({ amount, onDismiss }: XPToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slide up
    setIsVisible(true);
    
    // Hold for 2.5s then slide out
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for animation to finish before unmounting
      setTimeout(onDismiss, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="glass-card px-6 py-3 rounded-full border border-[#15F5BA]/30 shadow-[0_0_20px_rgba(21,245,186,0.2)] bg-[#0A0A0F]/90 backdrop-blur-xl flex items-center gap-2">
        <span className="font-display font-bold text-[20px] text-[#15F5BA]">⚡ +{amount} XP</span>
      </div>
    </div>
  );
}
