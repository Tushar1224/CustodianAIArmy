import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LearnPage from './pages/LearnPage';
import PortfolioPage from './pages/PortfolioPage';
import BuildPage from './pages/BuildPage';
import CustomAgentsPage from './pages/CustomAgentsPage';
import PaymentPage from './pages/PaymentPage';
import ResumePage from './pages/ResumePage';
import JobsPage from './pages/JobsPage';
import ProfileModals from './components/modals/ProfileModals';
import { useAuth } from './hooks/useAuth';

function AppShell() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const { user, loading, plan, logout, refetch } = useAuth();

  // Expose navigate globally so AuthProvider can use it for logout
  useEffect(() => {
    window.__navigate = navigate;
    return () => { window.__navigate = undefined; };
  }, [navigate]);

  const requireAuth = useCallback(() => {
    if (!user) {
      setShowLogin(true);
    }
  }, [user]);

  useEffect(() => {
    window.__requireAuth = requireAuth;
    return () => { window.__requireAuth = undefined; };
  }, [requireAuth]);

  useEffect(() => {
    const origFetch = window.fetch;
    window.fetch = async function (...args) {
      const res = await origFetch(...args);
      if (res.status === 401 && typeof args[0] === 'string' && args[0].startsWith('/api/')) {
        const clone = res.clone();
        try {
          const body = await clone.json();
          if (body.detail === 'Authentication required' || body.detail?.includes('authenticated')) {
            setTimeout(() => window.__requireAuth?.(), 100);
          }
        } catch {}
      }
      return res;
    };
    return () => { window.fetch = origFetch; };
  }, []);

  // Intercept Google sign-in links → open popup instead of full navigation
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest('a[href="/api/v1/auth/google"]');
      if (!link) return;
      e.preventDefault();
      const popup = window.open('/api/v1/auth/google', 'google-auth',
        'width=500,height=700,menubar=no,toolbar=no,location=no');
      const onMessage = (event) => {
        if (event.data?.type === 'auth-callback') {
          window.removeEventListener('message', onMessage);
          popup?.close();
          refetch();
        }
      };
      window.addEventListener('message', onMessage);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [refetch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/agents" element={<CustomAgentsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
      <ProfileModals
        show={showLogin}
        onClose={() => setShowLogin(false)}
        user={user}
        onLogout={logout}
        onRefreshUser={refetch}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}