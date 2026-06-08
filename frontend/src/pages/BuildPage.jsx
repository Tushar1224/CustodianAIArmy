import MainLayout from '../components/layout/MainLayout';

export default function BuildPage() {
  return (
    <MainLayout>
      <div className="mvp-builder-container" style={{ display: 'flex', gap: '1rem', height: 'calc(100vh - 70px)' }}>
        {/* Left Panel */}
        <div className="left-panel" style={{ width: '320px', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto' }}>
          <div className="phase-indicator" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.75rem', background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
            {['Ideation', 'Planning', 'Review', 'Polish', 'Build'].map((phase, i) => (
              <div key={phase} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <div className="phase-step" style={{ textAlign: 'center' }}>
                  <div className="phase-number" style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary-color)', color: '#000', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>{i + 1}</div>
                  <div className="phase-label" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{phase}</div>
                </div>
                {i < 4 && <i className="fas fa-chevron-right" style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}></i>}
              </div>
            ))}
          </div>

          <div className="mode-toggle" style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="mode-btn active" data-mode="plan" style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--primary-color)', borderRadius: '6px', background: 'var(--primary-color)', color: '#000', fontWeight: 600, cursor: 'pointer' }}><i className="fas fa-comments"></i> Plan</button>
            <button className="mode-btn" data-mode="act" style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}><i className="fas fa-bolt"></i> Act</button>
          </div>

          <div className="agent-cli-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="cli-header" style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span className="cli-title"><i className="fas fa-terminal"></i> Agent Console</span>
              <span className="cli-status" id="agent-status"><i className="fas fa-circle text-success"></i> Ready</span>
            </div>
            <div className="cli-output" id="cli-output" style={{ flex: 1, padding: '0.75rem', overflowY: 'auto', fontSize: '0.85rem', fontFamily: "'Fira Code', monospace", color: 'var(--text-secondary)' }}>
              <div className="cli-welcome">
                <div style={{ fontWeight: 700, color: 'var(--primary-color)' }}>🚀 Welcome to MVP Builder</div>
                <div className="mt-2">Your AI army will guide you through 5 phases</div>
                <div className="mt-2">💡 <strong>Plan Mode:</strong> Discuss your idea</div>
                <div>⚡ <strong>Act Mode:</strong> Watch agents build</div>
              </div>
            </div>
            <div className="cli-input-container" style={{ padding: '0.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
              <textarea id="cli-input" placeholder="Describe your product idea..." rows="2" style={{ flex: 1, background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', padding: '0.5rem', fontSize: '0.85rem', resize: 'none' }}></textarea>
              <button className="send-btn" id="send-btn" style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><i className="fas fa-paper-plane"></i></button>
            </div>
          </div>

          <div className="github-panel" style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="github-connect-btn" id="github-connect-btn" style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}><i className="fab fa-github"></i> Connect GitHub</button>
            <button className="github-publish-btn" id="github-publish-btn" disabled style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'var(--tertiary-bg)', color: 'var(--text-muted)', cursor: 'not-allowed' }}><i className="fas fa-upload"></i> Publish</button>
          </div>
        </div>

        {/* Main Panel */}
        <div className="main-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div className="workspace-toolbar" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
            <button className="toolbar-btn" id="new-project-btn" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><i className="fas fa-plus"></i> New Project</button>
            <button className="toolbar-btn" id="open-folder-btn" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><i className="fas fa-folder-open"></i> Open Folder</button>
            <span className="project-name" id="project-name" style={{ flex: 1, textAlign: 'center', color: 'var(--text-primary)', fontWeight: 600 }}>Untitled Project</span>
            <button className="toolbar-btn" id="run-preview-btn" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><i className="fas fa-play"></i> Preview</button>
            <button className="toolbar-btn" id="download-zip-btn" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><i className="fas fa-download"></i> Download</button>
          </div>
          <div className="workspace-content" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div className="file-explorer" id="file-explorer" style={{ width: '200px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
              <div className="explorer-header" style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}><span><i className="fas fa-folder"></i> EXPLORER</span></div>
              <div className="file-tree" id="file-tree" style={{ flex: 1, padding: '0.5rem', overflowY: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div className="empty-state">No files yet. Start by describing your product idea!</div>
              </div>
            </div>
            <div className="editor-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="editor-tabs" id="editor-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--tertiary-bg)' }}>
                <div className="tab active" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRight: '1px solid var(--border-color)', color: 'var(--primary-color)' }}><span>Welcome</span><button className="tab-close" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', marginLeft: '0.5rem', cursor: 'pointer' }}><i className="fas fa-times"></i></button></div>
              </div>
              <div className="editor-content" id="editor-content" style={{ flex: 1, padding: '2rem', overflowY: 'auto', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }}><i className="fas fa-rocket"></i></div>
                <h2 style={{ color: 'var(--primary-color)' }}>Build Your Product with AI</h2>
                <p>Describe your product idea in the agent console on the left, and watch as our AI army builds it through 5 phases.</p>
                <ol style={{ textAlign: 'left', maxWidth: '400px', margin: '1rem auto' }}>
                  <li><strong>Ideation:</strong> Refine your concept</li>
                  <li><strong>Planning:</strong> Architecture & tech stack</li>
                  <li><strong>Review:</strong> Validate the approach</li>
                  <li><strong>Polish:</strong> UX improvements</li>
                  <li><strong>Build:</strong> Generate production code</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel" style={{ width: '280px', minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto' }}>
          <div className="progress-panel" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="panel-header" style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}><span><i className="fas fa-chart-line"></i> Progress</span></div>
            <div className="progress-content" id="progress-content" style={{ padding: '0.75rem' }}>
              <div className="current-phase"><span className="phase-badge" style={{ fontSize: '0.7rem', color: 'var(--primary-color)' }}>Current Phase</span><h4 id="current-phase-name" style={{ margin: '0.25rem 0', color: 'var(--text-primary)' }}>Not Started</h4></div>
              <div className="progress-bar-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <div className="progress-bar" id="overall-progress" style={{ flex: 1, height: '6px', background: 'var(--tertiary-bg)', borderRadius: '3px', overflow: 'hidden' }}><div className="progress-fill" style={{ width: '0%', height: '100%', background: 'var(--primary-color)', borderRadius: '3px' }}></div></div>
                <span className="progress-percent" id="progress-percent" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>0%</span>
              </div>
              <div className="phase-tasks" id="phase-tasks" style={{ marginTop: '0.5rem' }}></div>
            </div>
          </div>

          <div className="architect-panel" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="panel-header" style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}><span><i className="fas fa-drafting-compass"></i> Architect View</span></div>
            <div className="architect-content" id="architect-content" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <i className="fas fa-drafting-compass" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
              <p style={{ fontSize: '0.85rem' }}>Architecture details will appear here</p>
            </div>
          </div>

          <div className="terminal-panel" style={{ flex: 1, background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="panel-header" style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between' }}>
              <span><i className="fas fa-terminal"></i> Build Logs</span>
              <button className="clear-btn" id="clear-logs-btn" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><i className="fas fa-trash"></i></button>
            </div>
            <div className="terminal-content" id="terminal-content" style={{ flex: 1, padding: '0.5rem', overflowY: 'auto', fontSize: '0.8rem', fontFamily: "'Fira Code', monospace", color: 'var(--text-secondary)' }}>
              <div className="log-entry system">[System] Ready to build...</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}