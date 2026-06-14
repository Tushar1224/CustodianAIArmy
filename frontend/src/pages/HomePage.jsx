import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import ProfileModals from '../components/modals/ProfileModals';
import AdSenseAd from '../components/layout/AdSenseAd';
import Footer from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleCloseProfile = useCallback(() => setShowProfile(false), []);
  const handleOpenProfile = useCallback(() => setShowProfile(true), []);

  const allFeatures = useMemo(() => [
    {
      id: 'learn-ai',
      name: 'Learn with AI',
      icon: 'fas fa-graduation-cap',
      href: '/learn',
      status: 'working',
      description: 'Interactive programming courses with an AI tutor by your side. Python, JavaScript, React, and more — with a live code playground.',
      color: '#4dabf7',
      gradient: 'linear-gradient(135deg, #4dabf7, #3b8ad9)',
    },
    {
      id: 'resume',
      name: 'Resume Optimizer',
      icon: 'fas fa-file-alt',
      href: '/resume',
      status: 'working',
      description: 'Build ATS-optimized resumes with AI. Upload, edit, optimize with JD matching, and get scores above 90.',
      color: '#4dabf7',
      gradient: 'linear-gradient(135deg, #4dabf7, #3b8ad9)',
    },
    {
      id: 'build-product',
      name: 'Build Your Product',
      icon: 'fas fa-cubes',
      href: '/build',
      status: 'working',
      description: 'From idea to deployed product with an AI army. Architecture, code generation, project planning, and one-click deployment.',
      color: '#4dabf7',
      gradient: 'linear-gradient(135deg, #4dabf7, #3b8ad9)',
    },
    {
      id: 'dashboard',
      name: 'AI Dashboard',
      icon: 'fas fa-brain',
      href: '/dashboard',
      status: 'working',
      description: 'Chat with a specialized army of AI agents — researchers, coders, analysts, writers, and more. Switch providers on the fly.',
      color: '#4dabf7',
      gradient: 'linear-gradient(135deg, #4dabf7, #3b8ad9)',
    },
    {
      id: 'custom-agents',
      name: 'Custom Agents',
      icon: 'fas fa-users-cog',
      href: '/agents',
      status: 'working',
      description: 'Create, train, and publish your own AI agents. Available for all users, including the free tier, to build a personalized AI army.',
      color: '#4dabf7',
      gradient: 'linear-gradient(135deg, #4dabf7, #3b8ad9)',
    },
    {
      id: 'jobs',
      name: 'Apply for Jobs',
      icon: 'fas fa-briefcase',
      href: '/jobs',
      status: 'coming',
      description: 'AI-powered job search assistant that matches your resume, finds relevant positions, and auto-tailors applications.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    },
    {
      id: 'portfolio',
      name: 'Build Portfolio',
      icon: 'fab fa-github',
      href: '/portfolio',
      status: 'coming',
      description: 'AI-generated developer portfolios. Connect GitHub, describe yourself, and get a stunning portfolio deployed in minutes.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    },
  ], []);

  const handleFeatureClick = (feature) => {
    if (feature.status === 'working') {
      navigate(feature.href);
    }
  };

  return (
    <div style={{ background: '#f0f5ff', minHeight: '100vh', color: '#1a2332', fontFamily: "'Exo 2', sans-serif" }}>
      <Sidebar id="sidebarOffcanvas" showHome={false} />
      <Header onOpenProfile={handleOpenProfile} />
      <ProfileModals show={showProfile} onClose={handleCloseProfile} user={user} onLogout={logout} />
      <AdSenseAd />

      {/* ─── Hero Banner ─── */}
      <section style={{ padding: '6rem 2rem 2rem', background: 'linear-gradient(180deg, #dce8f8 0%, #e8f0fe 50%, #f0f5ff 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(77,171,247,0.1)', border: '1px solid rgba(77,171,247,0.4)', color: '#4dabf7', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>
              <i className="fas fa-bolt"></i> Powered by Claude & Gemini
            </div>
            <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 1rem', letterSpacing: '1px' }}>
              <span style={{ color: '#4dabf7' }}>Custodian AI</span><br />
              <span style={{ color: '#1a2332' }}>Army</span>
            </h1>
            <p style={{ color: '#5a6a7a', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your student-friendly AI platform for learning, building, and creating. 
              Chat with specialized agents, build products, optimize resumes, and more — all in one place.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/dashboard')} style={{ background: '#4dabf7', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(77,171,247,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(77,171,247,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(77,171,247,0.3)'; }}>
                <i className="fas fa-rocket"></i> Start Free
              </button>
              <a href="/api/v1/auth/google" style={{ background: 'transparent', color: '#4dabf7', border: '2px solid #4dabf7', padding: '0.75rem 1.75rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(77,171,247,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                <i className="fab fa-google"></i> Sign In
              </a>
            </div>
          </div>
          <div style={{ flex: '0 0 280px', textAlign: 'center' }}>
            <div style={{ width: '260px', height: '260px', background: 'linear-gradient(135deg, rgba(77,171,247,0.12), rgba(124,58,237,0.08))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(77,171,247,0.2)', position: 'relative' }}>
              <i className="fas fa-robot" style={{ fontSize: '6rem', color: '#4dabf7', opacity: 0.8 }}></i>
              <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(77,171,247,0.1)', animation: 'pulseRing 3s ease-in-out infinite' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#1a2332', marginBottom: '0.5rem' }}>
            Everything You Need
          </h2>
          <div style={{ width: '50px', height: '3px', background: '#4dabf7', margin: '0.75rem auto', borderRadius: '2px' }}></div>
          <p style={{ color: '#5a6a7a', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>Seven powerful tools to supercharge your learning, building, and career journey.</p>
        </div>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {allFeatures.map((f, i) => (
            <div
              key={i}
              onClick={() => f.status === 'working' && navigate(f.href)}
              style={{
                background: '#ffffff',
                border: `1px solid ${f.status === 'working' ? 'rgba(77,171,247,0.2)' : 'rgba(245,158,11,0.2)'}`,
                borderRadius: '16px',
                padding: '2rem',
                cursor: f.status === 'working' ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(77,171,247,0.08)',
                opacity: f.status === 'coming' ? 0.85 : 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = f.color;
                e.currentTarget.style.boxShadow = `0 8px 30px ${f.color}20`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = f.status === 'working' ? 'rgba(77,171,247,0.2)' : 'rgba(245,158,11,0.2)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(77,171,247,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '56px', height: '56px',
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}30`,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', color: f.color, flexShrink: 0,
                }}>
                  <i className={f.icon}></i>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', color: '#1a2332', margin: '0 0 0.25rem' }}>
                    {f.name}
                  </h3>
                  {f.status === 'working' ? (
                    <span style={{ fontSize: '0.7rem', background: 'rgba(77,171,247,0.1)', color: '#4dabf7', padding: '0.15rem 0.5rem', borderRadius: '8px', fontWeight: 600 }}>Available</span>
                  ) : (
                    <span style={{ fontSize: '0.7rem', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', padding: '0.15rem 0.5rem', borderRadius: '8px', fontWeight: 600 }}>Coming Soon</span>
                  )}
                </div>
              </div>
              <p style={{ color: '#5a6a7a', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1rem', flex: 1 }}>
                {f.description}
              </p>
              {f.status === 'working' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4dabf7', fontSize: '0.85rem', fontWeight: 600 }}>
                  Explore <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section style={{ padding: '4rem 2rem', background: '#e8f0fe' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#1a2332', marginBottom: '0.5rem' }}>
            How It <span style={{ color: '#4dabf7' }}>Works</span>
          </h2>
          <div style={{ width: '50px', height: '3px', background: '#4dabf7', margin: '0.75rem auto', borderRadius: '2px' }}></div>
          <p style={{ color: '#5a6a7a', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>Get started in seconds. No complex setup required.</p>
        </div>
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { num: '1', title: 'Try Free', desc: 'Visit the dashboard as a guest — no account needed. Get 3 free requests instantly.' },
            { num: '2', title: 'Sign In', desc: 'Sign in with Google to unlock 20 requests/day, permanent chat history, and all AI providers.' },
            { num: '3', title: 'Build', desc: 'Choose your AI agent, pick your feature, and let your AI army do the heavy lifting.' },
          ].map((s, i) => (
            <div key={i} className="step-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #4dabf7, #3b8ad9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', monospace", fontSize: '1.3rem', fontWeight: 900, color: '#fff', margin: '0 auto 1.25rem', boxShadow: '0 4px 14px rgba(77,171,247,0.3)' }}>
                {s.num}
              </div>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', color: '#1a2332', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: '#5a6a7a', fontSize: '0.9rem', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#1a2332', marginBottom: '0.5rem' }}>
            Simple, <span style={{ color: '#4dabf7' }}>Transparent</span> Pricing
          </h2>
          <div style={{ width: '50px', height: '3px', background: '#4dabf7', margin: '0.75rem auto', borderRadius: '2px' }}></div>
          <p style={{ color: '#5a6a7a', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>Start free. Upgrade when you need more power.</p>
        </div>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: '#ffffff', border: '1px solid rgba(77,171,247,0.2)', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: '0 2px 12px rgba(77,171,247,0.08)' }}>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.1rem', color: '#5a6a7a', marginBottom: '0.5rem' }}>Free</div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '3rem', fontWeight: 900, color: '#4dabf7', marginBottom: '0.25rem' }}>
              $0 <span style={{ fontSize: '1rem', color: '#8a9aaa' }}>/mo</span>
            </div>
            <div style={{ color: '#8a9aaa', fontSize: '0.875rem', marginBottom: '2rem' }}>Perfect for trying out the platform</div>
            <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              {['3 requests/day as guest', '20 requests/day (signed in)', 'All AI agents', 'Temporary chat history (guest)', 'Permanent chat history (signed in)', 'Gemini + Claude (signed in)', 'Learn with AI courses', 'Custom Agents Studio'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#5a6a7a' }}>
                  <i className="fas fa-check" style={{ color: '#10b981', width: '16px' }}></i> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', background: 'transparent', color: '#4dabf7', border: '2px solid #4dabf7', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(77,171,247,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
              Get Started Free
            </button>
          </div>

          <div style={{ background: '#ffffff', border: '2px solid #4dabf7', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', boxShadow: '0 4px 24px rgba(77,171,247,0.15)' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#4dabf7', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 1rem', borderRadius: '10px' }}>Most Popular</div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.1rem', color: '#5a6a7a', marginBottom: '0.5rem' }}>Pro</div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '3rem', fontWeight: 900, color: '#4dabf7', marginBottom: '0.25rem' }}>
              $9 <span style={{ fontSize: '1rem', color: '#8a9aaa' }}>/mo</span>
            </div>
            <div style={{ color: '#8a9aaa', fontSize: '0.875rem', marginBottom: '2rem' }}>For power users and professionals</div>
            <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              {['50 requests/day', 'All AI agents', 'All providers (Gemini, Claude)', 'Priority processing', 'Chat history saved', 'Unlimited resume storage', 'Learn with AI + progress tracking', 'Early access to new features', 'Email support'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#5a6a7a' }}>
                  <i className="fas fa-check" style={{ color: '#10b981', width: '16px' }}></i> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/payment')} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', background: '#4dabf7', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(77,171,247,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(77,171,247,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(77,171,247,0.3)'; }}>
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>

      {/* ─── Coming Next ─── */}
      <section style={{ padding: '4rem 2rem', background: '#e8f0fe' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#1a2332', marginBottom: '0.5rem' }}>
            What's <span style={{ color: '#4dabf7' }}>Coming Next</span>
          </h2>
          <div style={{ width: '50px', height: '3px', background: '#4dabf7', margin: '0.75rem auto', borderRadius: '2px' }}></div>
          <p style={{ color: '#5a6a7a', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>The next major features we're building for you.</p>
        </div>
        <div className="coming-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ background: '#ffffff', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 12px rgba(77,171,247,0.08)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #f59e0b, #d97706)' }}></div>
            <i className="fas fa-briefcase" style={{ fontSize: '3rem', color: '#f59e0b', marginBottom: '1rem', display: 'block' }}></i>
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.1rem', color: '#1a2332', marginBottom: '0.75rem' }}>Apply for Jobs with AI</h3>
            <p style={{ color: '#5a6a7a', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
              AI-powered job search assistant that matches your resume, finds relevant positions, 
              and auto-tailors applications — all from your profile.
            </p>
            <span style={{ display: 'inline-block', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', fontSize: '0.75rem', padding: '0.2rem 0.75rem', borderRadius: '10px', fontWeight: 600 }}>Coming Soon</span>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 12px rgba(77,171,247,0.08)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #f59e0b, #d97706)' }}></div>
            <i className="fas fa-layer-group" style={{ fontSize: '3rem', color: '#f59e0b', marginBottom: '1rem', display: 'block' }}></i>
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.1rem', color: '#1a2332', marginBottom: '0.75rem' }}>Build for Portfolio</h3>
            <p style={{ color: '#5a6a7a', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
              Generate complete portfolio-worthy projects with AI from idea to deployment — 
              full-stack apps, sites, and tools you can showcase to employers.
            </p>
            <span style={{ display: 'inline-block', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', fontSize: '0.75rem', padding: '0.2rem 0.75rem', borderRadius: '10px', fontWeight: 600 }}>Coming Soon</span>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(77,171,247,0.08), rgba(124,58,237,0.06))', border: '1px solid rgba(77,171,247,0.3)', borderRadius: '20px', padding: '4rem 2rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#4dabf7', marginBottom: '1rem' }}>Ready to Build Your AI Army?</h2>
          <p style={{ color: '#5a6a7a', marginBottom: '2rem', fontSize: '1rem' }}>Join thousands of learners and builders using Custodian AI. Start free — no credit card required.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: '#4dabf7', color: '#fff', padding: '0.875rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(77,171,247,0.3)' }}>
              <i className="fas fa-rocket"></i> Start for Free
            </button>
            <a href="/api/v1/auth/google" style={{ background: 'transparent', color: '#4dabf7', border: '2px solid #4dabf7', padding: '0.875rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fab fa-google"></i> Sign In with Google
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
