import MainLayout from '../components/layout/MainLayout';
import LoadingOverlay from '../components/shared/LoadingOverlay';

export default function DashboardPage() {
  return (
    <MainLayout
      showSubHeader={true}
      subHeaderContent={
        <>
          <div className="sub-header-stat">
            <span className="stat-label">Active Agents</span>
            <span className="stat-value" id="active-agents">0</span>
          </div>
          <div className="sub-header-divider"></div>
          <div className="sub-header-stat">
            <span className="stat-label">System Status</span>
            <span className="stat-value status-online" id="system-status">Online</span>
          </div>
          <div className="sub-header-divider"></div>
          <div className="sub-header-stat">
            <span className="stat-label">Current Provider</span>
            <span className="stat-value" id="current-provider" style={{ color: 'var(--success-color)' }}>Unknown</span>
          </div>
        </>
      }
    >
      {/* Page Header */}
      <div className="page-header-box mb-3">
        <div className="section-header mb-0">
          <h2><i className="fas fa-brain me-2"></i>Custodian AI Dashboard</h2>
          <p>Select an agent from the list to start a conversation.</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container chat-container-desktop">
        <div className="agents-top-section d-flex">
          <div className="chat-sidebar" style={{ width: '50%', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Available Agents</h3>
            <div className="agent-list" id="dashboard-agent-list"></div>
          </div>
          <div className="agent-info-panel" id="agent-info-panel" style={{ display: 'none', width: '50%', overflowY: 'auto', padding: '0.75rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)', fontFamily: "'Orbitron', monospace", fontSize: '0.85rem' }}>Agent Details</h3>
            <div className="agent-info-content">
              <h4 id="info-agent-name" style={{ color: 'var(--primary-color)', fontSize: '0.95rem' }} className="mt-1 mb-0">Agent Name</h4>
              <div className="agent-specialization mb-1" id="info-agent-spec" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Specialization</div>
              <p id="info-agent-desc" className="agent-description" style={{ fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</p>
              <div id="info-agent-usage" className="agent-usage"></div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-main" id="chat-main" style={{ flex: 1, minHeight: 0 }}>
          <div className="active-agent-banner" id="active-agent-banner" style={{ display: 'none' }}>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="badge" style={{ background: 'var(--primary-color)', color: '#000' }}><i className="fas fa-robot me-1"></i>Active Agent</span>
              <span id="active-agent-name" className="fw-bold" style={{ color: 'var(--primary-color)' }}></span>
              <span id="active-agent-spec" className="small" style={{ color: 'var(--text-secondary)' }}></span>
              <button className="btn btn-sm btn-outline-info ms-auto" data-bs-toggle="modal" data-bs-target="#agentSelectModal">
                <i className="fas fa-exchange-alt me-1"></i><span className="d-none d-sm-inline">Switch Agent</span><span className="d-inline d-sm-none">Switch</span>
              </button>
            </div>
          </div>
          <div className="chat-messages" id="chat-messages">
            <div className="welcome-message">
              <i className="fas fa-robot"></i>
              <p>Welcome to the Custodian AI Army!</p>
              <p>Select an agent to begin your conversation.</p>
              <button className="btn btn-outline-info btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#agentSelectModal"
                style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                <i className="fas fa-users me-1"></i> Click here to choose an agent
              </button>
            </div>
          </div>
          <div className="chat-options-bar d-flex align-items-center gap-2 px-3 py-2" style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(77,171,247,0.03)' }}>
            <button className="btn btn-sm btn-outline-info" data-bs-toggle="modal" data-bs-target="#mcpModal">
              <i className="fas fa-plug me-1"></i> Add MCP
            </button>
            <span className="small d-none d-sm-inline" style={{ color: 'var(--text-muted)' }}>|</span>
            <span id="active-model-display" className="small d-none" style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}
              onClick={() => window.app && window.app.openModelSelector()} title="Click to change model">
              <i className="fas fa-microchip me-1"></i><span id="active-model-name" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}></span>
            </span>
            <div className="form-check form-switch ms-auto">
              <input className="form-check-input" type="checkbox" id="incognitoToggle" />
              <label className="form-check-label small" htmlFor="incognitoToggle" style={{ color: 'var(--text-secondary)' }}>
                <i className="fas fa-user-secret"></i> Incognito
              </label>
            </div>
          </div>
          <div className="chat-input-container">
            <button id="change-agent-btn" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#agentSelectModal">
              <i className="fas fa-users"></i>
            </button>
            <div className="dropdown provider-switcher">
              <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" id="providerDropdown" title="Switch provider">
                <span id="providerDropdownIcon"><i className="fab fa-google"></i></span>
                <span id="providerDropdownLabel">Gemini</span>
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#" data-provider="gemini" onClick={() => window.app && window.app.switchToProvider('gemini')}><i className="fab fa-google me-1"></i>Gemini</a></li>
                <li><a className="dropdown-item" href="#" data-provider="anthropic" onClick={() => window.app && window.app.switchToProvider('anthropic')}><i className="fas fa-brain me-1"></i>Claude</a></li>
              </ul>
            </div>
            <textarea id="chat-input" placeholder="Type your message..." disabled rows="1"></textarea>
            <button id="send-btn" disabled>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      <LoadingOverlay visible={false} />
    </MainLayout>
  );
}