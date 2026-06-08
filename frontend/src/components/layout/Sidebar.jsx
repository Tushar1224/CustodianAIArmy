import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home', icon: 'fas fa-home' },
  { path: '/dashboard', label: 'AI Dashboard', icon: 'fas fa-brain' },
  { path: '/learn', label: 'Learn with AI', icon: 'fas fa-graduation-cap' },
  { path: '/portfolio', label: 'Build Your Portfolio', icon: 'fab fa-github' },
  { path: '/build', label: 'Build Your Product', icon: 'fas fa-cubes' },
  { path: '/agents', label: 'Custom Agents', icon: 'fas fa-users-cog' },
];

const bottomItems = [
  { path: '/#pricing', label: 'Pricing', icon: 'fas fa-tag' },
  { path: '/#coming-soon', label: 'Roadmap', icon: 'fas fa-road' },
];

export default function Sidebar({ id = 'sidebarOffcanvas', showPricingRoadmap = true, showHome = true }) {
  const location = useLocation();
  const navigate = useNavigate();

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
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body p-0">
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