import React, { useState } from 'react';
import { Menu, X, Home, User, LayoutDashboard, Briefcase, Users, LogIn } from 'lucide-react';
import { useSession } from '../context/SessionContext';

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export default function Navbar({ onNavigate, currentView, isLoggedIn, onLoginClick }: NavbarProps) {
  const { session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'profile', label: 'My Profile', icon: <User className="w-5 h-5" />, requiresAuth: true },
    { id: 'dashboard', label: 'Quest Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, requiresAuth: true },
    { id: 'deals', label: 'Deal Pipeline', icon: <Briefcase className="w-5 h-5" />, requiresAuth: true },
    { id: 'community', label: 'Community Hub', icon: <Users className="w-5 h-5" /> },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <div 
            className="font-display font-bold text-xl text-black cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            Main Quest AI
          </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn && session.archetype && (
              <div className="hidden md:flex items-center gap-2 bg-[#15F5BA]/10 text-[#15F5BA] px-3 py-1 rounded-full border border-[#15F5BA]/20">
                <span className="text-[10px] font-bold uppercase tracking-widest">{session.archetype}</span>
              </div>
            )}
            
            {!isLoggedIn ? (
              <button 
                onClick={onLoginClick}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">LVL {session.level}</div>
                  <div className="text-[12px] font-bold text-black">{session.xp.toLocaleString()} XP</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#15F5BA] to-[#836FFF] flex items-center justify-center text-white text-xs font-bold">
                  {session.email ? session.email[0].toUpperCase() : 'U'}
                </div>
              </div>
            )}

            <button 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 bottom-0 w-full max-w-[320px] bg-[#0A0A0F] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
              <div className="font-display font-bold text-xl text-white">Menu</div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                const isDisabled = item.requiresAuth && !isLoggedIn;

                return (
                  <button
                    key={item.id}
                    onClick={() => !isDisabled && handleNavClick(item.id)}
                    disabled={isDisabled}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${isActive ? 'bg-[#15F5BA] text-black' : isDisabled ? 'opacity-30 cursor-not-allowed' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    <span className="font-display font-bold text-sm uppercase tracking-widest">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-10 border-t border-white/5">
              {isLoggedIn ? (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#15F5BA] to-[#836FFF] flex items-center justify-center text-white font-bold">
                    {session.email ? session.email[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm truncate max-w-[160px]">{session.email || 'User'}</div>
                    <div className="text-[10px] text-[#15F5BA] font-bold uppercase tracking-widest">LVL {session.level} Operator</div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLoginClick();
                  }}
                  className="w-full py-4 bg-[#15F5BA] text-black font-display font-bold text-sm uppercase tracking-widest rounded-xl"
                >
                  Log In / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
