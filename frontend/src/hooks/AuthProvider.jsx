import { createContext, useState, useEffect, useCallback, useContext } from 'react';

const GUEST_NAME_KEY = 'custodian_guest_name';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('custodian_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(!user);
  const [plan, setPlan] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('custodian_user'));
      return u?.plan || (u ? 'free' : 'guest');
    } catch { return 'guest'; }
  });
  const [guestName, setGuestNameState] = useState(() => localStorage.getItem(GUEST_NAME_KEY) || '');

  const setGuestName = useCallback((name) => {
    const trimmed = (name || '').trim();
    setGuestNameState(trimmed);
    if (trimmed) {
      localStorage.setItem(GUEST_NAME_KEY, trimmed);
    } else {
      localStorage.removeItem(GUEST_NAME_KEY);
    }
  }, []);

  const displayName = user ? (user.name || 'User') : (guestName || 'Guest');

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/auth/status', { credentials: 'include' });
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
        setPlan(data.user.plan || 'guest');
        localStorage.setItem('custodian_user', JSON.stringify(data.user));
      } else {
        setUser(null);
        setPlan('guest');
      }
    } catch {
      setUser(null);
      setPlan('guest');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const logout = useCallback(async () => {
    try { await fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' }); } catch {}
    localStorage.removeItem('custodian_user');
    setUser(null);
    setPlan('guest');
    window.location.href = '/';
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, plan, logout, refetch: fetchUser, guestName, setGuestName, displayName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
