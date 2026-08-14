import React, { useState } from 'react';
import { AppView } from '../types';
import { Menu, X, ShieldCheck, Compass, QrCode, ClipboardList, User, Sparkles } from 'lucide-react';
import { SupabaseUserSession } from '../lib/supabase';

interface TopNavBarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  pendingRequestsCount: number;
  currentSession?: SupabaseUserSession;
  onOpenAuth?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentView,
  onNavigate,
  pendingRequestsCount,
  currentSession,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeRole = currentSession?.role || 'artisan';

  const handleNav = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="top-nav"
      className="sticky top-0 z-40 w-full bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#dbc1b8]/40 transition-shadow duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-3.5 flex items-center justify-between relative">
        {/* Left Side: Mobile Menu toggle & Desktop links */}
        <div className="flex items-center gap-4">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden text-[#55433c] hover:text-[#994422] p-1.5 rounded transition-colors active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-6 text-[14px] font-semibold tracking-wide">
            <button
              id="nav-home-btn"
              onClick={() => handleNav('home')}
              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#994422] border-[#994422] font-bold'
                  : 'text-[#55433c] border-transparent hover:text-[#994422]'
              }`}
            >
              Manifesto
            </button>
            <button
              id="nav-explore-btn"
              onClick={() => handleNav('explore')}
              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                currentView === 'explore' || currentView === 'product-detail'
                  ? 'text-[#994422] border-[#994422] font-bold'
                  : 'text-[#55433c] border-transparent hover:text-[#994422]'
              }`}
            >
              Explore
            </button>
            <button
              id="nav-verify-btn"
              onClick={() => handleNav('verify')}
              className={`pb-1 border-b-2 transition-all cursor-pointer ${
                currentView === 'verify'
                  ? 'text-[#994422] border-[#994422] font-bold'
                  : 'text-[#55433c] border-transparent hover:text-[#994422]'
              }`}
            >
              Verify Record
            </button>
            <button
              id="nav-verifier-queue-btn"
              onClick={() => handleNav('verifier-dashboard')}
              className={`pb-1 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'verifier-dashboard'
                  ? 'text-[#994422] border-[#994422] font-bold'
                  : 'text-[#55433c] border-transparent hover:text-[#994422]'
              }`}
            >
              <span>Verifier Desk</span>
              {pendingRequestsCount > 0 && (
                <span className="bg-[#b85c38] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {pendingRequestsCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Center: Brand Title in EB Garamond Display */}
        <div
          onClick={() => handleNav('home')}
          className="font-serif-display text-[26px] md:text-[32px] text-[#994422] tracking-tight cursor-pointer absolute left-1/2 -translate-x-1/2 font-medium hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          <span>CraftPass</span>
        </div>

        {/* Right Side: Role Badge + Sign In / Persona Switcher */}
        <div className="flex items-center space-x-2.5">
          <button
            id="nav-artisan-dashboard-btn"
            onClick={() => handleNav('artisan-dashboard')}
            className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border transition-all text-[13px] font-semibold ${
              currentView === 'artisan-dashboard'
                ? 'bg-[#b85c38] text-white border-[#b85c38]'
                : 'border-[#dbc1b8] text-[#271811] hover:border-[#994422] hover:bg-[#fff1eb]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Studio</span>
          </button>

          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#fff1eb] border border-[#dbc1b8] text-[#994422] hover:border-[#994422] transition-all text-[12px] font-bold shadow-xs cursor-pointer"
              title="Switch User Role / Supabase Auth"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#994422]" />
              <span className="capitalize">{activeRole}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fff8f6] border-b border-[#dbc1b8] px-6 py-4 space-y-3 shadow-lg">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left py-2 font-medium flex items-center justify-between ${
              currentView === 'home' ? 'text-[#994422] font-bold' : 'text-[#271811]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#994422]" />
              Manifesto & About
            </span>
          </button>
          <button
            onClick={() => handleNav('explore')}
            className={`w-full text-left py-2 font-medium flex items-center justify-between ${
              currentView === 'explore' ? 'text-[#994422] font-bold' : 'text-[#271811]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-[#994422]" />
              Explore Crafts
            </span>
          </button>
          <button
            onClick={() => handleNav('verify')}
            className={`w-full text-left py-2 font-medium flex items-center justify-between ${
              currentView === 'verify' ? 'text-[#994422] font-bold' : 'text-[#271811]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <QrCode className="w-4 h-4 text-[#994422]" />
              Digital Provenance Certificate
            </span>
          </button>
          <button
            onClick={() => handleNav('verifier-dashboard')}
            className={`w-full text-left py-2 font-medium flex items-center justify-between ${
              currentView === 'verifier-dashboard' ? 'text-[#994422] font-bold' : 'text-[#271811]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ClipboardList className="w-4 h-4 text-[#994422]" />
              Verifier Registry Queue
              {pendingRequestsCount > 0 && (
                <span className="bg-[#b85c38] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                  {pendingRequestsCount}
                </span>
              )}
            </span>
          </button>
          <button
            onClick={() => handleNav('artisan-dashboard')}
            className={`w-full text-left py-2 font-medium flex items-center justify-between ${
              currentView === 'artisan-dashboard' ? 'text-[#994422] font-bold' : 'text-[#271811]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-[#994422]" />
              Artisan Studio (Kamla Devi)
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
