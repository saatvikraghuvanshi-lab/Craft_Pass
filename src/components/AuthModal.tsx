import React, { useState } from 'react';
import { User, ShieldCheck, Palette, X, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured, SupabaseUserSession, setStoredSession } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSession?: SupabaseUserSession;
  onSessionChange: (session: SupabaseUserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentSession,
  onSessionChange,
}) => {
  const activeRole = currentSession?.role || 'artisan';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'artisan' | 'verifier'>(activeRole);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRoleQuickSelect = (role: 'customer' | 'artisan' | 'verifier') => {
    let sessionData: SupabaseUserSession;
    if (role === 'artisan') {
      sessionData = {
        id: 'user-kamla-01',
        email: 'kamla.devi@bagru.artisan.in',
        role: 'artisan',
        name: 'Kamla Devi',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTm9dYmIe1k0eS7GvT-6h3Rk2lJbQpU5pGz1e7c9_V3h6aJq6rK2k_Nl8oQ4sT3v9xY7mR1w-5uL0s8',
        artisanId: 'art-kamla-devi',
      };
    } else if (role === 'verifier') {
      sessionData = {
        id: 'user-verifier-rajesh',
        email: 'rajesh.sharma@craftcouncil.gov.in',
        role: 'verifier',
        name: 'Dr. Rajesh Sharma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      };
    } else {
      sessionData = {
        id: 'user-cust-ananya',
        email: 'ananya.iyer@consciousbuyer.in',
        role: 'customer',
        name: 'Ananya Iyer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
    }
    setStoredSession(sessionData);
    onSessionChange(sessionData);
    setMessage(`Logged in as ${sessionData.name} (${role.toUpperCase()})`);
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 600);
  };

  const handleCustomAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          throw error;
        }

        const sessionData: SupabaseUserSession = {
          id: data.user?.id || 'usr-custom',
          email: data.user?.email || email,
          role: selectedRole,
          name: email.split('@')[0],
        };
        setStoredSession(sessionData);
        onSessionChange(sessionData);
      } else {
        // Fallback custom session
        const sessionData: SupabaseUserSession = {
          id: `usr-${Date.now()}`,
          email: email.trim() || 'user@craftpass.org',
          role: selectedRole,
          name: (email.split('@')[0] || selectedRole).toUpperCase(),
        };
        setStoredSession(sessionData);
        onSessionChange(sessionData);
      }

      setMessage(`Authenticated successfully!`);
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err: any) {
      setMessage(`Auth notice: ${err.message || 'Switched session'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#271811]/60 backdrop-blur-xs">
      <div className="bg-[#fff8f6] border border-[#dbc1b8] rounded-[16px] max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#88726b] hover:text-[#994422] p-1 rounded-full hover:bg-[#fff1eb]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-[#fff1eb] border border-[#dbc1b8] rounded-full text-[11px] font-bold text-[#994422] uppercase tracking-wider mb-2">
            Supabase Auth & RBAC
          </span>
          <h2 className="font-serif-display text-[26px] font-semibold text-[#271811]">
            Select Persona or Sign In
          </h2>
          <p className="text-[13px] text-[#55433c] mt-1">
            Access CraftPass as a Customer, Artisan, or GI Verifier
          </p>
        </div>

        {/* Quick Role Switcher */}
        <div className="space-y-2.5 mb-6">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#88726b]">
            Fast Demo Profiles
          </p>
          
          <button
            onClick={() => handleRoleQuickSelect('artisan')}
            className={`w-full p-3 rounded-[10px] border flex items-center justify-between text-left transition-all ${
              activeRole === 'artisan'
                ? 'border-[#994422] bg-[#fff1eb] shadow-xs'
                : 'border-[#dbc1b8] bg-white hover:bg-[#fff8f6]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#994422]/10 text-[#994422] flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#271811]">Kamla Devi (Artisan)</p>
                <p className="text-[12px] text-[#88726b]">Manage studio, upload crafts & register GI tags</p>
              </div>
            </div>
            {activeRole === 'artisan' && (
              <CheckCircle2 className="w-5 h-5 text-[#994422]" />
            )}
          </button>

          <button
            onClick={() => handleRoleQuickSelect('verifier')}
            className={`w-full p-3 rounded-[10px] border flex items-center justify-between text-left transition-all ${
              activeRole === 'verifier'
                ? 'border-[#994422] bg-[#fff1eb] shadow-xs'
                : 'border-[#dbc1b8] bg-white hover:bg-[#fff8f6]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#274c3e]/10 text-[#274c3e] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#271811]">Dr. Rajesh Sharma (GI Verifier)</p>
                <p className="text-[12px] text-[#88726b]">Review artisan dossiers, verify GI & issue certificates</p>
              </div>
            </div>
            {activeRole === 'verifier' && (
              <CheckCircle2 className="w-5 h-5 text-[#274c3e]" />
            )}
          </button>

          <button
            onClick={() => handleRoleQuickSelect('customer')}
            className={`w-full p-3 rounded-[10px] border flex items-center justify-between text-left transition-all ${
              activeRole === 'customer'
                ? 'border-[#994422] bg-[#fff1eb] shadow-xs'
                : 'border-[#dbc1b8] bg-white hover:bg-[#fff8f6]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7a766c]/10 text-[#7a766c] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#271811]">Ananya Iyer (Conscious Buyer)</p>
                <p className="text-[12px] text-[#88726b]">Explore verified crafts, view provenance & reserve</p>
              </div>
            </div>
            {activeRole === 'customer' && (
              <CheckCircle2 className="w-5 h-5 text-[#7a766c]" />
            )}
          </button>
        </div>

        {/* Optional Custom Credentials */}
        <form onSubmit={handleCustomAuth} className="border-t border-[#dbc1b8]/60 pt-4 space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#88726b]">
            Or Enter Custom Email
          </p>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#88726b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="artisan@craftpass.org"
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#dbc1b8] rounded-[8px] text-[13px] text-[#271811] focus:border-[#994422] outline-none"
            />
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#88726b] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#dbc1b8] rounded-[8px] text-[13px] text-[#271811] focus:border-[#994422] outline-none"
            />
          </div>

          <div className="flex gap-2">
            {(['customer', 'artisan', 'verifier'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`flex-1 py-1.5 rounded text-[11px] font-bold uppercase border transition-all ${
                  selectedRole === r
                    ? 'bg-[#994422] text-white border-[#994422]'
                    : 'bg-white border-[#dbc1b8] text-[#55433c]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#994422] text-white text-[13px] font-semibold rounded-[8px] hover:bg-[#b85c38] transition-colors"
          >
            {loading ? 'Authenticating...' : 'Sign In with Supabase'}
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-[12px] font-semibold text-[#994422] animate-fade-in">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
