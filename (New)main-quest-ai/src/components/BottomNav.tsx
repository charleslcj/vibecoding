import React from 'react';
import { LayoutDashboard, Briefcase, Users, User } from 'lucide-react';

interface BottomNavProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function BottomNav({ onNavigate, currentView }: BottomNavProps) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" /> },
    { id: 'deals', label: 'Deals', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-6 h-6" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-6 h-6" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0F]/90 backdrop-blur-lg border-t border-white/5 md:hidden">
      <div className="flex items-center justify-around h-20 px-2">
        {items.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#15F5BA]' : 'text-gray-500'}`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-[#15F5BA]/10' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
