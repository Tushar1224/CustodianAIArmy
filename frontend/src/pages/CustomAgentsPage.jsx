import MainLayout from '../components/layout/MainLayout';
import LoadingOverlay from '../components/shared/LoadingOverlay';

export default function CustomAgentsPage() {
  const subHeaderContent = (
    <>
      <div className="sub-header-stat">
        <span className="stat-label">My Custom Agents</span>
        <span className="stat-value" id="my-agents-count">0</span>
      </div>
      <div className="sub-header-divider"></div>
      <div className="sub-header-stat">
        <span className="stat-label">Published Agents</span>
        <span className="stat-value" id="published-agents-count">0</span>
      </div>
      <div className="sub-header-divider"></div>
      <div className="sub-header-stat">
        <span className="stat-label">Skills Library</span>
        <span className="stat-value" id="skills-count">0</span>
      </div>
    </>
  );

  return (
    <MainLayout showSubHeader={true} subHeaderContent={subHeaderContent}>
      <div className="page-header-box mb-3">
        <div className="section-header mb-0">
          <h2><i className="fas fa-users-cog me-2"></i>Custom Agents Studio</h2>
          <p>Create, customize, and publish your own AI agents with unique skills and MCP tools.</p>
        </div>
      </div>

      <div className="agents-studio-layout d-flex gap-3">
        {/* LHS: Agent Creation Dashboard */}
        <div className="agents-creation-panel" style={{ flex: 1, minWidth: 0 }}>
          <div className="creation-mode-toggle mb-3" style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="mode-btn active" data-mode="single" style={{ padding: '0.5rem 1rem', border: '1px solid var(--primary-color)', borderRadius: '6px', background: 'var(--primary-color)', color: '#000', fontWeight: 600, cursor: 'pointer' }}>
              <i className="fas fa-user"></i> Single Agent
            </button>
            <button className="mode-btn" data-mode="army" style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <i className="fas fa-users"></i> Agent Army
            </button>
          </div>

          <div className="agent-config-card mb-3" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="card-header-custom" style={{ padding: '0.75rem 1rem', background: 'var(--tertiary-bg)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-color)' }}>
              <i className="fas fa-sliders-h me-2"></i>Agent Configuration
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="mb-3">
                <label className="form-label small">Agent Name</label>
                <input type="text" className="form-control form-control-sm" id="agent-name-input" placeholder="e.g., Code Reviewer Pro" />
              </div>
              <div className="mb-3">
                <label className="form-label small">Specialization</label>
                <input type="text" className="form-control form-control-sm" id="agent-spec-input" placeholder="e.g., Code Analysis & Review" />
              </div>
              <div className="mb-3">
                <label className="form-label small">Description</label>
                <textarea className="form-control form-control-sm" id="agent-desc-input" rows="3" placeholder="Describe what this agent does..."></textarea>
              </div>
            </div>
          </div>

          <div className="prompt-generator-card mb-3" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="card-header-custom" style={{ padding: '0.75rem 1rem', background: 'var(--tertiary-bg)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-color)' }}>
              <i className="fas fa-magic me-2"></i>AI Prompt Builder
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="mb-2">
                <label className="form-label small">Base Idea</label>
                <textarea className="form-control form-control-sm" id="prompt-idea-input" rows="2" placeholder="Describe what you want your agent to do..."></textarea>
              </div>
              <div className="d-flex gap-2 mb-2">
                <button className="btn btn-sm btn-outline-info"><i className="fas fa-sparkles me-1"></i> Generate</button>
                <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-wand-magic-sparkles me-1"></i> Refine</button>
              </div>
            </div>
          </div>

          <div className="skills-selection-card mb-3" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="card-header-custom d-flex justify-content-between align-items-center" style={{ padding: '0.75rem 1rem', background: 'var(--tertiary-bg)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-color)' }}>
              <span><i className="fas fa-star me-2"></i>Agent Skills</span>
              <button className="btn btn-sm btn-outline-info" data-bs-toggle="modal" data-bs-target="#skillModal"><i className="fas fa-plus me-1"></i> Add Skill</button>
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="skills-tags-container" id="skills-tags-container">
                <span className="text-muted small">No skills added yet. Click "Add Skill" to create one.</span>
              </div>
            </div>
          </div>

          <div className="mcp-tools-card mb-3" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="card-header-custom d-flex justify-content-between align-items-center" style={{ padding: '0.75rem 1rem', background: 'var(--tertiary-bg)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-color)' }}>
              <span><i className="fas fa-plug me-2"></i>MCP Tools</span>
              <button className="btn btn-sm btn-outline-info" data-bs-toggle="modal" data-bs-target="#mcpToolModal"><i className="fas fa-plus me-1"></i> Add MCP</button>
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="mcp-tools-list" id="mcp-tools-list">
                <span className="text-muted small">No MCP tools attached yet.</span>
              </div>
            </div>
          </div>

          <div className="publishing-options-card mb-3" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="card-header-custom" style={{ padding: '0.75rem 1rem', background: 'var(--tertiary-bg)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-color)' }}>
              <i className="fas fa-globe me-2"></i>Publishing Options
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="publish-option" id="publish-private" value="private" defaultChecked />
                <label className="form-check-label" htmlFor="publish-private"><i className="fas fa-lock me-1"></i> Private (Only Me)</label>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="radio" name="publish-option" id="publish-public" value="public" />
                <label className="form-check-label" htmlFor="publish-public"><i className="fas fa-globe me-1"></i> Public (Shareable URL)</label>
              </div>
              <button className="btn btn-primary w-100"><i className="fas fa-save me-2"></i>Save Agent</button>
            </div>
          </div>
        </div>

        {/* RHS: Created Agents Display */}
        <div className="agents-display-panel" style={{ flex: 1, minWidth: 0 }}>
          <div className="agents-display-card" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="card-header-custom d-flex justify-content-between align-items-center" style={{ padding: '0.75rem 1rem', background: 'var(--tertiary-bg)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-color)' }}>
              <span><i className="fas fa-robot me-2"></i>My Custom Agents</span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary">All</button>
                <button className="btn btn-sm btn-outline-info">Private</button>
                <button className="btn btn-sm btn-outline-success">Published</button>
              </div>
            </div>
            <div className="card-body-custom" style={{ padding: '1rem' }}>
              <div className="custom-agents-grid" id="custom-agents-grid">
                <div className="text-center py-4 text-muted"><i className="fas fa-inbox fa-3x mb-3 d-block"></i>No custom agents yet. Create your first one!</div>
              </div>
            </div>
          </div>

          <div className="custom-agent-chat-card mt-3" id="custom-agent-chat-card" style={{ display: 'none', background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div className="card-header-custom d-flex justify-content-between align-items-center" style={{ padding: '0.75rem 1rem', background: 'var(--tertiary-bg)', borderBottom: '1px solid var(--border-color)' }}>
              <span><i className="fas fa-comments me-2"></i>Chat with <span id="chat-agent-name"></span></span>
              <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-times"></i></button>
            </div>
            <div className="card-body-custom p-0">
              <div className="chat-messages" id="custom-chat-messages" style={{ height: '300px', overflowY: 'auto', padding: '1rem' }}>
                <div className="welcome-message">
                  <i className="fas fa-robot"></i>
                  <p>Start chatting with your custom agent!</p>
                </div>
              </div>
              <div className="chat-input-container" style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <textarea id="custom-chat-input" placeholder="Type your message..." rows="1" style={{ flex: 1, background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', padding: '0.5rem', resize: 'none' }}></textarea>
                <button id="custom-send-btn" style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><i className="fas fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoadingOverlay visible={false} />

      {/* Skill Modal */}
      <div className="modal fade" id="skillModal" tabIndex="-1" aria-labelledby="skillModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ background: 'var(--secondary-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
            <div className="modal-header" style={{ borderBottomColor: 'var(--border-color)' }}>
              <h5 className="modal-title" id="skillModalLabel"><i className="fas fa-star me-2"></i>Add Skill</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Skill Name</label>
                <input type="text" className="form-control" id="skill-name-input" placeholder="e.g., Python Expert" />
              </div>
              <div className="mb-3">
                <label className="form-label">Skill Description</label>
                <textarea className="form-control" id="skill-desc-input" rows="3" placeholder="Describe what this skill enables..."></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Skill Category</label>
                <select className="form-select" id="skill-category-input">
                  <option value="technical">Technical</option>
                  <option value="creative">Creative</option>
                  <option value="analytical">Analytical</option>
                  <option value="communication">Communication</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="modal-footer" style={{ borderTopColor: 'var(--border-color)' }}>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Add Skill</button>
            </div>
          </div>
        </div>
      </div>

      {/* MCP Tool Modal */}
      <div className="modal fade" id="mcpToolModal" tabIndex="-1" aria-labelledby="mcpModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ background: 'var(--secondary-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
            <div className="modal-header" style={{ borderBottomColor: 'var(--border-color)' }}>
              <h5 className="modal-title" id="mcpModalLabel"><i className="fas fa-plug me-2"></i>Add MCP Tool</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Tool Name</label>
                <input type="text" className="form-control" id="mcp-name-input" placeholder="e.g., File System Access" />
              </div>
              <div className="mb-3">
                <label className="form-label">Tool Endpoint/URL</label>
                <input type="text" className="form-control" id="mcp-endpoint-input" placeholder="e.g., https://api.example.com/mcp" />
              </div>
              <div className="mb-3">
                <label className="form-label">Configuration (JSON)</label>
                <textarea className="form-control" id="mcp-config-input" rows="4" placeholder='{"key": "value"}'></textarea>
              </div>
            </div>
            <div className="modal-footer" style={{ borderTopColor: 'var(--border-color)' }}>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Add MCP</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}