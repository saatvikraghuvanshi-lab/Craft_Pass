import React from 'react';
import { AppView } from '../types';
import { Compass, QrCode, ShieldCheck, User } from 'lucide-react';

interface BottomNavBarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#fff8f6] border-t border-[#dbc1b8] flex justify-around items-center px-4 py-2 pb-safe shadow-lg">
      {/* Explore Tab */}
      <button
        id="mobile-tab-explore"
        onClick={() => onNavigate('explore')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
          currentView === 'explore' || currentView === 'product-detail' || currentView === 'home'
            ? 'bg-[#b85c38] text-white scale-95 shadow-sm'
            : 'text-[#55433c] hover:text-[#994422]'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[11px] font-medium mt-0.5">Explore</span>
      </button>

      {/* Verify Tab */}
      <button
        id="mobile-tab-verify"
        onClick={() => onNavigate('verify')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
          currentView === 'verify'
            ? 'bg-[#b85c38] text-white scale-95 shadow-sm'
            : 'text-[#55433c] hover:text-[#994422]'
        }`}
      >
        <QrCode className="w-5 h-5" />
        <span className="text-[11px] font-medium mt-0.5">Verify</span>
      </button>

      {/* Verifier / Queue Desk Tab */}
      <button
        id="mobile-tab-verifier-desk"
        onClick={() => onNavigate('verifier-dashboard')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
          currentView === 'verifier-dashboard'
            ? 'bg-[#b85c38] text-white scale-95 shadow-sm'
            : 'text-[#55433c] hover:text-[#994422]'
        }`}
      >
        <ShieldCheck className="w-5 h-5" />
        <span className="text-[11px] font-medium mt-0.5">Verifier</span>
      </button>

      {/* Profile / Artisan Studio Tab */}
      <button
        id="mobile-tab-profile"
        onClick={() => onNavigate('artisan-dashboard')}
        className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
          currentView === 'artisan-dashboard'
            ? 'bg-[#b85c38] text-white scale-95 shadow-sm'
            : 'text-[#55433c] hover:text-[#994422]'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[11px] font-medium mt-0.5">Studio</span>
      </button>
    </nav>
  );
};
