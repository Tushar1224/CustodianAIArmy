import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { path: '/', label: 'Home', icon: 'fas fa-home' },
  { path: '/dashboard', label: 'AI Dashboard', icon: 'fas fa-brain' },
  { path: '/learn', label: 'Learn with AI', icon: 'fas fa-graduation-cap' },
  { path: '/resume', label: 'Resume Optimizer', icon: 'fas fa-file-alt' },
  { path: '/portfolio', label: 'Build Your Portfolio', icon: 'fab fa-github' },
  { path: '/build', label: 'Build Your Product', icon: 'fas fa-cubes' },
  { path: '/jobs', label: 'Apply for Jobs', icon: 'fas fa-briefcase' },
  { path: '/agents', label: 'Custom Agents', icon: 'fas fa-users-cog' },
];

const bottomItems = [
  { path: '/#pricing', label: 'Pricing', icon: 'fas fa-tag' },
  { path: '/#coming-soon', label: 'Roadmap', icon: 'fas fa-road' },
];

export default function Sidebar({ id = 'sidebarOffcanvas', showPricingRoadmap = true, showHome = true }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, plan, displayName } = useAuth();
  const planLabel = { guest: 'GUEST', free: 'FREE', pro: 'PRO' }[plan] || 'FREE';
  const planColor = plan === 'pro' ? 'var(--pro)' : plan === 'free' ? 'var(--primary-color)' : 'var(--text-muted)';

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const filteredNav = showHome ? navItems : navItems.filter(n => n.path !== '/');

  const handleNav = (path) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const instance = window.bootstrap?.Offcanvas?.getInstance(el);
      instance?.hide();
    }
    navigate(path);
  };

  return (
      <div className="offcanvas offcanvas-start" tabIndex="-1" id={id}
           data-bs-scroll="true" data-bs-backdrop="false"
           style={plan === 'pro' ? { borderRight: '1px solid var(--pro-border)' } : {}}>
        {plan === 'pro' && <div style={{ height: '3px', background: 'var(--pro)', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />}
        <div className="offcanvas-header" style={plan === 'pro' ? {
          borderBottom: '1px solid var(--pro-border)',
          background: 'linear-gradient(135deg, var(--pro-glow), transparent)',
        } : {}}>
          <h5 className="offcanvas-title" style={{ color: plan === 'pro' ? 'var(--pro)' : 'var(--primary-color, #4dabf7)' }}>
            {plan === 'pro' && <i className="fas fa-crown" style={{ fontSize: '0.8rem', marginRight: '0.35rem', color: 'var(--pro)' }}></i>}
            Menu
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="px-3 py-2 d-flex align-items-center gap-2" style={{
            borderBottom: plan === 'pro' ? '1px solid var(--pro-border)' : '1px solid var(--border-color)',
            fontSize: '0.75rem', color: 'var(--text-muted)',
            background: plan === 'pro' ? 'linear-gradient(90deg, var(--pro-glow), transparent)' : 'transparent',
          }}>
            <i className="fas fa-user-circle"></i>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</span>
            <span className="badge" style={{ background: planColor, color: plan === 'pro' ? '#000' : '#fff', fontSize: '0.6rem', padding: '0.15rem 0.4rem', flexShrink: 0, boxShadow: plan === 'pro' ? '0 0 6px var(--pro-glow)' : 'none' }}>
              {plan === 'pro' && <i className="fas fa-crown" style={{ fontSize: '0.45rem', marginRight: '0.15rem' }}></i>}
              {planLabel}
            </span>
          </div>
        <nav className="nav flex-column nav-menu p-2">
          {filteredNav.map(item => {
            const active = isActive(item.path);
            return (
            <a
              key={item.path}
              href={item.path}
              className={`nav-link nav-item ${active ? 'active' : ''}`}
              onClick={handleNav(item.path)}
              style={active && plan === 'pro' ? {
                borderLeft: '3px solid var(--pro)',
                background: 'linear-gradient(90deg, var(--pro-glow), transparent)',
              } : plan === 'pro' ? {
                transition: 'all 0.15s ease',
              } : {}}
              onMouseEnter={plan === 'pro' ? (e) => { e.currentTarget.style.background = 'linear-gradient(90deg, var(--pro-glow), transparent)'; } : undefined}
              onMouseLeave={plan === 'pro' ? (e) => { e.currentTarget.style.background = ''; } : undefined}
            >
              <i className={`${item.icon} me-2`} style={active && plan === 'pro' ? { color: 'var(--pro)' } : plan === 'pro' ? { color: 'var(--text-secondary)' } : {}}></i>
              {item.label}
            </a>
            );
          })}
          {showPricingRoadmap && (
            <>
              <hr style={{ borderColor: 'var(--border-color)', margin: '0.5rem 0.75rem' }} />
              {bottomItems.map(item => (
                <a
                  key={item.path}
                  href={item.path}
                  className="nav-link nav-item"
                  onClick={handleNav(item.path)}
                >
                  <i className={`${item.icon} me-2`}></i>{item.label}
                </a>
              ))}
            </>
          )}
        </nav>
      </div>
    </div>
  );
}