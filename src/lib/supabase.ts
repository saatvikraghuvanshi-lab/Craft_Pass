import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    supabase = null;
  }
}

export interface SupabaseUserSession {
  id: string;
  email: string;
  role: 'customer' | 'artisan' | 'verifier';
  name: string;
  avatar?: string;
  artisanId?: string;
}

// Fallback session state manager
export const getStoredSession = (): SupabaseUserSession => {
  const saved = localStorage.getItem('craftpass_session');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return {
    id: 'user-kamla-01',
    email: 'kamla.devi@bagru.artisan.in',
    role: 'artisan',
    name: 'Kamla Devi',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTm9dYmIe1k0eS7GvT-6h3Rk2lJbQpU5pGz1e7c9_V3h6aJq6rK2k_Nl8oQ4sT3v9xY7mR1w-5uL0s8',
    artisanId: 'art-kamla-devi',
  };
};

export const setStoredSession = (session: SupabaseUserSession) => {
  localStorage.setItem('craftpass_session', JSON.stringify(session));
};

export const clearStoredSession = () => {
  localStorage.removeItem('craftpass_session');
};
