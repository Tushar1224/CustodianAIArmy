import { useState, useEffect, useCallback } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState('guest');

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

  return { user, loading, plan, logout, refetch: fetchUser };
}