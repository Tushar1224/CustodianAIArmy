import { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api/v1';

function apiGet(path) {
  return fetch(`${API_BASE}${path}`, { credentials: 'include' }).then(r => {
    if (!r.ok) throw new Error(`API error: ${r.status}`);
    return r.json();
  });
}

function apiPost(path, body) {
  return fetch(`${API_BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => {
    if (!r.ok) throw new Error(`API error: ${r.status}`);
    return r.json();
  });
}

function apiDelete(path) {
  return fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(r => {
    if (!r.ok) throw new Error(`API error: ${r.status}`);
    return r.json();
  });
}

function maskKey(key) {
  if (!key) return null;
  if (key.length <= 8) return '****';
  return key.slice(0, 4) + '****' + key.slice(-4);
}

export default function ProfileModals({ show, onClose, user, onLogout, onRefreshUser }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [keys, setKeys] = useState(null);
  const [geminiKey, setGeminiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [keysMsg, setKeysMsg] = useState(null);
  const [planInfo, setPlanInfo] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (show && activeTab === 'chats') {
      loadChats();
    }
    if (show && activeTab === 'keys') {
      loadKeys();
    }
    if (show && activeTab === 'plan') {
      loadPlan();
    }
  }, [show, activeTab]);

  const loadChats = useCallback(async () => {
    setChatsLoading(true);
    try {
      const data = await apiGet('/auth/user/chats');
      setChats(data.chats || []);
    } catch (e) {
      setChats([]);
    } finally {
      setChatsLoading(false);
    }
  }, []);

  const deleteChat = useCallback(async (chatId) => {
    if (!confirm('Are you sure you want to delete this chat session?')) return;
    try {
      await apiDelete(`/auth/user/chats/${chatId}`);
      await loadChats();
    } catch (e) {
      console.error('Failed to delete chat', e);
    }
  }, [loadChats]);

  const loadChat = useCallback((chat) => {
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('load-chat', { detail: chat }));
    }
  }, []);

  const loadKeys = useCallback(async () => {
    try {
      const data = await apiGet('/user/api-keys');
      setKeys(data.keys || {});
    } catch (e) {
      setKeys(null);
    }
  }, []);

  const saveKey = useCallback(async (provider) => {
    const fieldMap = { gemini: 'gemini_api_key', anthropic: 'anthropic_api_key' };
    const keyValue = provider === 'gemini' ? geminiKey : anthropicKey;
    if (!keyValue) {
      setKeysMsg({ type: 'warning', text: `Please enter a ${provider} API key before saving.` });
      return;
    }
    try {
      const body = {};
      body[fieldMap[provider]] = keyValue;
      await apiPost('/user/api-keys', body);
      setKeysMsg({ type: 'success', text: `${provider === 'gemini' ? 'Google' : 'Anthropic'} API key saved!` });
      if (provider === 'gemini') setGeminiKey('');
      else setAnthropicKey('');
      await loadKeys();
    } catch (e) {
      setKeysMsg({ type: 'danger', text: `Error: ${e.message}` });
    }
  }, [geminiKey, anthropicKey, loadKeys]);

  const deleteKey = useCallback(async (provider) => {
    if (!confirm(`Remove your ${provider} API key? The server default will be used instead.`)) return;
    try {
      await apiDelete(`/user/api-keys/${provider}`);
      setKeysMsg({ type: 'info', text: `${provider === 'gemini' ? 'Google' : 'Anthropic'} API key removed.` });
      await loadKeys();
    } catch (e) {
      setKeysMsg({ type: 'danger', text: `Error: ${e.message}` });
    }
  }, [loadKeys]);

  const loadPlan = useCallback(async () => {
    setPlanLoading(true);
    try {
      const data = await apiGet('/user/plan');
      setPlanInfo(data);
    } catch (e) {
      setPlanInfo(null);
    } finally {
      setPlanLoading(false);
    }
  }, []);

  const saveProfile = useCallback(async () => {
    if (user) {
      const updated = { ...user, name };
      localStorage.setItem('custodian_user', JSON.stringify(updated));
      if (onRefreshUser) onRefreshUser(updated);
    }
  }, [name, user, onRefreshUser]);

  if (!show) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'fas fa-user-edit' },
    { id: 'keys', label: 'API Keys', icon: 'fas fa-key' },
    { id: 'chats', label: 'Chat History', icon: 'fas fa-history' },
    { id: 'plan', label: 'My Plan', icon: 'fas fa-crown' },
  ];

  const isGuest = planInfo?.plan === 'guest' || !user;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ background: 'var(--secondary-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
          <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '0.75rem 1rem' }}>
            <h5 className="modal-title" style={{ color: 'var(--primary-color)', fontSize: '1rem' }}>
              <i className="fas fa-user-circle me-2"></i>Profile & Settings
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-0">
            <div className="d-flex" style={{ minHeight: '400px' }}>
              <div className="d-flex flex-column p-2" style={{ width: '180px', borderRight: '1px solid var(--border-color)', flexShrink: 0, background: 'var(--tertiary-bg)' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="d-flex align-items-center gap-2 btn btn-sm text-start w-100"
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: activeTab === tab.id ? 'var(--primary-color)' : 'transparent',
                      color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
                      fontWeight: activeTab === tab.id ? 700 : 400,
                      marginBottom: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    <i className={tab.icon} style={{ width: '18px', textAlign: 'center' }}></i>
                    {tab.label}
                  </button>
                ))}
                {user && (
                  <button
                    onClick={onLogout}
                    className="d-flex align-items-center gap-2 btn btn-sm text-start w-100 mt-auto"
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--danger-color)',
                      cursor: 'pointer',
                    }}
                  >
                    <i className="fas fa-sign-out-alt" style={{ width: '18px', textAlign: 'center' }}></i>
                    Logout
                  </button>
                )}
              </div>

              <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', maxHeight: '450px' }}>
                {activeTab === 'profile' && (
                  <div>
                    <h6 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Edit Profile</h6>
                    <div className="mb-3">
                      <label className="form-label" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ background: 'var(--tertiary-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                        style={{ background: 'var(--tertiary-bg)', color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}
                      />
                      <div className="form-text" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Email cannot be changed (Google Auth).</div>
                    </div>
                    <button className="btn btn-info btn-sm" onClick={saveProfile} data-bs-dismiss="modal">
                      <i className="fas fa-save me-1"></i>Save Changes
                    </button>
                  </div>
                )}

                {activeTab === 'keys' && (
                  <div>
                    <h6 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>API Keys</h6>
                    <p className="small mb-3" style={{ color: 'var(--text-muted)' }}>
                      Add your own API keys to use personal quotas. If left empty, the server's default keys are used.
                    </p>

                    {keysMsg && (
                      <div className={`alert alert-${keysMsg.type} py-2 small`} style={{ fontSize: '0.8rem' }}>
                        {keysMsg.text}
                      </div>
                    )}

                    <div className="card mb-3" style={{ background: 'var(--tertiary-bg)', borderColor: 'var(--border-color)' }}>
                      <div className="card-body py-3">
                        <div className="d-flex align-items-center mb-2">
                          <span className="badge me-2" style={{ background: 'var(--primary-color)', color: '#000' }}>Google</span>
                          <h6 className="mb-0" style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>Gemini API Key</h6>
                          <span className={`ms-auto badge ${keys?.has_gemini ? 'bg-success' : 'bg-secondary'}`} style={{ fontSize: '0.7rem' }}>
                            {keys?.has_gemini ? 'Set' : 'Using server default'}
                          </span>
                        </div>
                        <div className="input-group input-group-sm">
                          <input
                            type="password"
                            className="form-control"
                            placeholder={keys?.gemini_api_key || 'AIza...'}
                            value={geminiKey}
                            onChange={e => setGeminiKey(e.target.value)}
                            style={{ background: 'var(--secondary-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                          />
                          <button className="btn btn-outline-info" onClick={() => saveKey('gemini')}><i className="fas fa-save me-1"></i>Save</button>
                          <button className="btn btn-outline-danger" onClick={() => deleteKey('gemini')}><i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-3" style={{ background: 'var(--tertiary-bg)', borderColor: 'var(--border-color)' }}>
                      <div className="card-body py-3">
                        <div className="d-flex align-items-center mb-2">
                          <span className="badge me-2" style={{ background: 'var(--warning-color)', color: '#000' }}>Anthropic</span>
                          <h6 className="mb-0" style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>Claude API Key</h6>
                          <span className={`ms-auto badge ${keys?.has_anthropic ? 'bg-success' : 'bg-secondary'}`} style={{ fontSize: '0.7rem' }}>
                            {keys?.has_anthropic ? 'Set' : 'Using server default'}
                          </span>
                        </div>
                        <div className="input-group input-group-sm">
                          <input
                            type="password"
                            className="form-control"
                            placeholder={keys?.anthropic_api_key || 'sk-ant-...'}
                            value={anthropicKey}
                            onChange={e => setAnthropicKey(e.target.value)}
                            style={{ background: 'var(--secondary-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                          />
                          <button className="btn btn-outline-info" onClick={() => saveKey('anthropic')}><i className="fas fa-save me-1"></i>Save</button>
                          <button className="btn btn-outline-danger" onClick={() => deleteKey('anthropic')}><i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'chats' && (
                  <div>
                    <h6 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Chat History</h6>
                    {chatsLoading ? (
                      <div className="text-center py-4">
                        <div className="spinner" style={{ width: '30px', height: '30px', margin: '0 auto' }}></div>
                        <p className="mt-2 small" style={{ color: 'var(--text-muted)' }}>Loading chat history...</p>
                      </div>
                    ) : chats.length === 0 ? (
                      <div className="text-center py-4">
                        <i className="fas fa-inbox fa-3x mb-3" style={{ color: 'var(--text-muted)', opacity: 0.4 }}></i>
                        <p style={{ color: 'var(--text-muted)' }}>No chat history found.</p>
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-2">
                        {chats.map(chat => (
                          <div
                            key={chat.id}
                            className="p-3 rounded d-flex justify-content-between align-items-center"
                            style={{ background: 'rgba(26, 26, 46, 0.6)', border: '1px solid var(--border-color)' }}
                          >
                            <div className="flex-grow-1" style={{ minWidth: 0 }}>
                              <strong className="text-info" style={{ fontSize: '0.85rem' }}>{chat.title || 'Chat Session'}</strong>
                              <div className="small" style={{ color: 'var(--text-secondary)' }}>
                                {chat.messages?.length || 0} messages • {new Date(chat.last_updated).toLocaleString()}
                              </div>
                            </div>
                            <div className="d-flex gap-2 flex-shrink-0">
                              <button className="btn btn-sm btn-outline-info" onClick={() => loadChat(chat)} style={{ fontSize: '0.75rem' }}>
                                <i className="fas fa-folder-open me-1"></i>Open
                              </button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteChat(chat.id)} style={{ fontSize: '0.75rem' }}>
                                <i className="fas fa-trash me-1"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'plan' && (
                  <div>
                    <h6 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>My Plan</h6>
                    {planLoading ? (
                      <div className="text-center py-4">
                        <div className="spinner" style={{ width: '30px', height: '30px', margin: '0 auto' }}></div>
                        <p className="mt-2 small" style={{ color: 'var(--text-muted)' }}>Loading plan info...</p>
                      </div>
                    ) : planInfo ? (
                      <div>
                        <div className="text-center mb-3">
                          <span className={`badge fs-6 px-3 py-2 ${isGuest ? 'bg-secondary' : planInfo.plan === 'free' ? 'bg-info text-dark' : 'bg-warning text-dark'}`}>
                            <i className={`fas fa-${isGuest ? 'user-secret' : planInfo.plan === 'free' ? 'user' : 'crown'} me-2`}></i>
                            {isGuest ? 'Guest' : planInfo.plan === 'free' ? 'Free' : 'Pro'}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between small mb-1">
                            <span style={{ color: 'var(--text-muted)' }}>Daily requests used</span>
                            <span className="fw-bold">{planInfo.requests_today} / {planInfo.daily_limit}</span>
                          </div>
                          <div className="progress" style={{ height: '10px', background: 'var(--tertiary-bg)' }}>
                            <div
                              className={`progress-bar ${planInfo.requests_today >= planInfo.daily_limit ? 'bg-danger' : planInfo.requests_today / planInfo.daily_limit >= 0.8 ? 'bg-warning' : 'bg-info'}`}
                              role="progressbar"
                              style={{ width: `${Math.min(100, (planInfo.requests_today / planInfo.daily_limit) * 100)}%` }}
                            ></div>
                          </div>
                          <div className="small mt-1" style={{ color: 'var(--text-muted)' }}>
                            {planInfo.remaining} request{planInfo.remaining !== 1 ? 's' : ''} remaining today
                          </div>
                        </div>
                        <div className="mb-3">
                          <h6 className="mb-2" style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>
                            <i className="fas fa-plug me-2"></i>Provider Access
                          </h6>
                          <div className="d-flex gap-2 flex-wrap">
                            <span className="badge bg-success">Google Gemini</span>
                            <span className="badge bg-success">Anthropic Claude</span>
                          </div>
                        </div>
                        {isGuest && (
                          <div className="rounded p-3" style={{ border: '1px solid var(--warning-color)' }}>
                            <h6 className="mb-2" style={{ color: 'var(--warning-color)', fontSize: '0.85rem' }}>
                              <i className="fas fa-star me-2"></i>Sign In for More
                            </h6>
                            <ul className="small mb-3" style={{ color: 'var(--text-muted)' }}>
                              <li>20 requests/day on Free plan</li>
                              <li>50 requests/day on Pro plan</li>
                              <li>Access to Google Gemini & Anthropic Claude</li>
                              <li>Chat history & course progress saved</li>
                            </ul>
                            <a href="/api/v1/auth/google" className="btn btn-success w-100">
                              <i className="fab fa-google me-2"></i>Sign in with Google
                            </a>
                          </div>
                        )}
                        {planInfo.plan === 'free' && (
                          <div className="rounded p-3" style={{ border: '1px solid var(--primary-color)' }}>
                            <h6 className="mb-2" style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>
                              <i className="fas fa-crown me-2"></i>Upgrade to Pro
                            </h6>
                            <ul className="small mb-3" style={{ color: 'var(--text-muted)' }}>
                              <li>50 requests/day (vs 20 on Free)</li>
                              <li>Priority access to all providers</li>
                            </ul>
                            <a href="/payment" className="btn btn-warning text-dark w-100 fw-bold">
                              <i className="fas fa-crown me-2"></i>Upgrade to Pro — $9.99/mo
                            </a>
                          </div>
                        )}
                        {(planInfo.plan === 'pro' || planInfo.plan === 'paid') && (
                          <div className="text-center small mt-3" style={{ color: 'var(--text-muted)' }}>
                            <i className="fas fa-check-circle text-success me-1"></i>
                            You have full Pro access to all providers and features.
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-center text-muted">Failed to load plan info.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '0.5rem 1rem' }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
