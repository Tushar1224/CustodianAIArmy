import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import AdSenseAd from '../components/layout/AdSenseAd';
import Footer from '../components/layout/Footer';
import NeuronBrain from '../components/NeuronBrain';

function closeOffcanvas() {
  const el = document.getElementById('homeOffcanvas');
  const instance = window.bootstrap?.Offcanvas?.getInstance(el);
  instance?.hide();
}

export default function HomePage() {
  const navigate = useNavigate();

  const allFeatures = useMemo(() => [
    {
      id: 'learn-ai',
      name: 'Learn with AI',
      icon: 'fas fa-graduation-cap',
      href: '/learn',
      status: 'working',
      description: 'Interactive programming courses with an AI tutor by your side. Python, JavaScript, React, and more — with a live code playground.',
      color: '#4dabf7',
    },
    {
      id: 'dashboard',
      name: 'AI Dashboard',
      icon: 'fas fa-brain',
      href: '/dashboard',
      status: 'working',
      description: 'Chat with a specialized army of AI agents — researchers, coders, analysts, writers, and more. Switch providers on the fly.',
      color: '#4dabf7',
    },
    {
      id: 'custom-agents',
      name: 'Custom Agents',
      icon: 'fas fa-users-cog',
      href: '/agents',
      status: 'working',
      description: 'Create, train, and publish your own AI agents. Available for all users, including the free tier, to build a personalized AI army.',
      color: '#4dabf7',
    },
    {
      id: 'build-product',
      name: 'Build Your Product',
      icon: 'fas fa-cubes',
      href: '/build',
      status: 'working',
      description: 'From idea to deployed product with an AI army. Architecture, code generation, project planning, and one-click deployment.',
      color: '#4dabf7',
    },
    {
      id: 'portfolio',
      name: 'Build Portfolio',
      icon: 'fab fa-github',
      href: '/portfolio',
      status: 'coming',
      description: 'AI-generated developer portfolios. Connect GitHub, describe yourself, and get a stunning portfolio deployed in minutes.',
      color: '#f59e0b',
    },
  ], []);

  const handleNav = (path) => (e) => {
    e.preventDefault();
    closeOffcanvas();
    navigate(path);
  };

  const handleFeatureClick = (feature) => {
    if (feature.status === 'working') {
      navigate(feature.href);
    }
  };

  const handleFeatureHover = () => {};

  const handleFeatureLeave = () => {};

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    // Close sidebar when clicking outside
    const handler = (e) => {
      const oc = document.getElementById('homeOffcanvas');
      const hb = document.querySelector('.hamburger-btn');
      if (!oc || !hb) return;
      const oi = window.bootstrap?.Offcanvas?.getInstance(oc);
      if (!oi) return;
      if (!oc.contains(e.target) && !hb.contains(e.target)) oi.hide();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e8e8f0', fontFamily: "'Exo 2', sans-serif" }}>
      {/* Offcanvas Sidebar */}
      <div className="offcanvas offcanvas-start home-offcanvas" tabIndex="-1" id="homeOffcanvas"
           data-bs-scroll="true" data-bs-backdrop="false"
           style={{ background: '#0f0f1a !important', color: '#e8e8f0 !important', borderRight: '1px solid rgba(77,171,247,0.2) !important', maxWidth: '300px !important', width: '80vw !important' }}>
        <div className="offcanvas-header" style={{ borderBottom: '1px solid rgba(77,171,247,0.15)', background: 'rgba(77,171,247,0.05)' }}>
          <h5 className="offcanvas-title" style={{ fontFamily: "'Orbitron', monospace", color: '#4dabf7', letterSpacing: '1px', fontSize: '1rem' }}>Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '0.75rem' }}>
            <a href="/" className="offcanvas-nav-link active" onClick={handleNav('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '6px', textDecoration: 'none', color: '#e8e8f0', fontSize: '0.9rem', background: 'rgba(77,171,247,0.12)', borderColor: 'rgba(77,171,247,0.4)', border: '1px solid transparent', marginBottom: '0.2rem' }}>
              <i className="fas fa-home" style={{ width: '18px', textAlign: 'center' }}></i> Home
            </a>
            {[
              { href: '/dashboard', icon: 'fas fa-brain', label: 'AI Dashboard' },
              { href: '/learn', icon: 'fas fa-graduation-cap', label: 'Learn with AI' },
              { href: '/portfolio', icon: 'fab fa-github', label: 'Build Your Portfolio' },
              { href: '/agents', icon: 'fas fa-users-cog', label: 'Custom Agents' },
              { href: '/build', icon: 'fas fa-cubes', label: 'Build Your Product' },
            ].map((item, i) => (
              <a key={i} href={item.href} className="offcanvas-nav-link" onClick={handleNav(item.href)}
                 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '6px', textDecoration: 'none', color: '#e8e8f0', border: '1px solid transparent', fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                <i className={item.icon} style={{ width: '18px', textAlign: 'center' }}></i> {item.label}
              </a>
            ))}
            <hr style={{ borderColor: 'rgba(77,171,247,0.15)', margin: '0.5rem 0' }} />
            <a href="#pricing" className="offcanvas-nav-link" onClick={handleNav('/#pricing')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '6px', textDecoration: 'none', color: '#e8e8f0', border: '1px solid transparent', fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
              <i className="fas fa-tag" style={{ width: '18px', textAlign: 'center' }}></i> Pricing
            </a>
            <a href="#coming-soon" className="offcanvas-nav-link" onClick={handleNav('/#coming-soon')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '6px', textDecoration: 'none', color: '#e8e8f0', border: '1px solid transparent', fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
              <i className="fas fa-road" style={{ width: '18px', textAlign: 'center' }}></i> Roadmap
            </a>
            <hr style={{ borderColor: 'rgba(77,171,247,0.15)', margin: '0.5rem 0' }} />
            <a href="/api/v1/auth/google" className="offcanvas-signin" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: '6px', textDecoration: 'none', color: '#000', background: '#4dabf7', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.5rem' }}>
              <i className="fab fa-google"></i> Sign In with Google
            </a>
          </nav>
        </div>
      </div>

      {/* Nav Bar */}
      <nav className="main-nav" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: '60px', background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(77,171,247,0.15)' }}>
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button type="button" className="hamburger-btn" data-bs-toggle="offcanvas" data-bs-target="#homeOffcanvas" aria-label="Open menu"
            style={{ background: 'none', border: 'none', color: '#4dabf7', fontSize: '1.4rem', cursor: 'pointer', padding: '0.25rem', lineHeight: 1 }}>
            <i className="fas fa-bars"></i>
          </button>
          <a href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', color: '#4dabf7', fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: '1rem', letterSpacing: '1px' }}>
            <i className="fas fa-robot" style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 6px #4dabf7)' }}></i>
            Custodian AI
          </a>
        </div>

        {/* Sign In */}
        <div className="dropdown" id="home-profile-dropdown">
          <a href="/api/v1/auth/google" className="nav-signin" id="home-signin-btn"
            style={{ background: '#4dabf7', color: '#000', padding: '0.45rem 1.1rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
            <i className="fab fa-google"></i> Sign In
          </a>
        </div>
      </nav>

      {/* AdSense */}
      <AdSenseAd />

      {/* Hero — full screen */}
      <section className="hero" style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden', position: 'relative', background: '#06060e' }}>
        {/* Badge + title — absolute overlay so neuron glow shows behind text */}
        <div style={{ position: 'absolute', top: '5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', pointerEvents: 'none' }}>
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(77,171,247,0.1)', border: '1px solid rgba(77,171,247,0.5)', color: '#4dabf7', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            <i className="fas fa-bolt"></i> Powered by Claude, backed up by Gemini
          </div>
          <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 900, lineHeight: 1.15, margin: 0, letterSpacing: '2px' }}>
            <span style={{ color: '#4dabf7', textShadow: '0 0 30px rgba(77,171,247,0.3), 0 0 60px rgba(77,171,247,0.2)' }}>Custodian AI</span><br />
            <span style={{ color: '#e8e8f0' }}>Army</span>
          </h1>
        </div>

        {/* Neuron Brain — fills entire hero */}
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
          <NeuronBrain
            features={allFeatures}
            onFeatureClick={handleFeatureClick}
            onFeatureHover={handleFeatureHover}
            onFeatureLeave={handleFeatureLeave}
            topOffset={80}
          />
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Features */}
      <section className="features" id="features" style={{ padding: '6rem 2rem' }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, color: '#e8e8f0', marginBottom: '0.75rem' }}>
            Explore Our <span style={{ color: '#4dabf7' }}>Neural Network</span>
          </h2>
          <div className="section-divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #4dabf7, #7c3aed)', margin: '0.75rem auto 0', borderRadius: '2px' }}></div>
          <p style={{ color: '#9090b0', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>Every feature is a neuron in your AI army. Hover over each node to learn more, then click to explore.</p>
        </div>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {allFeatures.map((f, i) => (
            <div
              key={i}
              onClick={() => f.status === 'working' && navigate(f.href)}
              className="feature-card"
              style={{
                background: f.status === 'working' ? '#12121f' : 'rgba(12, 12, 31, 0.5)',
                border: `1px solid ${f.status === 'working' ? 'rgba(77,171,247,0.3)' : 'rgba(245,158,11,0.2)'}`,
                borderRadius: '12px',
                padding: '2rem',
                textDecoration: 'none',
                color: '#e8e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = f.color;
                e.currentTarget.style.background = f.status === 'working' ? 'rgba(77,171,247,0.05)' : 'rgba(245,158,11,0.05)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = f.status === 'working' ? 'rgba(77,171,247,0.3)' : 'rgba(245,158,11,0.2)';
                e.currentTarget.style.background = f.status === 'working' ? '#12121f' : 'rgba(12, 12, 31, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {f.status === 'coming' && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.1), transparent)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <div className="feature-icon" style={{ width: '56px', height: '56px', background: `${f.color}20`, border: `1px solid ${f.color}30`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: f.color }}>
                <i className={f.icon}></i>
              </div>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', color: f.color, margin: 0 }}>
                {f.name}
              </h3>
              <p style={{ color: '#9090b0', fontSize: '0.9rem', flex: 1, margin: 0 }}>
                {f.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'space-between' }}>
                <div>
                  {f.status === 'coming' && (
                    <span className="feature-badge" style={{ fontSize: '0.7rem', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid #f59e0b', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                      Coming Soon
                    </span>
                  )}
                  {f.status === 'working' && (
                    <span className="feature-badge" style={{ fontSize: '0.7rem', background: 'rgba(77,171,247,0.15)', color: '#4dabf7', border: '1px solid #4dabf7', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                      Available
                    </span>
                  )}
                </div>
                <span className="feature-link" style={{ color: f.color, fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works" style={{ padding: '6rem 2rem', background: '#0f0f1a' }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, color: '#e8e8f0', marginBottom: '0.75rem' }}>
            How It <span style={{ color: '#4dabf7' }}>Works</span>
          </h2>
          <div className="section-divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #4dabf7, #7c3aed)', margin: '0.75rem auto 0', borderRadius: '2px' }}></div>
          <p style={{ color: '#9090b0', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>Get started in seconds. No complex setup required.</p>
        </div>
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { num: '1', title: 'Try Free', desc: 'Visit the dashboard as a guest — no account needed. Get 3 free requests instantly.' },
            { num: '2', title: 'Sign In', desc: 'Sign in with Google to unlock 20 requests/day, permanent chat history, and all AI providers.' },
            { num: '3', title: 'Build', desc: 'Choose your AI agent, pick your feature, and let your AI army do the heavy lifting.' },
          ].map((s, i) => (
            <div key={i} className="step-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div className="step-num" style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #4dabf7, #7c3aed)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', monospace", fontSize: '1.5rem', fontWeight: 900, color: '#000', margin: '0 auto 1.25rem', boxShadow: '0 0 20px rgba(77,171,247,0.3)' }}>
                {s.num}
              </div>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', color: '#4dabf7', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: '#9090b0', fontSize: '0.9rem', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing" id="pricing" style={{ padding: '6rem 2rem' }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, color: '#e8e8f0', marginBottom: '0.75rem' }}>
            Simple, <span style={{ color: '#4dabf7' }}>Transparent</span> Pricing
          </h2>
          <div className="section-divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #4dabf7, #7c3aed)', margin: '0.75rem auto 0', borderRadius: '2px' }}></div>
          <p style={{ color: '#9090b0', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>Start free. Upgrade when you need more power.</p>
        </div>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {/* Free */}
          <div className="pricing-card" style={{ background: '#12121f', border: '1px solid rgba(77,171,247,0.15)', borderRadius: '12px', padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div className="pricing-plan" style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.1rem', color: '#9090b0', marginBottom: '0.5rem' }}>Free</div>
            <div className="pricing-price" style={{ fontFamily: "'Orbitron', monospace", fontSize: '3rem', fontWeight: 900, color: '#4dabf7', marginBottom: '0.25rem' }}>
              $0 <span style={{ fontSize: '1rem', color: '#9090b0' }}>/mo</span>
            </div>
            <div className="pricing-desc" style={{ color: '#9090b0', fontSize: '0.875rem', marginBottom: '2rem' }}>Perfect for trying out the platform</div>
            <ul className="pricing-features" style={{ listStyle: 'none', textAlign: 'left', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              {['3 requests/day as guest', '20 requests/day (signed in)', 'All AI agents', 'Temporary chat history (guest)', 'Permanent chat history (signed in)', 'Gemini + Claude (signed in)', 'Learn with AI courses', 'Custom Agents Studio'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#9090b0' }}>
                  <i className="fas fa-check" style={{ color: '#10b981', width: '16px' }}></i> {f}
                </li>
              ))}
            </ul>
            <a href="/dashboard" className="pricing-btn pricing-btn-outline" style={{ width: '100%', padding: '0.875rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', textDecoration: 'none', display: 'block', textAlign: 'center', background: 'transparent', color: '#4dabf7', border: '1px solid #4dabf7' }}>
              Get Started Free
            </a>
          </div>

          {/* Pro */}
          <div className="pricing-card featured" style={{ background: '#12121f', border: '1px solid #4dabf7', borderRadius: '12px', padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', boxShadow: '0 0 40px rgba(77,171,247,0.15)' }}>
            <div className="pricing-badge" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#4dabf7', color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 1rem', borderRadius: '10px' }}>Most Popular</div>
            <div className="pricing-plan" style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.1rem', color: '#9090b0', marginBottom: '0.5rem' }}>Pro</div>
            <div className="pricing-price" style={{ fontFamily: "'Orbitron', monospace", fontSize: '3rem', fontWeight: 900, color: '#4dabf7', marginBottom: '0.25rem' }}>
              $9 <span style={{ fontSize: '1rem', color: '#9090b0' }}>/mo</span>
            </div>
            <div className="pricing-desc" style={{ color: '#9090b0', fontSize: '0.875rem', marginBottom: '2rem' }}>For power users and professionals</div>
            <ul className="pricing-features" style={{ listStyle: 'none', textAlign: 'left', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              {['50 requests/day', 'All AI agents', 'All providers (Gemini, Claude, Claude)', 'Priority processing', 'Chat history saved', 'Learn with AI + progress tracking', 'Early access to new features', 'Email support'].map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#9090b0' }}>
                  <i className="fas fa-check" style={{ color: '#10b981', width: '16px' }}></i> {f}
                </li>
              ))}
            </ul>
            <a href="/payment" className="pricing-btn pricing-btn-primary" style={{ width: '100%', padding: '0.875rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', textDecoration: 'none', display: 'block', textAlign: 'center', background: '#4dabf7', color: '#000', border: 'none' }}>
              Upgrade to Pro
            </a>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="coming-soon" id="coming-soon" style={{ padding: '6rem 2rem', background: '#0f0f1a' }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, color: '#e8e8f0', marginBottom: '0.75rem' }}>
            What's <span style={{ color: '#4dabf7' }}>Coming Next</span>
          </h2>
          <div className="section-divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #4dabf7, #7c3aed)', margin: '0.75rem auto 0', borderRadius: '2px' }}></div>
          <p style={{ color: '#9090b0', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>We're building fast. Here's what's on the roadmap.</p>
        </div>
        <div className="coming-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { icon: 'fas fa-memory', title: 'Long-Term Memory', desc: 'Agents that remember your preferences, projects, and past conversations across sessions' },
            { icon: 'fab fa-github', title: 'Portfolio Builder', desc: 'AI-generated portfolios and full product development — from idea to deployed app' },
            { icon: 'fas fa-plug', title: 'API Access', desc: 'Integrate Custodian AI agents directly into your own apps via REST API' },
            { icon: 'fas fa-sync-alt', title: 'Remote Control', desc: 'Access your laptop sessions from mobile — both devices stay in sync' },
            { icon: 'fas fa-code-branch', title: 'AI Code Review', desc: 'Paste your code and get a full review with suggestions from multiple AI agents' },
            { icon: 'fas fa-users', title: 'Team Workspaces', desc: 'Collaborate with your team using shared AI agents and project contexts' },
            { icon: 'fas fa-server', title: 'Self-Hosting', desc: 'Run the entire Custodian AI Army platform on your own infrastructure' },
          ].map((item, i) => (
            <div key={i} className="coming-card" style={{ background: '#12121f', border: '1px solid rgba(77,171,247,0.15)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', opacity: 0.75 }}>
              <i className={item.icon} style={{ fontSize: '2rem', color: '#06b6d4', marginBottom: '0.75rem', display: 'block' }}></i>
              <h4 style={{ fontSize: '0.95rem', color: '#e8e8f0', marginBottom: '0.4rem', margin: 0 }}>{item.title}</h4>
              <p style={{ fontSize: '0.8rem', color: '#9090b0', margin: '0.5rem 0' }}>{item.desc}</p>
              <span className="coming-tag" style={{ display: 'inline-block', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '10px', marginTop: '0.5rem' }}>Coming Soon</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div className="cta-inner" style={{ maxWidth: '700px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(77,171,247,0.08), rgba(124,58,237,0.08))', border: '1px solid rgba(77,171,247,0.5)', borderRadius: '16px', padding: '4rem 2rem' }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#4dabf7', marginBottom: '1rem' }}>Ready to Deploy Your AI Army?</h2>
          <p style={{ color: '#9090b0', marginBottom: '2rem' }}>Join thousands of developers, learners, and builders using Custodian AI. Start free — no credit card required.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/dashboard" className="btn-hero-primary" style={{ background: '#4dabf7', color: '#000', padding: '0.875rem 2rem', borderRadius: '4px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-rocket"></i> Start for Free
            </a>
            <a href="/api/v1/auth/google" className="btn-hero-secondary" style={{ background: 'transparent', color: '#4dabf7', border: '1px solid #4dabf7', padding: '0.875rem 2rem', borderRadius: '4px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fab fa-google"></i> Sign In with Google
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}