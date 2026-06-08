import { useAuth } from '../../hooks/useAuth';

export default function Header({ showSubHeader, subHeaderContent, style: customStyle, onOpenProfile }) {
  const { user, logout } = useAuth();
  const firstName = user ? (user.name || 'User').split(' ')[0] : 'Guest';

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (onOpenProfile) onOpenProfile();
  };

  return (
    <>
      <header className="header fixed-top" style={customStyle}>
        <div className="header-content">
          {/* Left: Hamburger + Logo */}
          <div className="d-flex align-items-center gap-2">
            <button className="btn-icon-only" id="hamburger-btn" type="button"
              data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas"
              aria-controls="sidebarOffcanvas" aria-label="Open menu"
              style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', padding: '0.25rem' }}>
              <i className="fas fa-bars fa-lg"></i>
            </button>
            <a href="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-robot" style={{ color: 'var(--primary-color)', fontSize: '1.3rem' }}></i>
              <span style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, color: 'var(--primary-color)', fontSize: '1rem' }}>
                Custodian AI
              </span>
            </a>
          </div>

          {/* Right: Profile Dropdown */}
          <div className="dropdown">
            <button className="btn-icon-only dropdown-toggle" type="button"
              id="userProfileDropdown" data-bs-toggle="dropdown" aria-expanded="false"
              style={{ background: 'none', border: '1px solid var(--primary-color)', borderRadius: '4px', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
              <i className="fas fa-user-circle me-1"></i>
              <span id="user-display-name" style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{firstName}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileDropdown"
              style={{ background: 'var(--secondary-bg)', border: '1px solid var(--primary-color)' }}>
              {user ? (
                <>
                  <li><span className="dropdown-item-text" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</span></li>
                  <li><span className="dropdown-item-text" style={{ fontSize: '0.75rem' }}>Plan: <strong style={{ color: 'var(--primary-color)' }}>FREE</strong></span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#" onClick={handleProfileClick}><i className="fas fa-user-edit me-2"></i>Profile & Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Logout</button></li>
                </>
              ) : (
                <>
                  <li><span className="dropdown-item-text">Guest</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="/api/v1/auth/google" style={{ color: 'var(--success-color)' }}><i className="fab fa-google me-2"></i>Sign In with Google</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>

      {/* Sub-Header */}
      {showSubHeader && subHeaderContent && (
        <div className="sub-header" style={{ top: '56px' }}>
          {subHeaderContent}
        </div>
      )}
    </>
  );
}
