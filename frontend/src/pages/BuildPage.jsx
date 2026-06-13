import { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout';
import LoadingOverlay from '../components/shared/LoadingOverlay';

const API_BASE = '/api/v1';

const PHASES = [
  { index: 0, name: 'Ideation', icon: 'fa-lightbulb', description: 'Refine your product concept', color: '#4dabf7' },
  { index: 1, name: 'Planning', icon: 'fa-drafting-compass', description: 'Architecture & tech stack', color: '#6c5ce7' },
  { index: 2, name: 'Review', icon: 'fa-search', description: 'Validate the approach', color: '#f59e0b' },
  { index: 3, name: 'Polish', icon: 'fa-paint-brush', description: 'UX improvements', color: '#22c55e' },
  { index: 4, name: 'Build', icon: 'fa-code', description: 'Generate production code', color: '#ef4444' },
  { index: 5, name: 'Virtual Deploy', icon: 'fa-rocket', description: 'Preview and accept the final product', color: '#06b6d4' },
];

export default function BuildPage() {
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [mode, setMode] = useState('plan');
  const [fileTree, setFileTree] = useState([]);
  const [previewHtml, setPreviewHtml] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [newIdea, setNewIdea] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deployStatus, setDeployStatus] = useState('');
  const [publishToGithub, setPublishToGithub] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/mvp/sessions/db`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
      }
    } catch (e) { console.error('Failed to load sessions', e); }
  }, []);

  useEffect(() => { loadSessions(); }, [loadSessions]);

  const loadSession = useCallback(async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/mvp/session/${id}`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setCurrentSession(data.session);
        setChatHistory(data.session.chat_history || []);
        setMode(data.session.mode || 'plan');
        // Load file tree
        const filesRes = await fetch(`${API_BASE}/mvp/session/${id}/files`, { credentials: 'include' });
        if (filesRes.ok) {
          const filesData = await filesRes.json();
          setFileTree(filesData.files || []);
        }
        // Load preview if in deploy phase
        if (data.session.current_phase_index >= 5) {
          loadPreview(id);
        }
      }
    } catch (e) { console.error('Failed to load session', e); }
    setLoading(false);
  }, []);

  const loadPreview = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/mvp/session/${id}/preview`, { credentials: 'include' });
      if (res.ok) {
        const html = await res.text();
        setPreviewHtml(html);
      }
    } catch (e) { console.error('Failed to load preview', e); }
  };

  const createSession = async () => {
    if (!newIdea.trim()) { alert('Please describe your product idea'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/mvp/create-session`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_idea: newIdea.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentSession(data.session);
        setChatHistory([]);
        setMode('plan');
        setView('session');
        setShowCreateForm(false);
        setNewIdea('');
        await loadSessions();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || 'Failed to create session');
      }
    } catch (e) { console.error('Failed to create session', e); alert('Network error'); }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !currentSession) return;
    const msg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: msg }, { role: 'assistant', content: 'Thinking...', _temp: true }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/mvp/send-message`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: currentSession.session_id, message: msg, mode }),
      });
      if (res.ok) {
        const data = await res.json();
        const response = data.result?.response || '';
        const newHistory = [...chatHistory.filter(m => !m._temp), { role: 'user', content: msg }, { role: 'assistant', content: response }];
        setChatHistory(newHistory);
        setCurrentSession(data.session);
        // Reload file tree if in act mode (new files may have been generated)
        if (mode === 'act') {
          const filesRes = await fetch(`${API_BASE}/mvp/session/${currentSession.session_id}/files`, { credentials: 'include' });
          if (filesRes.ok) {
            const filesData = await filesRes.json();
            setFileTree(filesData.files || []);
          }
        }
      } else {
        const err = await res.json().catch(() => ({}));
        const newHistory = [...chatHistory.filter(m => !m._temp), { role: 'user', content: msg }, { role: 'assistant', content: `Error: ${err.detail || 'Request failed'}` }];
        setChatHistory(newHistory);
      }
    } catch (e) {
      console.error('Chat failed', e);
      const newHistory = [...chatHistory.filter(m => !m._temp), { role: 'user', content: msg }, { role: 'assistant', content: 'Network error' }];
      setChatHistory(newHistory);
    }
    setLoading(false);
  };

  const advancePhase = async () => {
    if (!currentSession) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/mvp/advance-phase`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: currentSession.session_id }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentSession(data.session);
        if (data.session.current_phase_index >= 5) {
          loadPreview(currentSession.session_id);
        }
        await loadSessions();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || 'Failed to advance phase');
      }
    } catch (e) { console.error('Failed to advance phase', e); }
    setLoading(false);
  };

  const handleAcceptDeploy = async () => {
    if (!currentSession) return;
    setLoading(true);
    setDeployStatus('Finalizing deployment...');
    try {
      const res = await fetch(`${API_BASE}/mvp/virtual-deploy`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: currentSession.session_id,
          publish_to_github: publishToGithub,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setDeployStatus(data.deploy_url ? `Deployed to ${data.deploy_url}` : 'Deployment accepted');
        setCurrentSession(prev => ({ ...prev, deploy_accepted: true, deploy_github_url: data.deploy_url }));
        await loadSessions();
      } else {
        const err = await res.json().catch(() => ({}));
        setDeployStatus(`Error: ${err.detail || 'Deploy failed'}`);
      }
    } catch (e) { console.error('Deploy failed', e); setDeployStatus('Network error'); }
    setLoading(false);
  };

  const handleRequestChanges = async () => {
    if (!feedbackText.trim() || !currentSession) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/mvp/request-changes`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: currentSession.session_id, feedback: feedbackText.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentSession(data.session);
        // Refresh session from backend
        await loadSession(currentSession.session_id);
        setFeedbackText('');
        setDeployStatus('');
        await loadSessions();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || 'Failed to request changes');
      }
    } catch (e) { console.error('Request changes failed', e); }
    setLoading(false);
  };

  const deleteSession = async (id) => {
    if (!confirm('Delete this project?')) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/mvp/session/${id}`, { method: 'DELETE', credentials: 'include' });
      if (currentSession?.session_id === id) { setCurrentSession(null); setView('list'); }
      await loadSessions();
    } catch (e) { console.error('Failed to delete session', e); }
    setLoading(false);
  };

  const enterSession = async (id) => {
    setView('session');
    await loadSession(id);
  };

  const renderFileTree = (tree, depth = 0) => {
    if (!tree || tree.length === 0) return <div className="empty-state" style={{ fontSize: '0.8rem', padding: '0.5rem', color: 'var(--text-muted)' }}>No files yet</div>;
    return tree.map((node, i) => {
      if (node.type === 'directory') {
        return (
          <div key={node.name + i} style={{ paddingLeft: `${depth * 12}px` }}>
            <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--primary-color)', padding: '0.15rem 0' }}>
              <i className="fas fa-folder-open me-1"></i>{node.name}
            </div>
            {node.children && renderFileTree(node.children, depth + 1)}
          </div>
        );
      }
      return (
        <div key={node.path || (node.name + i)} style={{ paddingLeft: `${depth * 12}px`, padding: '0.1rem 0', fontSize: '0.78rem', color: 'var(--text-secondary)', cursor: 'pointer' }}
          onClick={() => {
            // Load file content
          }}>
          <i className="fas fa-file me-1"></i>{node.name}
        </div>
      );
    });
  };

  // ── View: List ──
  if (view === 'list') {
    return (
      <MainLayout>
        <LoadingOverlay show={loading} text="Loading..." />
        <div className="page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="page-header-box mb-4">
            <div className="section-header">
              <h2><i className="fas fa-rocket me-2"></i>Build Your Product</h2>
              <p>Create and manage your MVP projects. Each project goes through 6 phases from ideation to deployment.</p>
            </div>
            <div className="mt-3">
              {!showCreateForm ? (
                <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
                  <i className="fas fa-plus me-2"></i>Create New Project
                </button>
              ) : (
                <div className="create-form p-3" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--primary-color)', maxWidth: '500px' }}>
                  <h6 style={{ color: 'var(--primary-color)' }}><i className="fas fa-lightbulb me-2"></i>Describe Your Product Idea</h6>
                  <textarea className="form-control mt-2" rows="3" value={newIdea}
                    onChange={e => setNewIdea(e.target.value)}
                    placeholder="e.g., A task management app for remote teams with real-time collaboration..."
                    style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-sm btn-primary" onClick={createSession} disabled={loading}>
                      <i className="fas fa-play me-1"></i> Start Building
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => { setShowCreateForm(false); setNewIdea(''); }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {sessions.length === 0 && !loading && (
            <div className="empty-state text-center py-5" style={{ color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}><i className="fas fa-rocket"></i></div>
              <h4>No projects yet</h4>
              <p>Create a new project to start building with AI.</p>
            </div>
          )}

          <div className="session-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {sessions.map(s => {
              const phaseInfo = PHASES[s.current_phase_index] || PHASES[0];
              const progress = s.phases?.length ? Math.round(s.phases.reduce((sum, p) => sum + (p.progress || 0), 0) / s.phases.length) : s.current_phase_index * 20;
              const fileName = Object.keys(s.files || {}).length || 0;
              return (
                <div key={s.id} className="session-card"
                  style={{ background: 'var(--secondary-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'none'; }}
                  onClick={() => enterSession(s.id)}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div style={{ flex: 1 }}>
                      <h5 style={{ color: 'var(--primary-color)', margin: 0, fontSize: '1rem' }}>{s.product_idea?.slice(0, 60) || 'Untitled'}</h5>
                      <small style={{ color: 'var(--text-muted)' }}>Created {new Date(s.created_at).toLocaleDateString()}</small>
                    </div>
                    <span className="badge" style={{ background: phaseInfo.color, color: '#fff', fontSize: '0.65rem' }}>
                      {phaseInfo.name}
                    </span>
                  </div>
                  <div className="progress mb-2" style={{ height: '6px', background: 'var(--tertiary-bg)' }}>
                    <div className="progress-bar" style={{ width: `${progress}%`, background: 'var(--primary-color)', height: '100%', borderRadius: '3px' }}></div>
                  </div>
                  <div className="d-flex justify-content-between" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    <span><i className="fas fa-comments me-1"></i>{s.chat_history?.length || 0} messages</span>
                    <span><i className="fas fa-file me-1"></i>{fileName} files</span>
                    <span><i className="fas fa-tachometer-alt me-1"></i>{progress}%</span>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-sm btn-outline-primary flex-fill" onClick={(e) => { e.stopPropagation(); enterSession(s.id); }}>
                      <i className="fas fa-eye me-1"></i> Open
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); deleteSession(s.id); }}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MainLayout>
    );
  }

  // ── View: Session ──
  const currentPhaseIndex = currentSession?.current_phase_index ?? 0;
  const currentPhaseInfo = PHASES[currentPhaseIndex] || PHASES[0];
  const isDeployPhase = currentPhaseIndex >= 5;
  const isBuildPhase = currentPhaseIndex === 4;
  const sessionProgress = currentSession?.phases?.length
    ? Math.round(currentSession.phases.reduce((sum, p) => sum + (p.progress || 0), 0) / currentSession.phases.length)
    : Math.round((currentPhaseIndex / 5) * 100);

  return (
    <MainLayout>
      <LoadingOverlay show={loading} text={deployStatus || 'Processing...'} />
      <div className="mvp-session-container" style={{ padding: '1rem 1.5rem', height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => { setView('list'); setCurrentSession(null); setChatHistory([]); setPreviewHtml(''); setDeployStatus(''); }}>
              <i className="fas fa-arrow-left me-1"></i> Back
            </button>
            <h5 style={{ margin: 0, color: 'var(--primary-color)' }}>
              <i className="fas fa-rocket me-2"></i>{currentSession?.product_idea?.slice(0, 50) || 'Project'}
            </h5>
            {currentSession?.deploy_accepted && (
              <span className="badge bg-success" style={{ fontSize: '0.65rem' }}><i className="fas fa-check-circle me-1"></i>Deployed</span>
            )}
          </div>
          <div className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Progress: {sessionProgress}%</span>
            <div className="progress" style={{ width: '120px', height: '6px', background: 'var(--tertiary-bg)' }}>
              <div className="progress-bar" style={{ width: `${sessionProgress}%`, background: 'var(--primary-color)', height: '100%', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>

        {/* Phase Stepper */}
        <div className="phase-stepper mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', padding: '0.5rem 0.75rem', background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'auto' }}>
          {PHASES.map((phase, i) => {
            const isActive = i === currentPhaseIndex;
            const isCompleted = i < currentPhaseIndex;
            const phaseStatus = currentSession?.phases?.[i]?.status;
            const isDone = isCompleted || phaseStatus === 'completed';
            return (
              <div key={phase.name} className="d-flex align-items-center" style={{ flexShrink: 0 }}>
                <div style={{ textAlign: 'center', padding: '0 0.15rem' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: isDone ? '#22c55e' : isActive ? phase.color : 'var(--tertiary-bg)',
                    color: isDone || isActive ? '#fff' : 'var(--text-muted)',
                    border: isActive && !isDone ? `2px solid ${phase.color}` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, margin: '0 auto',
                    boxShadow: isActive ? '0 0 0 3px rgba(77,171,247,0.3)' : 'none',
                  }}>
                    {isDone ? <i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i> : i + 1}
                  </div>
                  <div style={{ fontSize: '0.55rem', color: isActive ? 'var(--primary-color)' : 'var(--text-muted)', fontWeight: isActive ? 700 : 400, marginTop: '0.1rem', whiteSpace: 'nowrap' }}>
                    {phase.name}
                  </div>
                </div>
                {i < PHASES.length - 1 && (
                  <i className="fas fa-chevron-right" style={{ color: isCompleted ? '#22c55e' : 'var(--text-muted)', fontSize: '0.5rem', margin: '0 0.15rem' }}></i>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Content: Two column layout */}
        <div className="d-flex gap-2" style={{ flex: 1, overflow: 'hidden', flexDirection: isMobile ? 'column' : 'row' }}>
          {/* LHS: Chat Console */}
          <div className="lhs-chat" style={{
            width: isMobile ? '100%' : '340px', minWidth: isMobile ? '100%' : '280px',
            display: 'flex', flexDirection: 'column', background: 'var(--secondary-bg)',
            borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden',
            maxHeight: isMobile ? '300px' : '100%',
          }}>
            {/* Chat Header with Mode Toggle */}
            <div className="d-flex justify-content-between align-items-center p-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}><i className="fas fa-terminal me-1"></i> Agent Console</span>
              <div className="d-flex gap-1">
                <button className={`btn btn-sm ${mode === 'plan' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}
                  onClick={() => setMode('plan')}>
                  <i className="fas fa-comments me-1"></i>Plan
                </button>
                <button className={`btn btn-sm ${mode === 'act' ? 'btn-danger' : 'btn-outline-secondary'}`}
                  style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}
                  onClick={() => setMode('act')}>
                  <i className="fas fa-bolt me-1"></i>Act
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', fontSize: '0.8rem' }}>
              {chatHistory.length === 0 && (
                <div className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                  <i className="fas fa-comment-dots" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
                  <p style={{ fontSize: '0.8rem' }}>Start a conversation about your product idea.</p>
                  <small>Switch to <strong>Act</strong> mode to generate code.</small>
                </div>
              )}
              {chatHistory.filter(m => !m._temp).map((msg, i) => (
                <div key={i} className={`chat-message mb-2 p-2 ${msg.role === 'user' ? 'text-end' : ''}`}
                  style={{
                    background: msg.role === 'user' ? 'rgba(77,171,247,0.1)' : 'var(--tertiary-bg)',
                    borderRadius: '6px', border: `1px solid ${msg.role === 'user' ? 'rgba(77,171,247,0.3)' : 'var(--border-color)'}`,
                  }}>
                  <small style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.15rem' }}>
                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                  </small>
                  <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--text-primary)', fontSize: '0.78rem', lineHeight: 1.4 }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-2" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="d-flex gap-2">
                <input className="form-control form-control-sm" value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder={mode === 'plan' ? 'Discuss your idea...' : 'Tell the AI what to build...'}
                  style={{ background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }} />
                <button className="btn btn-sm btn-primary" onClick={sendMessage} disabled={loading || !chatInput.trim()}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              {mode === 'act' && (
                <small style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.15rem' }}>
                  <i className="fas fa-bolt me-1" style={{ color: '#ef4444' }}></i>Act mode: AI will generate code and create files
                </small>
              )}
            </div>
          </div>

          {/* RHS: Preview + Actions */}
          <div className="rhs-preview" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'hidden' }}>
            {/* Phase info bar */}
            <div className="phase-info-bar d-flex justify-content-between align-items-center p-2"
              style={{ background: currentPhaseInfo.color + '15', border: `1px solid ${currentPhaseInfo.color}40`, borderRadius: '8px' }}>
              <div>
                <span className="badge me-2" style={{ background: currentPhaseInfo.color }}>{currentPhaseInfo.name}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{currentPhaseInfo.description}</span>
              </div>
              {/* Show deploy actions only in Virtual Deploy phase */}
              {isDeployPhase && !currentSession?.deploy_accepted && (
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-success" onClick={handleAcceptDeploy} disabled={loading}>
                    <i className="fas fa-check me-1"></i> Accept & Deploy
                  </button>
                </div>
              )}
              {!isDeployPhase && (
                <button className="btn btn-sm" style={{ background: currentPhaseInfo.color, color: '#fff' }}
                  onClick={advancePhase} disabled={loading}>
                  <i className="fas fa-forward me-1"></i> Advance to Next Phase
                </button>
              )}
            </div>

            {/* Virtual Deploy Section */}
            {isDeployPhase && (
              <div className="deploy-section" style={{ background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Deploy Actions */}
                {!currentSession?.deploy_accepted && (
                  <div className="p-2 d-flex justify-content-between align-items-center" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="publishGithub" checked={publishToGithub}
                          onChange={e => setPublishToGithub(e.target.checked)} />
                        <label className="form-check-label" htmlFor="publishGithub" style={{ fontSize: '0.75rem' }}>
                          Publish to GitHub
                        </label>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <div className="d-flex gap-1">
                        <input className="form-control form-control-sm" value={feedbackText}
                          onChange={e => setFeedbackText(e.target.value)}
                          placeholder="Request changes..."
                          style={{ width: '220px', fontSize: '0.75rem', background: 'var(--tertiary-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                        <button className="btn btn-sm btn-outline-warning" onClick={handleRequestChanges} disabled={loading || !feedbackText.trim()}>
                          <i className="fas fa-undo me-1"></i> Request Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Deploy Status */}
                {deployStatus && (
                  <div className="p-2 text-center" style={{ background: 'rgba(34,197,94,0.1)', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.8rem', color: '#22c55e' }}><i className="fas fa-check-circle me-1"></i>{deployStatus}</span>
                  </div>
                )}

                {/* Preview Area */}
                <div className="preview-area" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                  {/* File Tree */}
                  <div className="file-tree-panel" style={{ width: isMobile ? '100%' : '200px', borderRight: isMobile ? 'none' : '1px solid var(--border-color)', borderBottom: isMobile ? '1px solid var(--border-color)' : 'none', overflowY: 'auto', maxHeight: isMobile ? '120px' : '100%' }}>
                    <div className="p-1" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                      <i className="fas fa-folder me-1"></i> Files
                    </div>
                    <div className="p-1">
                      {renderFileTree(fileTree)}
                    </div>
                  </div>

                  {/* Preview iframe */}
                  <div className="preview-iframe-panel" style={{ flex: 1, overflow: 'auto', background: '#fff' }}>
                    {previewHtml ? (
                      <iframe srcDoc={previewHtml} style={{ width: '100%', height: '100%', border: 'none' }} title="Preview" />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', color: 'var(--text-muted)' }}>
                        <div className="text-center">
                          <i className="fas fa-eye" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
                          <p style={{ fontSize: '0.85rem' }}>No preview available yet.</p>
                          <small>Send messages in Plan or Act mode to generate files.</small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Non-Deploy Phase: Standard Preview */}
            {!isDeployPhase && (
              <div className="standard-preview" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* File Tree + Preview */}
                <div className="d-flex" style={{ flex: 1, background: 'var(--secondary-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', flexDirection: isMobile ? 'column' : 'row' }}>
                  {/* File Tree */}
                  <div className="file-tree-panel" style={{ width: isMobile ? '100%' : '200px', borderRight: isMobile ? 'none' : '1px solid var(--border-color)', borderBottom: isMobile ? '1px solid var(--border-color)' : 'none', overflowY: 'auto', maxHeight: isMobile ? '120px' : '100%' }}>
                    <div className="p-1" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                      <i className="fas fa-folder me-1"></i> Files
                    </div>
                    <div className="p-1">
                      {renderFileTree(fileTree)}
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="preview-content" style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
                    {previewHtml ? (
                      <iframe srcDoc={previewHtml} style={{ width: '100%', height: '400px', border: '1px solid var(--border-color)', borderRadius: '8px' }} title="Preview" />
                    ) : (
                      <div className="text-center py-5" style={{ color: 'var(--text-muted)' }}>
                        <i className="fas fa-drafting-compass" style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}></i>
                        <h6>Current Phase: {currentPhaseInfo.name}</h6>
                        <p style={{ fontSize: '0.85rem' }}>
                          {currentPhaseIndex === 0 && 'Discuss your product idea in the chat console. Use Plan mode to brainstorm, Act mode to generate files.'}
                          {currentPhaseIndex === 1 && 'Plan the architecture and choose your tech stack. The AI will help design the system.'}
                          {currentPhaseIndex === 2 && 'Review the planned approach. Validate architecture and identify potential issues.'}
                          {currentPhaseIndex === 3 && 'Polish the UX and design. Suggest improvements and refinements.'}
                          {currentPhaseIndex === 4 && 'Generate production-ready code. The AI will create files in the workspace below.'}
                        </p>
                        <div className="mt-3">
                          <span className="badge me-1" style={{ background: currentPhaseInfo.color + '30', color: currentPhaseInfo.color, padding: '0.35rem 0.75rem' }}>
                            <i className={`fas ${currentPhaseInfo.icon} me-1`}></i> {currentPhaseInfo.description}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}