
import { useState, useEffect } from 'react';
import { Profile } from '@/types/database';

export const useAuth = () => {
  // Mock user and profile data to bypass authentication
  const [user] = useState({
    id: 'demo-user-id',
    email: 'demo@example.com'
  });
  
  const [profile] = useState<Profile>({
    id: 'demo-user-id',
    full_name: 'Demo User',
    role: 'asha_facilitator',
    block: 'Demo Block',
    district: 'Demo District',
    state: 'Demo State',
    village: 'Demo Village',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  
  const [loading] = useState(false);

  // Mock authentication functions that do nothing
  const signIn = async (email: string, password: string) => {
    return { error: null };
  };

  const signUp = async (email: string, password: string, userData: { full_name: string, role: 'asha' | 'asha_facilitator' }) => {
    return { data: null, error: null };
  };

  const signOut = async () => {
    return { error: null };
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
