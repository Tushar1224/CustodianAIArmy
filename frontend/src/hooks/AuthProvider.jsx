import { createContext, useState, useEffect, useCallback, useContext } from 'react';

const GUEST_NAME_KEY = 'custodian_guest_name';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('custodian_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('custodian_user'));
      const p = u?.plan || (u ? 'free' : 'guest');
      console.log('[Auth] Initial plan from localStorage:', p, u?.email || 'no-email');
      return p;
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
        console.log('[Auth] fetchUser: server authenticated, plan:', data.user.plan);
        setUser(data.user);
        setPlan(data.user.plan || 'guest');
        localStorage.setItem('custodian_user', JSON.stringify(data.user));
      } else {
        console.log('[Auth] fetchUser: server unauthenticated, checking localStorage');
        const localRaw = localStorage.getItem('custodian_user');
        if (localRaw) {
          try {
            const localUser = JSON.parse(localRaw);
            if (localUser?.email) {
              console.log('[Auth] fetchUser: localStorage fallback user:', localUser.email, 'plan:', localUser.plan);
              setUser(localUser);
              // Try to get the real plan from backend (PostgreSQL has the truth)
              try {
                const cfg = await fetch(`/api/v1/payment/config?email=${encodeURIComponent(localUser.email)}`);
                if (cfg.ok) {
                  const cfgData = await cfg.json();
                  if (cfgData.plan) {
                    console.log('[Auth] fetchUser: real plan from /payment/config:', cfgData.plan);
                    setPlan(cfgData.plan);
                    localUser.plan = cfgData.plan;
                    localStorage.setItem('custodian_user', JSON.stringify(localUser));
                    return;
                  }
                }
              } catch {}
              console.log('[Auth] fetchUser: /payment/config failed, keeping localStorage plan:', localUser.plan);
              setPlan(localUser.plan || 'free');
              return;
            }
          } catch {}
        }
        console.log('[Auth] fetchUser: no localStorage user, setting guest');
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
    if (window.__navigate) window.__navigate('/');
  }, []);

  const handlePopupAuth = useCallback(async (userData) => {
    console.log('[Auth] handlePopupAuth: received userData with plan:', userData.plan, userData.email);
    localStorage.setItem('custodian_user', JSON.stringify(userData));
    setUser(userData);
    let resolvedPlan = userData.plan || 'free';
    try {
      if (userData.email) {
        const cfg = await fetch(`/api/v1/payment/config?email=${encodeURIComponent(userData.email)}`);
        if (cfg.ok) {
          const cfgData = await cfg.json();
          if (cfgData.plan) {
            console.log('[Auth] handlePopupAuth: real plan from /payment/config:', cfgData.plan);
            resolvedPlan = cfgData.plan;
          }
        }
      }
    } catch {}
    console.log('[Auth] handlePopupAuth: setting plan to:', resolvedPlan);
    setPlan(resolvedPlan);
    if (resolvedPlan !== (userData.plan || 'free')) {
      userData.plan = resolvedPlan;
      localStorage.setItem('custodian_user', JSON.stringify(userData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, plan, logout, refetch: fetchUser, guestName, setGuestName, displayName, handlePopupAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
