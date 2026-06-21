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
  const planColor = plan === 'pro' ? 'var(--warning-color)' : plan === 'free' ? 'var(--primary-color)' : 'var(--text-muted)';

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
         data-bs-scroll="true" data-bs-backdrop="false">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" style={{ color: 'var(--primary-color, #4dabf7)' }}>Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body p-0">
        <div className="px-3 py-2 d-flex align-items-center gap-2" style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <i className="fas fa-user-circle"></i>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</span>
          <span className="badge" style={{ background: planColor, color: plan === 'pro' ? '#000' : '#fff', fontSize: '0.6rem', padding: '0.15rem 0.4rem', flexShrink: 0 }}>
            {planLabel}
          </span>
        </div>
        <nav className="nav flex-column nav-menu p-2">
          {filteredNav.map(item => (
            <a
              key={item.path}
              href={item.path}
              className={`nav-link nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={handleNav(item.path)}
            >
              <i className={`${item.icon} me-2`}></i>{item.label}
            </a>
          ))}
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