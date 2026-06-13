import { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from '../components/layout/MainLayout';
import LoadingOverlay from '../components/shared/LoadingOverlay';
import './BuildPage.css';

const API_BASE = '/api/v1';

const PHASES = [
  { index: 0, name: 'Ideation', icon: 'fa-lightbulb', description: 'Refine your product concept', color: '#4dabf7', modes: ['plan'] },
  { index: 1, name: 'Planning', icon: 'fa-drafting-compass', description: 'Architecture & tech stack', color: '#6c5ce7', modes: ['plan'] },
  { index: 2, name: 'Review', icon: 'fa-search', description: 'Validate the approach', color: '#f59e0b', modes: ['plan'] },
  { index: 3, name: 'Polish', icon: 'fa-paint-brush', description: 'UX improvements', color: '#22c55e', modes: ['plan', 'act'] },
  { index: 4, name: 'Build', icon: 'fa-code', description: 'Generate production code', color: '#ef4444', modes: ['plan', 'act'] },
  { index: 5, name: 'Virtual Deploy', icon: 'fa-rocket', description: 'Preview and accept the final product', color: '#06b6d4', modes: ['plan'] },
];

const MODE_LABELS = { plan: 'Plan', act: 'Act' };
const MODE_ICONS = { plan: 'fa-comments', act: 'fa-bolt' };
const MODE_DESCRIPTIONS = {
  plan: 'Discuss and brainstorm with the AI',
  act: 'Generate code and create files',
};
const MODE_PLACEHOLDERS = {
  plan: 'Discuss your idea with the AI...',
  act: 'Tell the AI what to build...',
};

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [typing, setTyping] = useState(false);
  const [toasts, setToasts] = useState([]);
  const chatEndRef = useRef(null);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

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
        const phaseModes = (PHASES[data.session.current_phase_index] || PHASES[0]).modes;
        const savedMode = data.session.mode || 'plan';
        setMode(phaseModes.includes(savedMode) ? savedMode : phaseModes[0]);
        const filesRes = await fetch(`${API_BASE}/mvp/session/${id}/files`, { credentials: 'include' });
        if (filesRes.ok) {
          const filesData = await filesRes.json();
          setFileTree(filesData.files || []);
        }
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
    if (!newIdea.trim()) { addToast('Please describe your product idea', 'error'); return; }
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
        addToast('Project created successfully', 'success');
        await loadSessions();
      } else {
        const err = await res.json().catch(() => ({}));
        addToast(err.detail || 'Failed to create session', 'error');
      }
    } catch (e) { console.error('Failed to create session', e); addToast('Network error', 'error'); }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !currentSession) return;
    const msg = chatInput;
    setChatInput('');
    setTyping(true);
    setChatHistory(prev => [...prev, { role: 'user', content: msg }]);
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
        setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
        setCurrentSession(data.session);
        if (mode === 'act') {
          const filesRes = await fetch(`${API_BASE}/mvp/session/${currentSession.session_id}/files`, { credentials: 'include' });
          if (filesRes.ok) {
            const filesData = await filesRes.json();
            setFileTree(filesData.files || []);
          }
        }
      } else {
        const err = await res.json().catch(() => ({}));
        setChatHistory(prev => [...prev, { role: 'assistant', content: `Error: ${err.detail || 'Request failed'}` }]);
      }
    } catch (e) {
      console.error('Chat failed', e);
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again.' }]);
    }
    setLoading(false);
    setTyping(false);
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
        const newPhaseModes = (PHASES[data.session.current_phase_index] || PHASES[0]).modes;
        setMode(newPhaseModes[0]);
        addToast(`Advanced to ${PHASES[data.session.current_phase_index]?.name || 'next phase'}`, 'success');
        if (data.session.current_phase_index >= 5) {
          loadPreview(currentSession.session_id);
        }
        await loadSessions();
      } else {
        const err = await res.json().catch(() => ({}));
        addToast(err.detail || 'Failed to advance phase', 'error');
      }
    } catch (e) { console.error('Failed to advance phase', e); addToast('Network error', 'error'); }
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
        const msg = data.deploy_url ? `Deployed to ${data.deploy_url}` : 'Deployment accepted';
        setDeployStatus(msg);
        addToast(msg, 'success');
        setCurrentSession(prev => ({ ...prev, deploy_accepted: true, deploy_github_url: data.deploy_url }));
        await loadSessions();
      } else {
        const err = await res.json().catch(() => ({}));
        setDeployStatus(`Error: ${err.detail || 'Deploy failed'}`);
        addToast(err.detail || 'Deploy failed', 'error');
      }
    } catch (e) { console.error('Deploy failed', e); setDeployStatus('Network error'); addToast('Network error', 'error'); }
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
        await loadSession(currentSession.session_id);
        setFeedbackText('');
        setDeployStatus('');
        addToast('Changes requested — moved back to Build phase', 'info');
        await loadSessions();
      } else {
        const err = await res.json().catch(() => ({}));
        addToast(err.detail || 'Failed to request changes', 'error');
      }
    } catch (e) { console.error('Request changes failed', e); addToast('Network error', 'error'); }
    setLoading(false);
  };

  const deleteSession = async (id) => {
    if (!confirm('Delete this project?')) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/mvp/session/${id}`, { method: 'DELETE', credentials: 'include' });
      if (currentSession?.session_id === id) { setCurrentSession(null); setView('list'); }
      addToast('Project deleted', 'info');
      await loadSessions();
    } catch (e) { console.error('Failed to delete session', e); addToast('Failed to delete', 'error'); }
    setLoading(false);
  };

  const enterSession = async (id) => {
    setView('session');
    await loadSession(id);
  };

  const renderFileTree = (tree, depth = 0) => {
    if (!tree || tree.length === 0) return <div className="bp-file-node" style={{ padding: '12px', color: '#555', cursor: 'default', fontFamily: 'inherit' }}>No files yet</div>;
    return tree.map((node, i) => {
      if (node.type === 'directory') {
        return (
          <div key={node.name + i}>
            <div className="bp-file-node directory">
              <span className="bp-folder-arrow open"><i className="fas fa-chevron-right"></i></span>
              <i className="fas fa-folder"></i>
              {node.name}
            </div>
            {node.children && (
              <div className="bp-file-children">
                {renderFileTree(node.children, depth + 1)}
              </div>
            )}
          </div>
        );
      }
      return (
        <div key={node.path || (node.name + i)} className="bp-file-node"
          onClick={() => {}}>
          <i className="far fa-file-code"></i>
          {node.name}
        </div>
      );
    });
  };

  // Shared toast container
  const renderToasts = () => (
    <div className="bp-toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`bp-toast ${t.type}`}>{t.message}</div>
      ))}
    </div>
  );

  // ── View: List ──
  if (view === 'list') {
    return (
      <MainLayout>
        <LoadingOverlay show={loading} text="Loading..." />
        {renderToasts()}
        <div className="bp-container">
          <div className="bp-header">
            <h1><i className="fas fa-cubes me-2"></i>Build Your Product</h1>
            <p>Create and manage your AI-powered MVP projects through 6 phases — from ideation to deployment.</p>
          </div>

          <div className="bp-list-toolbar">
            {!showCreateForm ? (
              <button className="bp-create-btn" onClick={() => setShowCreateForm(true)}>
                <i className="fas fa-plus"></i> Create New Project
              </button>
            ) : null}
          </div>

          {showCreateForm && (
            <div className="bp-create-form">
              <label><i className="fas fa-lightbulb me-2" style={{ color: '#f59e0b' }}></i>Describe Your Product Idea</label>
              <textarea value={newIdea}
                onChange={e => setNewIdea(e.target.value)}
                placeholder="e.g., A task management app for remote teams with real-time collaboration..."
                autoFocus />
              <div className="bp-form-actions">
                <button className="bp-form-submit" onClick={createSession} disabled={loading}>
                  <i className="fas fa-play me-1"></i> Start Building
                </button>
                <button className="bp-form-cancel" onClick={() => { setShowCreateForm(false); setNewIdea(''); }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {sessions.length === 0 && !loading && (
            <div className="bp-empty">
              <div className="bp-empty-icon"><i className="fas fa-cubes"></i></div>
              <h3>No projects yet</h3>
              <p>Create a new project and let AI guide you through building your MVP.</p>
              {!showCreateForm && (
                <button className="bp-create-btn" onClick={() => setShowCreateForm(true)}>
                  <i className="fas fa-plus"></i> Create New Project
                </button>
              )}
            </div>
          )}

          {loading && sessions.length === 0 && (
            <div className="bp-skel-row">
              {[1,2,3].map(i => <div key={i} className="bp-skeleton bp-skel-card" />)}
            </div>
          )}

          <div className="bp-grid">
            {sessions.map(s => {
              const phaseInfo = PHASES[s.current_phase_index] || PHASES[0];
              const progress = s.phases?.length
                ? Math.round(s.phases.reduce((sum, p) => sum + (p.progress || 0), 0) / s.phases.length)
                : s.current_phase_index * 20;
              const fileCount = Object.keys(s.files || {}).length;
              return (
                <div key={s.id} className="bp-card" onClick={() => enterSession(s.id)}>
                  <div className="bp-card-top">
                    <div className="bp-card-title">{s.product_idea?.slice(0, 60) || 'Untitled'}</div>
                    <span className="bp-card-badge" style={{ background: phaseInfo.color + '20', color: phaseInfo.color }}>
                      {phaseInfo.name}
                    </span>
                  </div>
                  <div className="bp-card-body">
                    <div className="bp-card-meta">
                      <span><i className="far fa-calendar me-1"></i>{new Date(s.created_at).toLocaleDateString()}</span>
                      <span><i className="fas fa-comments me-1"></i>{s.chat_history?.length || 0}</span>
                      <span><i className="fas fa-file me-1"></i>{fileCount}</span>
                    </div>
                    <div className="bp-card-bar">
                      <div className="bp-card-bar-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6c5ce7, #4dabf7)' }}></div>
                    </div>
                    <div className="bp-card-actions" onClick={e => e.stopPropagation()}>
                      <button className="bp-card-open" onClick={() => enterSession(s.id)}>
                        <i className="fas fa-eye me-1"></i> Open
                      </button>
                      <button className="bp-card-del" onClick={() => deleteSession(s.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
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
  const availableModes = currentPhaseInfo.modes || ['plan'];
  const isDeployPhase = currentPhaseIndex >= 5;
  const sessionProgress = currentSession?.phases?.length
    ? Math.round(currentSession.phases.reduce((sum, p) => sum + (p.progress || 0), 0) / currentSession.phases.length)
    : Math.round((currentPhaseIndex / 5) * 100);

  return (
    <MainLayout>
      <LoadingOverlay show={loading} text={deployStatus || 'Processing...'} />
      {renderToasts()}

      {deployStatus && loading && (
        <div className="bp-status-overlay">
          <div className="bp-status-card">
            {deployStatus.includes('Error') || deployStatus.includes('Network') ? (
              <i className="fas fa-exclamation-circle error"></i>
            ) : deployStatus.includes('Deployed') || deployStatus.includes('accepted') ? (
              <i className="fas fa-check-circle success"></i>
            ) : (
              <i className="fas fa-spinner fa-pulse spinner"></i>
            )}
            <h3>{deployStatus.includes('Error') ? 'Deployment Failed' : deployStatus.includes('Deployed') ? 'Deployed!' : 'Processing'}</h3>
            <p>{deployStatus}</p>
          </div>
        </div>
      )}

      <div className="bp-container">
        {/* Top Bar */}
        <div className="bp-session-top">
          <button className="bp-back-btn" onClick={() => { setView('list'); setCurrentSession(null); setChatHistory([]); setPreviewHtml(''); setDeployStatus(''); }}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <h2 className="bp-session-title">
            <i className="fas fa-cubes me-2" style={{ color: 'var(--primary-color)' }}></i>
            {currentSession?.product_idea?.slice(0, 50) || 'Project'}
          </h2>
          {currentSession?.deploy_accepted && (
            <span className="bp-deployed-badge">
              <i className="fas fa-check-circle"></i> Deployed
            </span>
          )}
          <div className="bp-session-progress">
            <span>{sessionProgress}%</span>
            <div className="bp-session-bar">
              <div className="bp-session-bar-fill" style={{
                width: `${sessionProgress}%`,
                background: sessionProgress >= 80 ? 'linear-gradient(90deg, #22c55e, #06b6d4)' : 'linear-gradient(90deg, #6c5ce7, #4dabf7)'
              }}></div>
            </div>
          </div>
        </div>

        {/* Phase Stepper */}
        <div className="bp-stepper">
          {PHASES.map((phase, i) => {
            const isActive = i === currentPhaseIndex;
            const isCompleted = i < currentPhaseIndex;
            const phaseStatus = currentSession?.phases?.[i]?.status;
            const isDone = isCompleted || phaseStatus === 'completed';
            return (
              <div key={phase.name}
                className={`bp-step ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                style={{ '--step-color': phase.color, '--step-color-rgb': hexToRgb(phase.color) }}>
                <div className="bp-step-icon">
                  {isDone ? <i className="fas fa-check"></i> : <i className={`fas ${phase.icon}`}></i>}
                </div>
                <div className="bp-step-info">
                  <span className="bp-step-label">{phase.name}</span>
                  <span className="bp-step-sub">{phase.description}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content: Two column layout */}
        <div className="bp-session-body">
          {/* LHS: Chat Console */}
          <div className="bp-chat">
            <div className="bp-chat-head">
              <span><i className="fas fa-terminal me-2"></i>Agent Console</span>
              {availableModes.length > 1 ? (
                <div className="bp-mode-toggle">
                  <button className={`bp-mode-btn bp-mode-plan ${mode === 'plan' ? 'active' : ''}`}
                    onClick={() => setMode('plan')}>
                    <i className="fas fa-comments me-1"></i>Plan
                  </button>
                  <span style={{ color: '#555', fontSize: '.65rem', padding: '0 4px' }}><i className="fas fa-arrow-right"></i></span>
                  <button className={`bp-mode-btn bp-mode-act ${mode === 'act' ? 'active' : ''}`}
                    onClick={() => setMode('act')}>
                    <i className="fas fa-bolt me-1"></i>Act
                  </button>
                </div>
              ) : (
                <span className="bp-mode-badge" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '3px 10px', borderRadius: '6px', fontSize: '.72rem', fontWeight: 600,
                  background: mode === 'plan' ? 'rgba(77,171,247,.15)' : 'rgba(239,68,68,.15)',
                  color: mode === 'plan' ? '#4dabf7' : '#ef4444',
                  textTransform: 'uppercase', letterSpacing: '.03em',
                }}>
                  <i className={`fas ${MODE_ICONS[mode]} me-1`}></i>
                  {MODE_LABELS[mode]} Only
                </span>
              )}
            </div>

            {/* Chat Messages */}
            <div className="bp-chat-msgs">
              {chatHistory.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 16px', color: '#555' }}>
                  <i className={`fas ${MODE_ICONS[mode]}`} style={{ fontSize: '2.2rem', display: 'block', marginBottom: '12px', color: mode === 'plan' ? 'rgba(77,171,247,.3)' : 'rgba(239,68,68,.3)' }}></i>
                  <p style={{ fontSize: '.85rem', margin: '0 0 4px' }}>
                    {mode === 'plan'
                      ? `Brainstorm in ${currentPhaseInfo.name} phase.`
                      : `Generate code in ${currentPhaseInfo.name} phase.`
                    }
                  </p>
                  <small style={{ color: '#555' }}>{MODE_DESCRIPTIONS[mode] || ''}</small>
                  {availableModes.length > 1 && mode === 'plan' && (
                    <div style={{ marginTop: '8px' }}>
                      <span style={{ fontSize: '.72rem', color: '#6c5ce7' }}>
                        <i className="fas fa-arrow-right me-1"></i>Switch to <strong>Act</strong> to generate files
                      </span>
                    </div>
                  )}
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`bp-msg ${msg.role}`}>
                  <div className="bp-msg-role">{msg.role === 'user' ? 'You' : 'AI Assistant'}</div>
                  <div className="bp-msg-bubble">{msg.content}</div>
                </div>
              ))}
              {typing && (
                <div className="bp-msg assistant">
                  <div className="bp-msg-role">AI Assistant</div>
                  <div className="bp-msg-bubble">
                    <div className="bp-typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="bp-chat-input">
              <input value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder={MODE_PLACEHOLDERS[mode]}
              />
              <button className="bp-chat-send" onClick={sendMessage} disabled={loading || !chatInput.trim()}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>

          {/* RHS: Preview + Actions */}
          <div className="bp-preview">
            {/* Phase info card */}
            <div className="bp-phase-card" style={{ borderLeft: `3px solid ${currentPhaseInfo.color}` }}>
              <div className="bp-phase-header">
                <div className="bp-phase-info">
                  <span className="bp-phase-badge" style={{ background: currentPhaseInfo.color + '20', color: currentPhaseInfo.color }}>
                    <i className={`fas ${currentPhaseInfo.icon} me-1`}></i>{currentPhaseInfo.name}
                  </span>
                  <span className="bp-phase-desc">{currentPhaseInfo.description}</span>
                </div>
                {isDeployPhase && !currentSession?.deploy_accepted ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="bp-advance-btn deploy" onClick={handleAcceptDeploy} disabled={loading}>
                      <i className="fas fa-check me-1"></i> Accept & Deploy
                    </button>
                  </div>
                ) : !isDeployPhase ? (
                  <button className="bp-advance-btn primary" onClick={advancePhase} disabled={loading}>
                    <i className="fas fa-forward me-1"></i> Advance to Next Phase
                  </button>
                ) : null}
              </div>
            </div>

            {/* Virtual Deploy Section */}
            {isDeployPhase && (
              <div className="bp-deploy-section">
                <h3><i className="fas fa-rocket"></i> Virtual Deployment</h3>
                {!currentSession?.deploy_accepted && (
                  <>
                    <div className="bp-deploy-check">
                      <input type="checkbox" id="publishGithub" checked={publishToGithub}
                        onChange={e => setPublishToGithub(e.target.checked)} />
                      <label htmlFor="publishGithub">Publish to GitHub when accepted</label>
                    </div>
                    <div className="bp-deploy-actions">
                      <div className="bp-deploy-changes">
                        <input value={feedbackText}
                          onChange={e => setFeedbackText(e.target.value)}
                          placeholder="Request changes before accepting..." />
                        <button className="bp-deploy-req" onClick={handleRequestChanges} disabled={loading || !feedbackText.trim()}>
                          <i className="fas fa-undo me-1"></i> Request Changes
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* File Tree */}
            <div className="bp-file-tree">
              <div className="bp-file-tree-title">
                <i className="fas fa-folder-open me-1"></i> Project Files
                {fileTree.length > 0 && <span style={{ color: '#555', fontWeight: 400, marginLeft: '4px' }}>({fileTree.length})</span>}
              </div>
              <div className="bp-file-tree-body">
                {renderFileTree(fileTree)}
              </div>
            </div>

            {/* Phase detail / instructions */}
            {!isDeployPhase && !previewHtml && (
              <div className="bp-phase-detail">
                <h4><i className="fas fa-info-circle me-1"></i>What to do in this phase</h4>
                {currentPhaseIndex === 0 && <p>Discuss your product idea in the chat console. Brainstorm features, target audience, and core value proposition using <strong>Plan</strong> mode.</p>}
                {currentPhaseIndex === 1 && <p>Plan the architecture and tech stack. Describe your preferred technologies and the AI will help design the system structure.</p>}
                {currentPhaseIndex === 2 && <p>Review the planned approach. Validate architecture decisions and identify potential issues before moving forward.</p>}
                {currentPhaseIndex === 3 && <p><strong>Plan</strong> first: discuss UX improvements, layout changes, and refinements. Then switch to <strong>Act</strong> to apply the changes.</p>}
                {currentPhaseIndex === 4 && <p><strong>Plan</strong> what code to generate, then switch to <strong>Act</strong> mode to create production-ready files in the workspace.</p>}
              </div>
            )}
            {!isDeployPhase && availableModes.length > 1 && mode === 'plan' && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 14px', borderRadius: '10px',
                background: 'rgba(108,92,231,.08)', border: '1px solid rgba(108,92,231,.15)',
                fontSize: '.78rem', color: '#a78bfa'
              }}>
                <i className="fas fa-info-circle"></i>
                <span>Planning complete? Switch to <strong>Act</strong> mode to apply your ideas.</span>
                <button className="bp-mode-suggestion"
                  onClick={() => setMode('act')}
                  style={{
                    marginLeft: 'auto', padding: '4px 12px', border: 'none',
                    borderRadius: '6px', background: '#6c5ce7', color: '#fff',
                    fontSize: '.72rem', fontWeight: 500, cursor: 'pointer',
                  }}>
                  Go to Act <i className="fas fa-arrow-right ms-1"></i>
                </button>
              </div>
            )}

            {/* Preview iframe */}
            <div className="bp-iframe-wrap">
              <div className="bp-iframe-bar">
                <div className="bp-iframe-dots">
                  <span className="bp-iframe-dot"></span>
                  <span className="bp-iframe-dot"></span>
                  <span className="bp-iframe-dot"></span>
                </div>
                <span className="bp-iframe-title">Preview</span>
              </div>
              {previewHtml ? (
                <iframe className="bp-iframe-body" srcDoc={previewHtml} title="Preview" />
              ) : (
                <div style={{
                  height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#f8f8f8', color: '#999', fontSize: '.85rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <i className="fas fa-eye" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px', opacity: .4 }}></i>
                    {isDeployPhase
                      ? <p>No preview available. Files will appear here once generated.</p>
                      : <p>Use <strong>Act</strong> mode in the Build phase to generate a preview.</p>
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '108, 92, 231';
}
